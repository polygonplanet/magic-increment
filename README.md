magic-increment
===============

[![Build Status](https://travis-ci.org/polygonplanet/magic-increment.svg?branch=master)](https://travis-ci.org/polygonplanet/magic-increment)

Incrementation and decrementation for strings.  

### Installation

#### In Browser:

```html
<script src="magic-increment.js"></script>
```

or

```html
<script src="magic-increment.min.js"></script>
```

Object **MagicIncrement** will defined in the global scope.

#### In Node.js:

```bash
npm install magic-increment
```

```javascript
var MagicIncrement = require('magic-increment');
```

#### bower:

```bash
bower install magic-increment
```

### inc

* {_string_} MagicIncrement.**inc** ( value )  
  Increment the argument value.  
  This incrementation uses alphabets [a-z] + [A-Z] and digits [0-9].  
  @param {_string_} _value_ The value to increment.  
  @return {_string_} Return the incremented value.


```javascript
console.log(MagicIncrement.inc('99')); // '100'
console.log(MagicIncrement.inc('zz')); // 'aaa'
console.log(MagicIncrement.inc('a0')); // 'a1'
console.log(MagicIncrement.inc('Az')); // 'Ba'
```

```javascript
var s = 'X';
for (var i = 0; i < 10; i++) {
  s = MagicIncrement.inc(s);
  console.log(s);
}
// Y
// Z
// AA
// AB
// AC
// AD
// AE
// AF
// AG
// AH
```

### dec

* {_string_} MagicIncrement.**dec** ( value )  
  Decrement the argument value.  
  This decrementation uses alphabets [a-z] + [A-Z] and digits [0-9].  
  @param {_string_} _value_ The value to decrement.  
  @return {_string_} Return the decremented value.

```javascript
console.log(MagicIncrement.dec('100')); // '99'
console.log(MagicIncrement.dec('aaa')); // 'zz'
console.log(MagicIncrement.dec('a1')); // 'a0'
console.log(MagicIncrement.dec('Ba')); // 'Az'
```

```javascript
var s = 'AC';
for (var i = 0; i < 10; i++) {
  s = MagicIncrement.dec(s);
  console.log(s);
}
// AB
// AA
// Z
// Y
// X
// W
// V
// U
// T
// S
```


### Demo

[Test for Magic Increment (Demo)](http://polygonplanet.github.io/magic-increment/tests/magic-increment-test.html)

### License

MIT


