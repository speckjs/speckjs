var assert = require('assert');var test = require('jasmine');var file = require('../src/demo.js');describe('sum function', function() { 
it('returnt the sum of both params', function() {expect(file.sum(1,3)equal(4))});
it('return the sum of both params', function() {expect(file.sum(10,10)equal(20))});
}); 
describe('product function', function() { 
it('returnt the product of both params', function() {expect(file.product(2,3)equal(6))});
it('return the product of both params', function() {expect(file.product(10,10)equal(100))});
it('return the product of both params', function() {expect(file.product(2,25)equal(50))});
}); 
describe('fff function', function() { 
it('returnt the product of both params', function() {expect(file.fff(200,3)equal(6))});
it('return the product of both params', function() {expect(file.fff(1000,10)equal(100))});
}); 
describe('ggg function', function() { 
it('returnt the product of both params', function() {expect(file.ggg(0,0)equal(0))});
it('return the product of both params', function() {expect(file.ggg(0,0)equal(0))});
}); 
