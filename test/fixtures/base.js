module.exports = {

  // test > diff function
  // # diff(3,2) == 1 (returns the diff of both params)
  // # diff(8,5) !== 13 (returns the diff of both params)
  // # diff(10,10) !=== 5 (returns the diff of both params)
  diff: function(a, b) {
    return a - b;
  },

  // test > quotient function
  // # quotient(6,3) == 2 (returns the quotient of both params)
  // # quotient(10,10) !== 9 (returns the quotient of both params)
  // # quotient(25,5) !=== 10 (returns the quotient of both params)
  quotient: function(a, b) {
    return a / b;
  }
};
