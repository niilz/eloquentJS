const roads = [
    "Alice's House-Bob's House",   "Alice's House-Cabin",
    "Alice's House-Post Office",   "Bob's House-Town Hall",
    "Daria's House-Ernie's House", "Daria's House-Town Hall",
    "Ernie's House-Grete's House", "Grete's House-Farm",
    "Grete's House-Shop",          "Marketplace-Farm",
    "Marketplace-Post Office",     "Marketplace-Shop",
    "Marketplace-Town Hall",       "Shop-Town Hall"
  ];

function buildGraph(edges) {
    let graph = Object.create(null);
    function addEdges(from, to) {
        if (graph[from] == null) {
            graph[from] = [to];
        } else {
            graph[from].push(to);
        }
    }
    for (let [from, to] of edges.map(r => r.split("-"))) {
        addEdges(from, to);
        addEdges(to, from);
    }
    return graph;
}

const roadGraph = buildGraph(roads);

class VillageState {
    constructor(place, parcels) {
        this.place = place;
        this.parcels = parcels;
    }

    move(destination) {
        if (!roadGraph[this.place].includes(destination)) {
            //can you get from the Place to the destination? if not return old state
            return this;
        } else {
            let parcels = this.parcels.map(p => {
                //check every parcel if it has to be at this place
                if (p.place != this.place) return p;
                return {place: destination, address: p.address};
            }).filter(p => p.place != p.address);
            //only let parcels into the new state, that are not yet at their destination
            return new VillageState(destination, parcels);
        }
    }
}


function runRobot(state, robot, memory) {
    for (let turn = 0;; turn++) {
        if (state.parcels.length == 0) {
            console.log(`Done in ${turn} turns`);
            break;
        }
        let action = robot(state, memory);
        state = state.move(action.direction);
        memory = action.memory;
        console.log(`Moved to ${action.direction}`);
    }
}

function randomPick(array) {
    let choice = Math.floor(Math.random() * array.length);
    return array[choice];
}

function randomRobot(state) {
    return {direction: randomPick(roadGraph[state.place])};
}

VillageState.random = function(parcelCount = 5) {
    let parcels = [];
    for (let i = 0; i < parcelCount; i++) {
        let address = randomPick(Object.keys(roadGraph));
        let place;
        do {
            place = randomPick(Object.keys(roadGraph));
        } while (place == address);
        parcels.push({place, address});
    }
    return new VillageState("Post Office", parcels);
};

//this runs the robot that takes a random road
//runRobot(VillageState.random(), randomRobot);

const mailRoute = [
    "Alice's House", "Cabin", "Alice's House", "Bob's House",
    "Town Hall", "Daria's House", "Ernie's House",
    "Grete's House", "Shop", "Grete's House", "Farm",
    "Marketplace", "Post Office"
];
//the robot that runs a specific road
function routeRobot(state, memory) {
    if (memory.length == 0) {
        memory = mailRoute;
    }
    return {direction: memory[0], memory: memory.slice(1)}
}


//the function that finds the best route
function findRoute(graph, from, to) {
    let work = [{at: from, route: []}];
    for (let i = 0; i < work.length; i++) {
        let {at, route} = work[i];
        for (let place of graph[at]) {
            if (place == to) return route.concat(place);
            if (!work.some(w => w.at == place)) {
                work.push({at: place, route: route.concat(place)});
            }
        }
    }
}

function goalOrientedRobot({place, parcels}, route) {
    if (route.length == 0) {
        let parcel = parcels[0];
        if (parcel.place != place) {
            route = findRoute(roadGraph, place, parcel.place);
        } else {
            route = findRoute(roadGraph, place, parcel.address);
        }
    }
    return {direction: route[0], memory: route.slice(1)};
}


function compareRobots(robot_1, memory_1, robot_2, memory_2) {
    let turns_1 = [];
    let turns_2 = [];
    for (let i = 0; i < 100; i++) {  
        let state_1 = VillageState.random();
        let state_2 = state_1
        //robot_1 
        for (let turn = 0;; turn++) {
            if (state_1.parcels.length == 0) {
                turns_1.push(turn);
                break;
            }
            let action = robot_1(state_1, memory_1);
            state_1 = state_1.move(action.direction);
            memory_1 = action.memory;
        }
        //robot_2 
        for (let turn = 0;; turn++) {
            if (state_2.parcels.length == 0) {
                turns_2.push(turn);
                break;
            }
            let action = robot_2(state_2, memory_2);
            state_2 = state_2.move(action.direction);
            memory_2 = action.memory;
        }
    }
    let sumTurns_1 = turns_1.reduce((sum, turn) => sum += turn, 0);
    let sumTurns_2 = turns_2.reduce((sum, turn) => sum += turn, 0);
    console.log(`mean_1: ${sumTurns_1 / turns_1.length}`);
    console.log(`mean_2: ${sumTurns_2 / turns_2.length}`);
}

compareRobots(goalOrientedRobot, [], routeRobot, []);
