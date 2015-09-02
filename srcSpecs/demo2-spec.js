var test = require('tape');var file = require('../src/demo2.js');test('sum function', function(t) { t.plan(2); 
t.equal(4, file.sum(1,3), 'returnt the sum of both params') 
t.equal(20, file.sum(10,10), 'return the sum of both params') 
}); 
test('product function', function(t) { t.plan(3); 
t.equal(6, file.product(2,3), 'returnt the product of both params') 
t.equal(100, file.product(10,10), 'return the product of both params') 
t.equal(50, file.product(2,25), 'return the product of both params') 
}); 
test('fff function', function(t) { t.plan(2); 
t.equal(6, file.fff(200,3), 'returnt the product of both params') 
t.equal(100, file.fff(1000,10), 'return the product of both params') 
}); 
test('ggg function', function(t) { t.plan(2); 
t.equal(0, file.ggg(0,0), 'returnt the product of both params') 
t.equal(0, file.ggg(0,0), 'return the product of both params') 
}); 
