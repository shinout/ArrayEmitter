ArrayEmitter.js 0.0.3
==========
[Node.js] EventEmitter emitting array-iteration events

Change Log

----------------
* [0.0.1]: Release
* [0.0.2]: add resume() and options.norun

Overview
----------------
### Installation ###
    git clone git://github.com/shinout/ArrayEmitter.git

    OR

    npm install arrayemitter

### Usage ###
#### with Array ####
    var ArrayEmitter = require('arrayemitter');
    var arr = new ArrayEmitter(['hoge', 'fuga', 'piyo']);

    arr.on('elem', function(key, value) {
      console.log(key);   // 0,    1,    2
      console.log(value); // hoge, fuga, piyo
    });

    arr.on('end', function() { // emitted at the end of iteration
      console.log('end');
    });

    arr.on('error', function(e) { // emitted when an error occurred
      console.log(e);
    });



#### with Object ####
    var ArrayEmitter = require('arrayemitter');
    var obj = new ArrayEmitter({a:'hoge', b:'fuga', c:'piyo']);

    obj.on('elem', function(key, value) {
      console.log(key);   // a,    b,    c
      console.log(value); // hoge, fuga, piyo
    });

    obj.on('end', function() { // emitted at the end of Object
      console.log('end');
    });

    obj.on('error', function(e) { // emitted when an error occurred
      console.log(e);
    });


