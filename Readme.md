## `memoizeOne`

`memoizeOne` takes a function as input and returns a memoized version of it.

```js
const memoizedFunction = memoizedOne(() => {})
```

If the current invocation is the same as the last one then a cached result is returned.

### Example:

```js
function add(a, b) {
  return a + b;
}

const memoizedAdd = memoizeOne(add);

memoizedAdd(1, 2);
// add function: is called
// [new value returned: 3]

memoizedAdd(1, 2);
// add function: not called because same input as last time
// [cached result is returned: 3]

memoizedAdd(2, 3);
// add function: is called
// [new value returned: 5]

memoizedAdd(2, 3);
// add function: not called
// [cached result is returned: 5]

memoizedAdd(1, 2);
// add function is called again as only the last invocation is cached
// [result is returned: 3]
```

## Task

Your task is to implement the memoizeOne function such that all the test cases pass.

## How to run tests?

```
- npm install
- npx jest
```

## Bonus Question 1

<details>
  <summary>Click here for more details</summary>
  
  ### `this` is treated as an input

  Changes in the input invalidates the cache and calls the function again. `this` is also treated as an input. In other words, if `this` changes the function will be called again.
  
  ### Example
  
  ```js
  function add(a, b) {
    return a + b;
  }

  const memoizedAdd = memoizeOne(add);
  
  memoizedAdd.call({}, 1, 2);
  // add function: is called with {}
  // [new value returned: 3]
  
  memoizedAdd.call({ a: 1 }, 1, 2);
  // add function: is called with { a: 1 }
  // [new value returned: 3]
  ```
  
</details>
  

## Bonus Question 2

<details>
  <summary>Click here for more details</summary>

Add a clear property to memoizeOne

### Example:

```js
memoizedAdd(1, 2);
// add function: is called
// [new value returned: 3]

memoizedAdd.clear();

memoizedAdd(1, 2);
// add function: is called because the cache was cleared
// [new value returned: 3]
```

</details>
