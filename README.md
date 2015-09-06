# SpeckJS
<insert tagline here>

## About SpeckJS
SpeckJS is an npm module that will parse code and output unit test specs based on the parameters specified by the user. We currently support [Tape tests](https://github.com/substack/tape) and we will be adding support for other testing suites soon.

## How to Use SpeckJS
There are two parts to using SpeckJS:
1. Writing comments in the file to be parsed that follow the SpeckJS syntax for generating tests

### Comment syntax
Here is an example of some comments written to test a simple sum function:
```
// test > sum function
// # sum(10,10) == 20 (return the sum of both params)
// # sum(4, 3) == 7 (return the sum of both params)
```

<!--
WORDING IS A BIT WEIRD; EXAMPLE GOES TOO LONG
This is the abstract of the syntax:
```
// test > description of the tests to follow
// # fnCall(params, to, test) test-assertion-symbol (description of assertion)
``` -->

Comments can also be written using block style comments:
```
/*
test > sum function
# sum(10,10) == 20 (return the sum of both params)
# sum(4, 3) == 7 (return the sum of both params)
*/
```
### Installation
To use with node:

```
$ npm install speckjs
```

Then, require the module:

```
var speck = require('speckjs');
```
