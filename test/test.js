var ArrayEmitter = require('../ArrayEmitter');
if (typeof global != 'undefined') require('./load.test').load(global);

var TOTAL = 1000;

/**
 * normal usage (arr)
 */
var arr = [];
for (var i=0; i<TOTAL; i++) {
  arr[i] = Math.sin(i);
}

//var arem = new ArrayEmitter(arr);
var arem = new ArrayEmitter(arr, {name: 'arr'});
var count = 0, count2 = 0;

arem.on('elem', function(key, value) {
  T.equal(count, key, 'key number');
  T.equal(Math.round(value, 8), Math.round(Math.sin(key), 8), 'value');
  count++;
});

arem.on('data', function(value) {
  T.equal(Math.round(value, 8), Math.round(Math.sin(count2), 8), 'value');
  count2++;
});

arem.on('end', function() {
  T.equal(count, TOTAL, 'count');
});



/**
 * normal usage (obj)
 */

var obj = {};
var count3 = 0;
for (var i=0; i<TOTAL; i++) {
  obj[Math.sin(i)] = i;
}

//var objem = new ArrayEmitter(obj);
var objem = new ArrayEmitter(obj, {name: 'obj'});
objem.on('elem', function(key, value) {
  T.equal(Math.round(key, 8), Math.round(Math.sin(value), 8), 'key');
  T.equal(count3, value, 'value');
  count3++;
});

objem.on('end', function() {
  T.equal(count3, TOTAL, 'count');
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
  T.equal(e, 'hoge error', 'object err test');
});

eobjem.on('end', function() {
  T.equal(ecount, 1, 'object err test');
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
  T.equal(e, 'hoge error', 'object err test');
});

eobjem2.on('end', function() {
  T.equal(ecount2, Math.floor(TOTAL/100), 'error count');
});
