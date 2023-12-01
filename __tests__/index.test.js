// @ts-check

import { test } from 'node:test';
import assert from 'assert/strict';
import Validator from '../index.js';

test('task1', () => {
  const validator = new Validator();
  const schema = validator.grade();

  assert.equal(schema.isValid(null), false); // false
  assert.equal(schema.isValid(''), false); // false
  assert.equal(schema.isValid(true), false); // false
  assert.equal(schema.isValid(123), false); // false
  assert.equal(schema.isValid(0), false); // false
  assert.equal(schema.isValid(2), true); // false
  assert.equal(schema.isValid(-3), false); // false
  assert.equal(schema.isValid(4.1), false); // false
  assert.equal(schema.isValid(5), true); // true
});

test('task2', () => {
  const v = new Validator();
  const schema = v.lessonData();

  assert.equal(schema.isValid(4), false);
  assert.equal(schema.isValid({ lesson: 'programming', date: '11.02.12', grade: 3 }), true);
  assert.equal(schema.isValid({ lesson: 'programming', date: '11.02.12' }), false);
  assert.equal(schema.isValid({
    lesson: 'programming', date: '11.02.12', grade: 3, playingGames: true,
  }), false);
  assert.equal(schema.isValid({ lesson: 'programming', date: '111.02.12', grade: 3 }), false);
  assert.equal(schema.isValid({ lesson: 'programming', date: '11.02.12', grade: 1 }), false);
  assert.equal(schema.isValid({ lesson: 'programming', date: '11.02.32', grade: 5 }), true);
});

test('task3', () => {
  const v = new Validator();
  const schema1 = v.lessonData();

  assert.equal(schema1.isValid({ lesson: 'programming', date: '11.02.12', grade: 2 }), true);
  assert.equal(schema1.isValid({ lesson: 'bobaibiba', date: '11.02.12', grade: 3 }), false);
  assert.equal(schema1.isValid({ lesson: 'history', date: '11.02.12', grade: 6 }), false);
  assert.equal(schema1.isValid({ lesson: 'sports', date: '11.02.12', grade: 2 }), true);

  const schema2 = v.lessonData().passed(3);
  assert.equal(schema2.isValid({ lesson: 'programming', date: '11.02.12', grade: 3 }), true);
  assert.equal(schema2.isValid({ lesson: 'history', date: '11.02.12', grade: 2 }), false);

  const schema3 = v.lessonData().passed();
  assert.equal(schema3.isValid({ lesson: 'history', date: '11.02.12', grade: 2 }), true);

  const schema4 = v.lessonData().passed(10);
  assert.equal(schema4.isValid({ lesson: 'history', date: '11.02.12', grade: 2 }), true);
});

test('task4', () => {
  const validator = new Validator();
  const schema1 = validator.array().length(4);
  const schema2 = validator.array().length(12312312455434);

  assert.equal(schema1.isValid(null), false);
  assert.equal(schema1.isValid([]), false);
  assert.equal(schema1.isValid([1, 2, 3, 4]), true);
  assert.equal(schema2.isValid([]), false);
  assert.equal(schema2.isValid([1, 23, 4, 5]), false);
});

test('task5', () => {
  const validator = new Validator();
  const schema1 = validator.object().shape({
    id: validator.number().odd(),
    basket: validator.array().length(3),
  });
  const schema2 = validator.object().shape({
    id: validator.number().even(),
    basket: validator.array().length(1231233),
  });
  const schema3 = validator.object().shape({
    id: validator.number().even(),
    basket: validator.array().length(2),
    payment: validator.array().length(2),
  });

  assert.equal(schema1.isValid({ id: 11, basket: ['potatos', 'tomatos', 'oranges'] }), true);
  assert.equal(schema1.isValid({ id: 12, basket: ['potatos', 'tomatos', 'oranges'] }), false);
  assert.equal(schema1.isValid({}), false);
  assert.equal(schema2.isValid({ id: 11, basket: [] }), false);
  assert.equal(schema2.isValid([1, 23, 4, 5]), false);
  assert.equal(schema2.isValid(2), false);
  assert.equal(schema3.isValid({ id: 16, basket: ['apple', 'cucumber'], payment: ['10 dollars', '10 cents'] }), true);
  assert.equal(schema3.isValid({ id: 17, basket: ['apple', 'cucumber'], payment: ['10 dollars', '10 cents'] }), false);
  assert.equal(schema3.isValid({ id: 16, basket: ['apple'], payment: ['10 dollars', '10 cents'] }), false);
});
