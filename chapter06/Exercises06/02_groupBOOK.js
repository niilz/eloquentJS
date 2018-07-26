//book-version:

class Group {
    constructor() {
        this.group = []; //so far same as my version
    }

    add(value) {
        if (!this.has(value)) {
            this.group.push(value); //similar, but the book calls the has method (defined below). btw I was expecting several values, so looped. mhew
        }
    }
    
    delete(value) {
        this.group = this.group.filter(v => v !== value); //alright the book filtered the array, I hardly spliced it.
    }

    has(value) {
        return this.group.includes(value); //yep I got that too
    }

    static from(collection) {
        //also very similar to my version but they need to loop here. I already looped through the items on the add-Function
        let group = new Group;
        for (let value of collection) {
            group.add(value);
        }
        return group;  
    }
}

let group = Group.from([10, 20]);
console.log(group.has(10));
// → true
console.log(group.has(30));
// → false
group.add(10);
group.delete(10);
console.log(group.has(10));