// different notation (instead of "require")
import ordinal from "ordinal"; // no braces around binding, therfore default value
import {days, months} from "date-names";

// export with export keyword. Can be in front of function, class, binding (variable)
export function formatDate(date, format) { /* ... */ }

// default exports are accomplished with "default"
export default ["Winter", "Spring", "Summer", "Autumn"];
