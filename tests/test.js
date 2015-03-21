'use strict';

var assert = require('assert');
var MagicIncrement = require('../magic-increment');

describe('MagicIncrement', function() {
  describe('inc', function() {
    it('inc("99") === "100"', function() {
      var actual = MagicIncrement.inc('99');
      assert.strictEqual(actual, '100');
    });

    it('inc("zz") === "aaa"', function() {
      var actual = MagicIncrement.inc('zz');
      assert.strictEqual(actual, 'aaa');
    });

    it('inc("a0") === "a1"', function() {
      var actual = MagicIncrement.inc('a0');
      assert.strictEqual(actual, 'a1');
    });

    it('inc("Az") === "Ba"', function() {
      var actual = MagicIncrement.inc('Az');
      assert.strictEqual(actual, 'Ba');
    });

    it('inc("zzzzz") === "aaaaaa"', function() {
      var actual = MagicIncrement.inc('zzzzz');
      assert.strictEqual(actual, 'aaaaaa');
    });
  });

  describe('dec', function() {
    it('dec("100") === "99"', function() {
      var actual = MagicIncrement.dec('100');
      assert.strictEqual(actual, '99');
    });

    it('dec("aaa") === "zz"', function() {
      var actual = MagicIncrement.dec('aaa');
      assert.strictEqual(actual, 'zz');
    });

    it('dec("a1") === "a0"', function() {
      var actual = MagicIncrement.dec('a1');
      assert.strictEqual(actual, 'a0');
    });

    it('dec("Ba") === "Az"', function() {
      var actual = MagicIncrement.dec('Ba');
      assert.strictEqual(actual, 'Az');
    });

    it('dec("aaaaaa") === "zzzzz"', function() {
      var actual = MagicIncrement.dec('aaaaaa');
      assert.strictEqual(actual, 'zzzzz');
    });
  });
});
