ArrayEmitter.js ${version}
==========
[Node.js] ${description}

${changelog}

----------------
<< for (var i in changeLogs) { >>
* [${i}]: ${changeLogs[i]}
<< } >>

${overview}
----------------
### ${install} ###
    git clone git://github.com/shinout/ArrayEmitter.git

    ${_OR}

    npm install arrayemitter

### ${usage} ###
#### ${witharr} ####
    var ArrayEmitter = require('arrayemitter');
    var arr = new ArrayEmitter(['hoge', 'fuga', 'piyo']);

    arr.on('elem', function(key, value) {
      console.log(key);   // 0,    1,    2
      console.log(value); // hoge, fuga, piyo
    });

    arr.on('end', function() { // ${endemit(iteration)}
      console.log('end');
    });

    arr.on('error', function(e) { // ${erremit}
      console.log(e);
    });



#### ${withobj} ####
    var ArrayEmitter = require('arrayemitter');
    var obj = new ArrayEmitter({a:'hoge', b:'fuga', c:'piyo']);

    obj.on('elem', function(key, value) {
      console.log(key);   // a,    b,    c
      console.log(value); // hoge, fuga, piyo
    });

    obj.on('end', function() { // ${endemit('Object')}
      console.log('end');
    });

    obj.on('error', function(e) { // ${erremit}
      console.log(e);
    });



