/**
 * Utility Functions...
 */

/**
 * Converts from miliseconds (int) to date format (string). E.g. 7 July, 3:45 PM
 */
function convertTime(time) {
  var date = new Date(time);
  var hour = date.getHours() % 12 === 0 ? 12 : date.getHours() % 12;
  var ampm = date.getHours() >= 12 ? "PM" : "AM";
  var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes().toString() : date.getMinutes().toString();
  var newTime = 
    date.getDate().toString() + " " + 
    date.toLocaleString('default', { month: 'long' }) + ", " + 
    hour.toString().toString() + ":" +
    minutes + " " + ampm;
  return newTime;
}

export { convertTime };