/**
 * ArrayEmitter -- EventEmitter emitting array iteration events
 * @author SHIN Suzuki
 * @version 0.0.2
 *
 */

var EventEmitter = require('events').EventEmitter,
    nextTick     = process.nextTick;

/**
 * create object that emit array iteration events
 * @constructor
 * 
 * @param {Array} or {Object} arr 
 * @param {Object} op
 *          {boolean} tolerant  if true, continue iteration even if errors occurred
 * 
 * @event {elem} function(key, value)
 *    Emitted when received an element
 *
 * @event {data} function(data)
 *    Emitted when received an element, only value is emitted
 *
 * @event {end} function()
 *    Emitted when reached end
 *
 * @event {error} function(e)
 *    Emitted when an error occurred
 */
function ArrayEmitter(arr, op) {
  op = op || {};
  this.readable = !op.norun;
  this.ended    = false;

  this.arr = arr || [];
  this.len = (arr instanceof Array) 
    ? arr.length
    : Object.keys(arr).length;
  this.i   = 0;
  this.op  = op;

  if (this.readable) nextTick(emit.bind(this));

}

function emit() {
  var self = this;
  (function execute() {
    try {
      var k = self.getKey();
      self.emit('elem', k, self.arr[k]); 
      self.emit('data', self.arr[k]); 
      self.i++;
      if(self.i >= self.len) {
        self.emit('end');
      }
      else {
        nextTick(execute);
      }
    } catch (e) {
      self.emit('error', e);
      if (self.op.tolerant) {
        self.i++;
        nextTick(execute);
      }
      else {
        self.emit('end');
      }
    }
  })();
}

ArrayEmitter.prototype = new EventEmitter();

ArrayEmitter.prototype.resume = function() {
  if (this.ended || this.readable) return;
  this.readable = true;
  emit.call(this);
};


ArrayEmitter.prototype.getKey = function() {
  return (this.arr instanceof Array) ? this.i : Object.keys(this.arr)[this.i];
}

ArrayEmitter.version = '0.0.2';

module.exports = ArrayEmitter;
