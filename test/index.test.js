import sinon from 'sinon';
import {
  curry,
  averageTime,
  timer,
  sum,
  secondsToNano,
  nanoToMilli,
  nanoToSec,
  milliToSec,
} from '../src';

test('curry', () => {
  const add = curry((a, b) => a + b);
  const addThenMultiply = curry((a, b, c) => (a + b) * c);
  expect(add(1)(2)).toBe(add(1, 2));
  expect(addThenMultiply(1, 2, 3)).toBe(9);
});

test('node-process-timer --time utils', () => {
  expect(secondsToNano(1000)).toBe(1e+12);
  expect(nanoToMilli(1000)).toBe(0.001);
  expect(nanoToSec(1000)).toBe(1e-6);
  expect(milliToSec(1000)).toBe(1);
  expect(sum(1, 2)).toBe(3);
});

test('node-process-timer', () => {
  const time = timer(sum, [ 1, 2 ]);
  const average = averageTime(sum, [ 1, 2 ], 10000);
  const spy = sinon.spy();
  expect(typeof timer(sum)).toBe('function');
  expect(typeof averageTime(sum)).toBe('function');
  expect(typeof time).toBe('number');
  expect(typeof average).toBe('number');
  expect(time > average).toBe(true);

  timer(spy, ['hello']);
  expect(spy.calledWith('hello')).toBe(true);
});
