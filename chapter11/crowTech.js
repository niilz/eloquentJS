// this was just a sort off attempt to implement the crow-tech side, where I could import from
// didn't really work

let bigOak = {
        "food caches": {
                "rucksack": {
                        "fruit": "Banana",
                        "meat": "beef"
                },
                "plate": {
                        "fruit": "apple",
                        "meat": "chicken",
                },
                "wallet": {
                        "fruit": "empty",
                        "special": "sugar money"
                }
        },
        readStorage: function(items, func) {
                if (items == "food caches") { items = Object.entries(bigOak[items]) };
                return func(Object.entries(items));  
        }
}

//exports.food_caches = food_caches;

bigOak.readStorage("food caches", caches => {
        console.log("caches", caches);
        let firstCache = caches[0];
        bigOak.readStorage(firstCache, info => {
                console.log("info", info);
        })
});