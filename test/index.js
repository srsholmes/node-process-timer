import test from 'tape';
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

test('curry', t => {
  const add = curry((a, b) => a + b);
  const addThenMultiply = curry((a, b, c) => (a + b) * c);
  t.is(add(1)(2), add(1, 2), 'Should curry functions');
  t.is(addThenMultiply(1, 2, 3), 9, 'Should curry functions');
  t.end();
});

test('node-process-timer --time utils', t => {
  t.equals(secondsToNano(1000), 1e+12, 'Should convert seconds to nanoseconds');
  t.equals(nanoToMilli(1000), 0.001, 'Should convert nanoseconds to milliseconds');
  t.equals(nanoToSec(1000), 1e-6, 'Should convert nanoseconds to seconds');
  t.equals(milliToSec(1000), 1, 'Should convert time milliseconds to seconds');
  t.equals(sum(1, 2), 3, 'Sum should add up numbers');
  t.end();
});

test('node-process-timer', t => {
  const time = timer(sum, [ 1, 2 ]);
  const average = averageTime(sum, [ 1, 2 ], 10000);
  const spy = sinon.spy();
  t.equals(typeof timer(sum), 'function', 'timer should be curried');
  t.equals(typeof averageTime(sum), 'function', 'average should be curried');
  t.equals(typeof time, 'number', 'timer should return a number');
  t.equals(typeof average, 'number', 'average should return a number');
  t.equals(time > average, true, 'the average time should be smaller than the first execution of the function');

  timer(spy, ['hello']);
  t.deepEquals(spy.calledWith('hello'), true, 'should call the spy with the correct args')
  t.end();
});
