# namespacing
- spec = container/file
- test = group of assertion
- assertion = deepEqual,..

## Comment example (equal)
```
// test > sum function
// # sum(1,3) == 4 (return the sum of both params)
// # sum(10,10) == 20 (return the sum of both params)
```

## Parsing output:
```
{
  testLine: 'test > sum function'
  assertions: [
    'sum(1,3) == 4 (return the sum of both params)',
    'sum(10,10) == 20 (return the sum of both params)'
  ]
}
```

## Extraction/expansion output
```
{
  specType : 'tape',
  specFileSrc : 'app.js',
  tests : [
    { testTitle: 'sum function',
      assertions: [
        { assertionMessage: 'return the sum of both params',
          assertionType: 'equal',
          assertionInput: 'sum(1, 3)',
          assertionOutput: '4'
        }
      ]
    }
  ]
}
```