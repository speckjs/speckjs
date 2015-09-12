[![Build Status](https://travis-ci.org/speckjs/speckjs.svg?branch=master)](https://travis-ci.org/speckjs/speckjs)
# SpeckJS

## About
SpeckJS is an npm module that parses JavaScript and outputs unit-tests. SpeckJS currently supports [Tape](https://github.com/substack/tape), [Jasmine](https://github.com/jasmine/jasmine), and we will be adding support for other testing frameworks soon. We also have plugins for both [Grunt](https://github.com/speckjs/grunt-speckjs) and [Atom](https://github.com/speckjs/atom-speckjs).

Our goal with SpeckJS is to make it as easy as possible to get started using Test-Driven Development on a new project, to quickly add unit-tests to your existing project, or anywhere in between. We know the value of well-tested code, and SpeckJS is here to make that simpler than ever.

## How to Use

### Installation
```
$ npm install speckjs
```

### Creating a SpeckJS Comment
The first line of a SpeckJS comment is the `title`, describing your test block.
```
// test > sum function
```

Next, use SpeckJS' domain-specific language (DSL) to create an assertion of what you wish to test. Here's the format of the DSL:
```
// # <actual> <assertion-type> <expected> (<description>)
```

You can add as many (or as few) assertions as you'd like.
```
// # sum(1, 2) == 3 (returns the sum of both params)
// # sum(3, 4) == 7 (returns the sum of both params)
```

That's it! Here's a complete SpeckJS comment for the simple sum function:
```
// test > sum function
// # sum(1, 2) == 3 (returns the sum of both params)
// # sum(3, 4) == 7 (returns the sum of both params)
```

Comments can also be written using block style comments:
```
/*
test > sum function
# sum(1, 2) == 3 (returns the sum of both params)
# sum(3, 4) == 7 (returns the sum of both params)
*/
```

### Supported Assertion Types
These are the assertion types currently supported, and you can extend this list to include others in [`parsing/comment-conversion.js`](https://github.com/speckjs/speckjs/blob/master/parsing/comment-conversion.js).
```
==   : equal
===  : deep equal
!==  : not equal
!=== : not deep equal
```

### Using the API
Require the module:
```
var speck = require('speckjs');
```

The API is comprised of a single function, `build(file, options)`:

* file (Object, required)
    * name (String)
    * content (String)
* options (Object, optional)
    * testFW  (String)
    * onBuild (Function)

By default, `build` returns a file (String) of all the unit-tests as indicated from the SpeckJS comments in the original file that was loaded. Here are a few examples of how you can use `build`:

```
// file object to be passed as an argument
var file = {
  name: 'demo.js',
  content: scriptContent
};

// options hash selecting Jasmine as testing framework over default Tape
var option1 = {
  testFW: 'jasmine'
};

// options hash selecting Jasmine and specifying a callback
var option2 = {
  testFW: 'jasmine',
  onBuild: function(data) {
    console.log(data);
  }
}

// Returns Tape test file
var result0 = speck.build(file);

// Returns Jasmine test file
var result1 = speck.build(file, option1);

// Runs callback with new Jasmine test file
speck.build(file, option2);
```

## Support
SpeckJS is also available as a plugin for the following platforms:

[Grunt](https://github.com/speckjs/grunt-speckjs)

[Atom](https://github.com/speckjs/atom-speckjs)
