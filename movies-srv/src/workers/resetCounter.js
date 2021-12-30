var date = new Date(), y = date.getFullYear(), m = date.getMonth();
// console.log(date);
// console.log(y)
// console.log(m)
var firstDay = new Date(y, m, 1);
var lastDay = new Date(y, m + 1, 0);
// console.log(lastDay.getHours())

const timestamp = new Date();
const timeZoneOffset = timestamp.getTimezoneOffset();
console.log(timeZoneOffset);
const firstDayNextMonth = new Date(timestamp.getUTCFullYear(), timestamp.getUTCMonth() + 1);

console.log(firstDayNextMonth);

// console.log(lastDay)

// const date = new Date()


// const date1 = new Date()