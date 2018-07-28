//book-version of class Group:
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

    [Symbol.iterator]() {
        return new GroupIterator(this.group);
        //Book-version:
        //return new GroupIterator(this);
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
//My version of GroupIterator and OH MY it is almost like the book!!!
class GroupIterator {
    constructor(group) {
        this.group = group;
        this.index = 0;
    }
    next() {
        if (this.index == this.group.length) return {value: undefined, done: true} //book: return {done: true};
        else {
            let value = {value: this.group[this.index], done: false};
            //Book:
            //let value = {value: this.group.group[this.index], done: false};
            this.index++
            return value;
        }
    }
}

for (let value of Group.from(["a", "b", "c"])) {
    console.log(value);
  }