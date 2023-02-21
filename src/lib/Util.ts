//Generates a random number from 0 to the given upper amount (exclusive).
export var rand = function(upper:number) {
  return Math.floor(Math.random() * upper);
}

//Generates a random number between a lower bound and upper bound.
export var randrange = function(lower:number, upper:number) {
  return (Math.random() * (upper-lower)) + lower;
}

//Generates a random number (int) between a lower bound and upper bound. Both bounds are inclusive.
export var randrange_i = function(lower:number, upper:number) {
  lower = Math.floor(lower);
  upper = Math.floor(upper) + 1;
  return Math.floor((Math.random() * (upper-lower)) + lower);
}