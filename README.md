# Number-to-French

Module to convert Numbers ( Integers and Floats ) to French Words.

## How to use



``` Javascript
const ntf = require('number-to-french');

let res;

res = ntf(155); // cent cinquente cinq

res = ntf(31.550); // Taks in account the 0 and outputs : trente et un virgule cinquente cinq

res = ntf(' 12 3 '); // Takes Strings also: cent vingt trois
```
