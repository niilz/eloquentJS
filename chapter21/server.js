const {createServer} = require("http");
const Router = require("./router");
const ecstatic = require("ecstatic");

const router = new Router();
const defaultHeaders = {"Content-Type": "text/plain"};

class SkillShareServer {
    constructor(talks) {
        this.talks = talks;
        this.version = 0;
        this.waiting = [];

        let fileServer = ecstatic({root: "./public"});
        this.server = createServer((request, response) => {
            let resolved = router.resolve(this, request);
            if (resolved) {
                resolved.catch(error => {
                    if (error.status != null) return error;
                    return {body: String(error), status: 500};
                }).then(({body,
                          status = 200,
                          headers = defaultHeaders}) => {
                    response.writeHead(status, headers);
                    response.end(body);
                });
            } else {
                fileServer(request, response);
            }
        });
    }
    start(port) {
        this.server.listen(port);
    }
    stop() {
        this.server.close();
    }
}


// #############
// ## METHODS ##
// #############
const talkPath = /^\/talks\/([^\/]+)$/;

// #### GET ####
router.add("GET", talkPath, async (server, title) => {
    if (title in server.talks) {
        return {body: JSON.stringify(server.talks[title]),
                headers: {"Content-Type": "application/json"}};
    } else {
        return {status: 404, body: `No talk '${title}' found`};
    }
});

// #### DELETE ####
router.add("DELETE", talkPath, async (server, title) => {
    if (title in server.talks) {
        delete server.talks[title];
        // "updated will be defined later"
        // it notifies waiting long polling requests about change
        server.updated();
    }
    return {status: 204};
});

// reads all content from a readable stream and
// returns a promise that resolves to a string
// to retrieve the body
function readStream(stream) {
    return new Promise((resolve, reject) => {
        let data = "";
        stream.on("error", reject);
        stream.on("data", chunk => data += chunk.toString());
        stream.on("end", () => resolve(data));
    });
}

// #### PUT ####
router.add("PUT", talkPath, async (server, title, request) => {
    let requestBody = await readStream(request);
    let talk;
    try { talk = JSON.parse(requestBody); }
    catch (_) { return {status: 400, body: "Invalid JSON"}; }

    if (!talk ||
        typeof talk.presenter != "string" ||
        typeof talk.summary != "string") {
            return {status: 400, body: "Bad talk data"};
        }
    server.talks[title] = {title,
                           presenter: talk.presenter,
                           summary: talk.summary,
                           comments: []};
    server.updated();
    return {status: 204};
});

// #### POST ####
router.add("POST", /^\/talks\/([^\/]+)\/comments$/,
            async (server, title, request) => {
    let requestBody = await readStream(request);
    let comment;
    try { comment = JSON.parse(requestBody); }
    catch (_) { return {status: 400, body: "Invalid JSON"}; }

    if (!comment ||
        typeof comment.author != "string" ||
        typeof comment.message != "string") {
            return {status: 400, body: "Bad comment data"};
        } else if (title in server.talks) {
            server.talks[title].comments.push(comment);
            server.updated();
            return {status: 204};
        } else {
            return {status: 404, body: `No talk '${title}' found`};
        }
});

// ############################
// ## handling Long Polling ##
// ############################

// helper that builds up an array and includes ETag
SkillShareServer.prototype.talkResponse = function() {
    let talks = [];
    for (let title of Object.keys(this.talks)) {
        talks.push(this.talks[title]);
    }
    return {
        body: JSON.stringify(talks),
        headers: {"Content-Type": "application/json",
                  "ETag": `"${this.version}"`}
    };
};

router.add("GET", /^\/talks$/, async (server, request) => {
    let tag = /"(.*)"/.exec(request.headers["if-none-match"]);
    let wait = /\bwait=(\d+)/.exec(request.headers["prefer"]);
    if (!tag || tag[1] != server.version) {
        return server.talkResponse();
    } else if (!wait) {
        return {status: 304};
    } else {
        return server.waitForChanges(Number(wait[1]));
    }
});

SkillShareServer.prototype.waitForChanges = function(time) {
    return new Promise(resolve => {
        this.waiting.push(resolve);
        setTimeout(() => {
            if (!this.waiting.includes(resolve)) return;
            this.waiting = this.waiting.filter(r => r != resolve);
            resolve({status: 304});
        }, time * 1000);
    });
};

let {readFileSync, writeFile} = require("fs");

const fileName = "./talks.json";

function loadTalks() {
    let json;
    try {
        json = JSON.parse(readFileSync(fileName, "utf8"));
    } catch (e) {
        json = {};
    }
    return Object.assign(Object.create(null), json);
}

// update increases the "version" and wakes up waiting requests
SkillShareServer.prototype.updated = function() {
    this.version++;
    let response = this.talkResponse();
    this.waiting.forEach(resolve => resolve(response));
    this.waiting = [];
    
    try {
        writeFile(fileName, JSON.stringify(this.talks), () => "Without this callback, node crashes on the 'writeFile'");
    } catch (e) {
        console.log(e, "Bääääää");
    };
};

new SkillShareServer(loadTalks()).start(8000);