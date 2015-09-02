module.exports = {

  // test > diff function
  // # diff(3,2) == 1 (returnt the diff of both params)
  // # diff(8-5) !== 13 (return the diff of both params)
  // # diff(10,10) !=== 5 (return the diff of both params)
  diff: function(a, b) {
    return a - b;
  },

  // test > product function
  // # quotient(6,3) == 2 (returnt the quotient of both params)
  // # quotient(10,10) !== 9 (return the quotient of both params)
  // # quotient(25,5) !=== 10 (return the quotient of both params)
  quotient: function(a, b) {
    return a / b;
  }

};
