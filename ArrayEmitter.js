/**
 * ArrayEmitter -- EventEmitter emitting array iteration events
 * @author SHIN Suzuki
 * @version 0.0.1
 *
 */

var EventEmitter = require('events').EventEmitter;

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
 * @event {end} function()
 *    Emitted when reached end
 *
 * @event {error} function(e)
 *    Emitted when an error occurred
 */
function ArrayEmitter(arr, op) {
  op = op || {};
  this.arr = arr || [];
  this.len = (arr instanceof Array) 
    ? arr.length
    : Object.keys(arr).length;
  this.i   = 0;
  var self = this;

  (function() {
    var thisfunc = arguments.callee;
    arguments.callee.nm = op.name; 
    setTimeout(function() {
      try {
        var k = self.getKey();
        self.emit('elem', k, self.arr[k]); 
        self.i++;
        if(self.i >= self.len) {
          self.emit('end');
        }
        else {
          thisfunc();
        }
      } catch (e) {
        self.emit('error', e);
        if (op.tolerant) {
          self.i++;
          thisfunc();
        }
        else {
          self.emit('end');
        }
      }
    }, 0);
  })();
}

ArrayEmitter.prototype = new EventEmitter();

ArrayEmitter.prototype.getKey = function() {
  return (this.arr instanceof Array) ? this.i : Object.keys(this.arr)[this.i];
}

ArrayEmitter.version = '0.0.1';

module.exports = ArrayEmitter;
