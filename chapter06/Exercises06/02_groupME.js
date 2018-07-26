//my version, not far off from the book-version
class Group {
    constructor() {
        this.group = [];
    }
    add(elements) {
        for (let elem of Array.from(elements)) {
            if (!this.group.includes(elem)) this.group.push(elem);
        }
    }
    delete(elem) {
        // for (let elem of Array.from(elements)) {
        //     console.log(elem);
            if (this.group.includes(elem)) {
                this.group.splice(this.group.indexOf(elem), 1);
            }
        //}
    }
    has(element) {
        return this.group.includes(element);
    }
    
    static from(elements) {
        let group = new Group;
        group.add(elements);
        return group;
    }
}
//My test calls:
// let myGroup = new Group();
// myGroup.add([1,2]);
// console.log(myGroup.group);
// myGroup.delete([1]);
// console.log(myGroup.group);
// console.log(myGroup.has(1));
// console.log(myGroup.has(2));

//the exercise calls:
let group = Group.from([10, 20]);
console.log(group.has(10));
// → true
console.log(group.has(30));
// → false
group.add(10);
group.delete(10);
console.log(group.has(10));
// → false