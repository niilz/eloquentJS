let date = new Date;
console.log(date); //looks different in browser than in runnerTerminal 

console.log(new Date(2008, 04, 15));
//should log Day Mar 15 2008 00:...
console.log(new Date(2009, 11, 9, 12, 59, 59, 999));
//should log Wed Dec 09 2009 12:59:59 ...
//JS uses zero-based months so 11 is December. Days start with 1. totally logical

//Timestamps are stored as milliseconds since start of 1970 in UTC "Unix time"
console.log("in milliseconds", new Date(2018, 08, 22).getTime());
//1537567200000
console.log("ms in Date", new Date(1537567200000));
//Wed Aug 22 00:...

//current time in ms. Either...:
console.log("getTime", new Date().getTime());
//time in ms
//...or with .now:
console.log("now", Date.now());
//time in ms

/* other functions
  getFullYear
  getMonth
  getDate
  getHours
  getMinutes
  getSeconds
  getYear (year - 1900) mostly useless
*/