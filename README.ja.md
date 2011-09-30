ArrayEmitter.js 0.0.2
==========
[Node.js] 配列,オブジェクトの順次処理のためのEventEmitter

変更履歴

----------------
* [0.0.1]: リリース
* [0.0.2]: resume() および options.norunを追加して好きなタイミングでemitするように修正

概要
----------------
### インストール方法 ###
    git clone git://github.com/shinout/ArrayEmitter.git

    または

    npm install arrayemitter

### 使い方 ###
#### 配列を扱う ####
    var ArrayEmitter = require('arrayemitter');
    var arr = new ArrayEmitter(['hoge', 'fuga', 'piyo']);

    arr.on('elem', function(key, value) {
      console.log(key);   // 0,    1,    2
      console.log(value); // hoge, fuga, piyo
    });

    arr.on('end', function() { // イテレーションの終わりに実行されます。
      console.log('end');
    });

    arr.on('error', function(e) { // エラー発生時に呼び出されます。
      console.log(e);
    });



#### オブジェクトを扱う ####
    var ArrayEmitter = require('arrayemitter');
    var obj = new ArrayEmitter({a:'hoge', b:'fuga', c:'piyo']);

    obj.on('elem', function(key, value) {
      console.log(key);   // a,    b,    c
      console.log(value); // hoge, fuga, piyo
    });

    obj.on('end', function() { // Objectの終わりに実行されます。
      console.log('end');
    });

    obj.on('error', function(e) { // エラー発生時に呼び出されます。
      console.log(e);
    });


