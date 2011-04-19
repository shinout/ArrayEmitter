var ArrayEmitter = require('../ArrayEmitter');
var test = require('./shinout.test');

/**
 * normal usage (arr)
 */
var arr = [];
for (var i=0; i<1000; i++) {
  arr[i] = Math.sin(i);
}

//var arem = new ArrayEmitter(arr);
var arem = new ArrayEmitter(arr, {name: 'arr'});
var count = 0;

arem.on('elem', function(key, value) {
  test('equal', count, key, 'invalid key number');
  test('equal', Math.round(value, 8), Math.round(Math.sin(key), 8), 'invalid value');
  count++;
});

arem.on('end', function() {
  test('equal', count, 1000, 'invalid count');
  test('result', 'array iteration test');
});

/**
 * normal usage (obj)
 */

var obj = {};
var count2 = 0;
for (var i=0; i<1000; i++) {
  obj[Math.sin(i)] = i;
}

//var objem = new ArrayEmitter(obj);
var objem = new ArrayEmitter(obj, {name: 'obj'});
objem.on('elem', function(key, value) {
  test('equal', Math.round(key, 8), Math.round(Math.sin(value), 8), 'invalid key');
  test('equal', count2, value, 'invalid value');
  count2++;
});

objem.on('end', function() {
  test('equal', count2, 1000, 'invalid count');
  test('result', 'object iteration test');
});

/**
 * throwing error without continuing
 */

//var eobjem = new ArrayEmitter(obj);
var eobjem = new ArrayEmitter(obj, {name: 'objerr'});
var ecount = 0;

eobjem.on('elem', function(k, v) {
  if ( v == 0) {
    throw "hoge error";
  }
});

eobjem.on('error', function(e) {
  ecount++;
  test('equal', e, 'hoge error', 'object err test');
});

eobjem.on('end', function() {
  test('equal', ecount, 1, 'object err test');
  test('result', 'error without tolerant');
});

/**
 * throwing error without continuing
 */

//var eobjem2 = new ArrayEmitter(obj, { tolerant: true});
var eobjem2 = new ArrayEmitter(obj, { tolerant: true, name: 'objerr2'});
var ecount2 = 0;

eobjem2.on('elem', function(k, v) {
  if ( (v % 100) == 0) {
    throw "hoge error";
  }
});

eobjem2.on('error', function(e) {
  ecount2++;
  test('equal', e, 'hoge error', 'object err test');
});

eobjem2.on('end', function() {
  test('equal', ecount2, 10, 'invalid error count');
  test('result', 'error with tolerant');
});
