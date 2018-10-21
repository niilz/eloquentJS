// the app-state has a list of talks and the name of the user
// stored in a {talks, user} object

// ###############
// ### ACTIONS ###

// handleAction
function handleAction(state, action) {
    if (action.type == "setUser") {
        localStorage.setItem("userName", action.user);
        return Object.assign({}, state, {user: action.user});
    } else if (action.type == "setTalks") {
        return Object.assign({}, state, {talks: action.talks});
    } else if (action.type == "newTalk") {
        fetchOK(talkURL(action.title), {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                presenter: state.user,
                summary: action.summary
            })
        }).catch(reportError);
    } else if (action.type == "deleteTalk") {
        fetchOK(talkURL(action.talk), {method: "DELETE"})
            .catch(reportError);
    } else if (action.type == "newComment") {
        fetchOK(talkURL(action.talk) + "/comments", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                author: state.user,
                message: action.message
            })
        }).catch(reportError);
    }
    return state;
}

// wrapper that ensures, that a request is rejected if it raised an error
function fetchOK(url, options) {
    return fetch(url, options).then(response => {
        if (response.status < 400) return response;
        else throw new Error(response.statusText);
    });
}

// helper function to build up URL for a talk with a given title
function talkURL(title) {
    return "talks/" + encodeURIComponent(title);
}

// if an error occurs, page should not just sit and wait
// so reportError says what's the problem
function reportError(error) {
    alert(String(error));
}

// ##########################
// ## RENDERING COMPONENTS ##
// ##########################

// create element helper function
function elt(type, props, ...children) {
    let dom = document.createElement(type);
    if (props) Object.assign(dom, props);
    for (let child of children) {
        if (typeof child != "string") dom.appendChild(child);
        else dom.appendChild(document.createTextNode(child));
    }
    return dom;
}

// user input field
function renderUserField(name, dispatch) {
    return elt("label", {}, "Your name:", elt("input", {
        type: "text",
        value: name,
        onchange(event) {
            dispatch({type: "setUser", user: event.target.value});
        }
    }));
}

// talks
function renderTalk(talk, dispatch) {
    return elt(
        "section", {className: "talk"},
        elt("h2", null, talk.title, " ", elt("button", {
            type: "button",
            onclick() {
                dispatch({type: "deleteTalk", talk: talk.title});
            }
        }, "DELETE")),
        elt("div", null, "by ",
            elt("strong", null, talk.presenter)),
        elt("p", null, talk.summary),
        ...talk.comments.map(renderComment),
        elt("form", {
            onsubmit(event) {
                event.preventDefault();
                let form = event.target;
                dispatch({type: "newComment",
                            talk: talk.title,
                            message: form.elements.comment.value});
                form.reset();
            }
        }, elt("input", {type: "text", name: "comment"}), " ",
            elt("button", {type: "submit"}, "Add comment")));
}

// comments
function renderComment(comment) {
    return elt("p", {className: "comment"},
                elt("strong", null, comment.author),
                ": ", comment.message);
}

// new Talk Form
function renderTalkForm(dispatch) {
    let title = elt("input", {type: "text"});
    let summary = elt("input", {type: "text"});
    return elt("form", {
        onsubmit(event) {
            event.preventDefault();
            dispatch({type: "newTalk",
                      title: title.value,
                      summary: summary.value});
            event.target.reset();
        }
    }, elt("h3", null, "Submit a Talk"),
       elt("label", null, "Title: ", title),
       elt("label", null, "Summary: ", summary),
       elt("button", {type: "submit"}, "Submit"));
}

// #############
// ## POLLING ##
// #############

// the function keeps polling the server
async function pollTalks(update) {
    let tag = undefined;
    for (;;) {
        let response;
        try {
            response = await fetchOK("/talks", {
                headers: tag && {"If-None-Match": tag,
                                 "Prefer": "wait=90"}
            });
        } catch (e) {
            console.log("Request failed: " + e);
            await new Promise(resolve => setTimeout(resolve, 500));
            continue;
        }
        if (response.status == 304) continue;
        tag = response.headers.get("ETag");
        update(await response.json());
    }
}

// #############
// ## THE APP ##
// #############

// ties the interface together
class SkillShareApp {
    constructor(state, dispatch) {
        this.dispatch = dispatch;
        this.talkDOM = elt("div", {className: "talks"});
        this.dom = elt("div", null,
                        renderUserField(state.user, dispatch),
                        this.talkDOM,
                        renderTalkForm(dispatch));
        this.syncState(state);
    }

    syncState(state) {
        if (state.talks != this.talks) {
            this.talkDOM.textContent = "";
            for (let talk of state.talks) {
                this.talkDOM.appendChild(
                    renderTalk(talk, this.dispatch));
            }
            this.talks = state.talks;
        }
    }
}

// starting the app
function runApp() {
    let user = localStorage.getItem("userName") || "Anon";
    let state, app;
    function dispatch(action) {
        state = handleAction(state, action);
        app.syncState(state);
    }

    pollTalks(talks => {
        if (!app) {
            state = {user, talks};
            app = new SkillShareApp(state, dispatch);
            document.body.appendChild(app.dom);
        } else {
            dispatch({type: "setTalks", talks});
        }
    }).catch(reportError);
}

runApp();