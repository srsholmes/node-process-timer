const sum = (x, y) => x + y;
const secondsToNano = x => x * 1e9;
const nanoToMilli = x => x * 1e-6;
const nanoToSec = x => parseFloat((x * 1e-9).toFixed(6));
const milliToSec = x => x * 0.001;

const curry = (fn, args = []) => (...a) => {
  let x = args.concat(a);
  return x.length >= fn.length
    ? fn(...x)
    : curry(fn, x);
};

const timer = curry((fn, args) => {
  const t = process.hrtime();
  fn(...args);
  const arr = process.hrtime(t);
  return secondsToNano(arr[ 0 ]) + arr[ 1 ];
});

const averageTime = curry((fn, args, num) =>
  Array(num)
  .fill(0)
  .map((_, i) => i)
  .reduce((acc, curr) => sum(acc, timer(fn, args)), 0) / num
);

export {
  curry,
  averageTime,
  timer,
  sum,
  secondsToNano,
  nanoToMilli,
  nanoToSec,
  milliToSec,
};
