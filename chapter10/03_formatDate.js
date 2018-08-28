// loader wraps module code
// modules get own local scope
// the call require, access dependencies
// and put their interface in the object, bound to exports

// get ordinal-package
const ordinal = require("ordinal");
// get date-names-package
const {days, months} = require("date-names");

//export the module formatDate
exports.formatDate = function(date, format) {
    return format.replace(/YYYY|M(MMM)?|Do?|dddd/g, tag => {
        if (tag == "YYYY") return date.getFullYear();
        if (tag == "M") return date.getMonth();
        if (tag == "MMMM") return months[date.getMonth()];
        if (tag == "D") return date.getDate();
        if (tag == "Do") return ordinal(date.getDate());
        if (tag == "dddd") return days[date.getDay()];
    });
};