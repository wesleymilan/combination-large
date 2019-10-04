# Large Combinator for NodeJS

I built this library to combine big array elements. The others libraries freeze when you try to use arrays larger then 
30 elements even expanding your nodejs memory `--max-old-space-size=8192`, you **DON'T** need to do this on this library.

## Installing
`npm i combination-large`

## How to use it

### Basic usage
All function will returns a result when it's valid and will return `null` and no result can be found.

`next` function is the basic usage, every time you call it the pointer will increment and return the referred combination.

`getLastPosition` function will give you the latest position of the combination pointer, you can use this number to 
find a specific combination result.

```
const combination = require('combination-large');

let Combine = new combination({ list: ['a','b','c','d','e'] });
let combinated, pos;

while(combinated = Combine.next()) {
    pos = Combine.getLastPosition();
    console.log(pos + ' - ', combinated);
}
```

#### Result
```
1 -  [ 'e' ]
2 -  [ 'd' ]
3 -  [ 'c' ]
4 -  [ 'b' ]
5 -  [ 'a' ]
6 -  [ 'd', 'e' ]
7 -  [ 'c', 'e' ]
8 -  [ 'c', 'd' ]
9 -  [ 'b', 'e' ]
10 -  [ 'b', 'd' ]
11 -  [ 'b', 'c' ]
12 -  [ 'a', 'e' ]
13 -  [ 'a', 'd' ]
14 -  [ 'a', 'c' ]
15 -  [ 'a', 'b' ]
16 -  [ 'c', 'd', 'e' ]
17 -  [ 'b', 'd', 'e' ]
18 -  [ 'b', 'c', 'e' ]
19 -  [ 'b', 'c', 'd' ]
20 -  [ 'a', 'd', 'e' ]
21 -  [ 'a', 'c', 'e' ]
22 -  [ 'a', 'c', 'd' ]
23 -  [ 'a', 'b', 'e' ]
24 -  [ 'a', 'b', 'd' ]
25 -  [ 'a', 'b', 'c' ]
26 -  [ 'b', 'c', 'd', 'e' ]
27 -  [ 'a', 'c', 'd', 'e' ]
28 -  [ 'a', 'b', 'd', 'e' ]
29 -  [ 'a', 'b', 'c', 'e' ]
30 -  [ 'a', 'b', 'c', 'd' ]
31 -  [ 'a', 'b', 'c', 'd', 'e' ]
```

### previous function
It will decrement the pointer and return the referred combination.
```
combinated = Combine.previous();
pos = Combine.getLastPosition();
console.log(pos + ' - ', combinated);
```

#### Result
```
31 -  [ 'a', 'b', 'c', 'd', 'e' ]
```

### get function
Will return an specific combination based on the position you pass as param.
```
combinated = Combine.get(15);
pos = Combine.getLastPosition();
console.log(pos + ' - ', combinated);
```

#### Result
```
15 -  [ 'a', 'b' ]
```

### range param
You can limit the range of elements on a combination passing `range.min` and `range.max` params.
```
let Combine = new combination({ list: ['a','b','c','d','e'], range: { min: 3, max: 4 } });
let combinated, pos;

while(combinated = Combine.next()) {
    pos = Combine.getLastPosition();
    console.log(pos + ' - ', combinated);
}
```

#### Result
```
1 -  [ 'c', 'd', 'e' ]
2 -  [ 'b', 'd', 'e' ]
3 -  [ 'b', 'c', 'e' ]
4 -  [ 'b', 'c', 'd' ]
5 -  [ 'a', 'd', 'e' ]
6 -  [ 'a', 'c', 'e' ]
7 -  [ 'a', 'c', 'd' ]
8 -  [ 'a', 'b', 'e' ]
9 -  [ 'a', 'b', 'd' ]
10 -  [ 'a', 'b', 'c' ]
11 -  [ 'b', 'c', 'd', 'e' ]
12 -  [ 'a', 'c', 'd', 'e' ]
13 -  [ 'a', 'b', 'd', 'e' ]
14 -  [ 'a', 'b', 'c', 'e' ]
15 -  [ 'a', 'b', 'c', 'd' ]
15 -  [ 'a', 'b', 'c', 'd' ]
15 -  [ 'a', 'b', 'c', 'd' ]
```

### reset function
You can use reset to start over.
`Combine.reset();`

### getNumberOfCombinations function
Return the number of possible unique combinations for the given parameters.
`Combine.getNumberOfCombinations();`

## Next steps
This library can be optimized splitting the subgroups reducing the number of cycles to find the result, be my guest
to fork and send me a pull request.











