/**
 * magic-increment.js
 *
 * @description   Incrementation and decrementation for strings.
 * @fileOverview  Magic increment
 * @author        polygon planet
 * @version       0.1.0
 * @date          2015-03-21
 * @link          https://github.com/polygonplanet/magic-increment
 * @copyright     Copyright (c) 2015 polygon planet <polygon.planet.aqua@gmail.com>
 * @license       licensed under the MIT license.
 */

(function (name, context, factory) {

  // Supports UMD. AMD, CommonJS/Node.js and browser context
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      module.exports = factory();
    } else {
      exports[name] = factory();
    }
  } else if (typeof define === 'function' && define.amd) {
    define(factory);
  } else {
    context[name] = factory();
  }

})('MagicIncrement', this, function() {
  'use strict';

  var fromCharCode = String.fromCharCode;

  var LOWER = 1,
      UPPER = 2,
      NUMERIC = 3;

  /**
   * MagicIncrement
   *
   * @name MagicIncrement
   * @type {Object}
   * @class
   */
  var MagicIncrement = {
    /**
     * Increment the argument value.
     * This incrementation uses alphabets [a-z] + [A-Z] and digits [0-9]
     * (i.e., Different with c-style incrementation).
     *
     * @example
     *   console.log(MagicIncrement.inc('99')); // '100'
     *   console.log(MagicIncrement.inc('zz')); // 'aaa'
     *   console.log(MagicIncrement.inc('a0')); // 'a1'
     *   console.log(MagicIncrement.inc('Az')); // 'Ba'
     *
     * @example
     *   var s = 'X';
     *   for (var i = 0; i < 10; i++) {
     *     s = MagicIncrement.inc(s);
     *     console.log(s);
     *   }
     *   // Y
     *   // Z
     *   // AA
     *   // AB
     *   // AC
     *   // AD
     *   // AE
     *   // AF
     *   // AG
     *   // AH
     *
     * @param {string} value The value to increment.
     * @return {string} Return the incremented value.
     */
    inc: function(value) {
      value = '' + value;

      var last = 0;
      var carry = false;

      var values = value.split('');
      if (values.length === 0) {
        return '1';
      }

      var pos = values.length - 1;
      var c;
      while (pos >= 0) {
        c = values[pos].charCodeAt(0);
        if (c >= 0x61/*'a'*/ && c <= 0x7A/*'z'*/) {
          if (c === 0x7A) {
            values[pos] = 'a';
            carry = true;
          } else {
            values[pos] = fromCharCode(c + 1);
            carry = false;
          }
          last = LOWER;
        } else if (c >= 0x41/*'A'*/ && c <= 0x5A/*'Z'*/) {
          if (c === 0x5A) {
            values[pos] = 'A';
            carry = true;
          } else {
            values[pos] = fromCharCode(c + 1);
            carry = false;
          }
          last = UPPER;
        } else if (c >= 0x30/*'0'*/ && c <= 0x39/*'9'*/) {
          if (c === 0x39) {
            values[pos] = '0';
            carry = true;
          } else {
            values[pos] = fromCharCode(c + 1);
            carry = false;
          }
          last = NUMERIC;
        } else {
          carry = false;
          break;
        }

        if (!carry) {
          break;
        }
        pos--;
      }

      if (carry) {
        switch (last) {
          case NUMERIC:
            values.unshift('1');
            break;
          case UPPER:
            values.unshift('A');
            break;
          case LOWER:
            values.unshift('a');
            break;
        }
      }

      return values.join('');
    },
    /**
     * Decrement the argument value.
     * This decrementation uses alphabets [a-z] + [A-Z] and digits [0-9]
     * (i.e., Different with c-style incrementation).
     *
     * @example
     *   console.log(MagicIncrement.dec('100')); // '99'
     *   console.log(MagicIncrement.dec('aaa')); // 'zz'
     *   console.log(MagicIncrement.dec('a1')); // 'a0'
     *   console.log(MagicIncrement.dec('Ba')); // 'Az'
     *
     * @example
     *   var s = 'AC';
     *   for (var i = 0; i < 10; i++) {
     *     s = MagicIncrement.dec(s);
     *     console.log(s);
     *   }
     *   // AB
     *   // AA
     *   // Z
     *   // Y
     *   // X
     *   // W
     *   // V
     *   // U
     *   // T
     *   // S
     *
     * @param {string} value The value to decrement.
     * @return {string} Return the decremented value.
     */
    dec: function(value) {
      value = '' + value;

      if (value === 'a' || value === 'A' || value === '0') {
        return value;
      }

      var values = value.split('').reverse();
      var len = values.length;
      if (len === 0) {
        return '';
      }

      var carry = false;
      var c, last;

      for (var i = 0; i < len; i++) {
        c = values[i].charCodeAt(0);

        if (!carry &&
            ((c >= 0x61/*'a'*/ && c <= 0x7A/*'z'*/) ||
             (c >= 0x41/*'A'*/ && c <= 0x5A/*'Z'*/) ||
             (c >= 0x30/*'0'*/ && c <= 0x39/*'9'*/))) {
          carry = true;
        }

        if (c === 0x61) {
          values[i] = 'z';
          last = LOWER;
        } else if (c === 0x41) {
          values[i] = 'Z';
          last = UPPER;
        } else if (c === 0x30) {
          values[i] = '9';
          last = NUMERIC;
        } else {
          break;
        }
      }

      if (!carry) {
        return value;
      }

      var first = values[0];
      var borrow = false;

      switch (last) {
        case LOWER:
          if (c === 0x61 &&
              (len <= 1 ||
               (len > 1 && values[len - 1] === values[len - 2]) ||
               (len === 2 && first === '0')
              )
          ) {
            borrow = true;
          }
          break;
        case UPPER:
          if (c === 0x41 &&
              (len <= 1 ||
               (len > 1 && values[len - 1] === values[len - 2]) ||
               (len === 2 && first === '0')
              )
          ) {
            borrow = true;
          }
          break;
        case NUMERIC:
          if ((c === 0x31 &&
               values[len - 1] === '1' && values[len - 2] === '9') ||
              (c === 0x30 &&
               (len <= 1 ||
                (len > 1 && values[len - 1] === values[len - 2]) ||
                (len === 2 && first === '0')
               )
              )
          ) {
            borrow = true;
          }
          break;
      }

      if (i >= len) {
        i--;
      }

      values[i] = fromCharCode(values[i].charCodeAt(0) - 1);
      values = values.reverse();
      if (borrow) {
        values.shift();
      }

      return values.join('');
    }
  };

  return MagicIncrement;
});
