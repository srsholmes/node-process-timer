"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var sum = function sum(x, y) {
  return x + y;
};
var secondsToNano = function secondsToNano(x) {
  return x * 1e9;
};
var nanoToMilli = function nanoToMilli(x) {
  return x * 1e-6;
};
var nanoToSec = function nanoToSec(x) {
  return parseFloat((x * 1e-9).toFixed(6));
};
var milliToSec = function milliToSec(x) {
  return x * 0.001;
};

var curry = function curry(fn) {
  var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return function () {
    for (var _len = arguments.length, a = Array(_len), _key = 0; _key < _len; _key++) {
      a[_key] = arguments[_key];
    }

    var x = args.concat(a);
    return x.length >= fn.length ? fn.apply(undefined, _toConsumableArray(x)) : curry(fn, x);
  };
};

var timer = curry(function (fn, args) {
  var t = process.hrtime();
  fn.apply(undefined, _toConsumableArray(args));
  var arr = process.hrtime(t);
  return secondsToNano(arr[0]) + arr[1];
});

var averageTime = curry(function (fn, args, num) {
  return Array(num).fill(0).map(function (_, i) {
    return i;
  }).reduce(function (acc, curr) {
    return sum(acc, timer(fn, args));
  }, 0) / num;
});

exports.curry = curry;
exports.averageTime = averageTime;
exports.timer = timer;
exports.sum = sum;
exports.secondsToNano = secondsToNano;
exports.nanoToMilli = nanoToMilli;
exports.nanoToSec = nanoToSec;
exports.milliToSec = milliToSec;