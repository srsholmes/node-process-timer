# Node Process Timer

[![Build Status](https://travis-ci.org/srsholmes/node-process-timer.svg?branch=master)](https://travis-ci.org/srsholmes/node-process-timer)
[![Coverage Status](https://coveralls.io/repos/github/srsholmes/node-process-timer/badge.svg?branch=develop)](https://coveralls.io/github/srsholmes/node-process-timer?branch=develop)

## Usage:
```
const { averageTime, timer,secondsToNano, nanoToMilli, nanoToSec, milliToSec } = require('node-process-timer');

const sum = (x, y) => x + y;
const time = timer(sum, [1,2]);
const avtTime = averageTime(sum, [1,2], 1000);

console.log(time); // Time in nanoseconds.
console.log(avtTime); // Average time in nanoseconds.
```
