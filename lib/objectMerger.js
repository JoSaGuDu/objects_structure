// Pass in the objects to merge as arguments.
// For a deep extend, set the first argument to `true`.

// Variables
const extended = {};
let deep = false;
let i = 0;
const length = arguments.length;

// Merge the object into the extended object
function merge(obj) {
  for (let prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      // If deep merge and property is an object, merge properties
      if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
        extended[prop] = extend(true, extended[prop], obj[prop]);
      } else {
        extended[prop] = obj[prop];
      }
    }
  }
}

export default function extend() {

  // Check if a deep merge
  if (Object.prototype.toString.call(arguments[0]) === '[object Boolean]') {
    deep = arguments[0];
    i++;
  }

  // Loop through each object and conduct a merge
  for (; i < length; i++) {
    const obj = arguments[i];
    merge(obj);
  }

  return extended;

}

/*
// Create a new object by combining two or more objects
var newObjectShallow = extend(object1, object2, object3);
var newObjectDeep = extend(true, object1, object2, object3);
*/
