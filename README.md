# SpeckJS
<insert tagline here>

# About SpeckJS
SpeckJS is an npm module that will parse code and output unit test specs based on the parameters specified by the user. We currently support [Tape tests](https://github.com/substack/tape) and we will be adding support for other testing suites soon.

# How to Use SpeckJS
There are two parts to using SpeckJS:
1. Writing comments in the file to be parsed that follow the SpeckJS syntax for generating tests
2. Running the SpeckJS command-line tool

### Comment syntax
This is the abstract of the syntax:
```
// test > description of the tests to follow
// # functionCall(parameters, to, test) test-assertion-symbol (description of assertion)
```
Here is an example of some comments written to test a simple sum function:
```
// test > sum function
// # sum(10,10) == 20 (return the sum of both params)
// # sum(4, 3) == 7 (return the sum of both params)
```
Comments can also be written using block style comments:
```
/*
test > sum function
# sum(10,10) == 20 (return the sum of both params)
# sum(4, 3) == 7 (return the sum of both params)
*/
```
Once you have your comments set up, you are ready to run the command-line tool.
### Command-line syntax
In order to use the SpeckJS command-line tool you need to navigate to the folder that contains the source files you wish to generate tests from. If you want to run SpeckJS from the root directory of your project, you will have to specify the relative paths for the files you wish to parse. Then the syntax is as follows:
```
speck.js tape <destination path> <files to parse>
//Do not use angle brackets when actually running this tool
```
Once the above command finishes running, you will find a file in your specified destination path that will contain Tape tests!
```
test('sum function', function(t) {
    t.plan(2);
    t.equal(sum(10, 10), 20, 'return the sum of both params');
    t.equal(sum(4, 3), 7, 'return the sum of both params');
});
```

# UNDER CONSTRUCTION
