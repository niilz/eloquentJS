const fs = require('fs');

let journal = [];

function addEntry(events, squirrel) {
    journal.push({events, squirrel});
}

function phi(table) {
    return (table[3] * table[0] - table[2] * table[1]) /
    Math.sqrt((table[2] + table[3]) *
              (table[0] + table[1]) *
              (table[1] + table[3]) *
              (table[0] + table[2]));
}

//console.log(phi([76, 9, 4, 1]));

const JOURNAL = JSON.parse(fs.readFileSync('./jaques_journal.json'));

function tableFor(event, journal) {
    let table = [0, 0, 0, 0];
    for (let entry of journal) {
        let index = 0;
        if (entry.events.includes(event)) index += 1;
        if (entry.squirrel) index += 2;
        table[index] += 1;
    }
    return table;
}

//console.log(tableFor("pizza", JOURNAL))

function journalEvents(journal) {
    let events = [];
    for (let entry of journal) {
        for (let event of entry.events) {
            if (!events.includes(event)) {
                events.push(event);
            }
        }
    }
    return events;
}

//console.log(journalEvents(JOURNAL));

for (let event of journalEvents(JOURNAL)) {
    console.log(event + ":", phi(tableFor(event, JOURNAL)));
}