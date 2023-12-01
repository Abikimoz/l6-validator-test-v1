/* eslint-disable class-methods-use-this */
export default class LessonDataSchema {
  constructor(validators) {
    this.validators = [...validators];
  }

  isValid(value) {
    if ((typeof value.lesson !== 'undefined')
      && (typeof value.date !== 'undefined')
      && (typeof value.grade !== 'undefined')
      && Object.keys(value).length === 3
      && value.date.length === 8
      && value.grade >= 2
      && value.grade <= 5
      && Number.isInteger(value.grade)
      && (value.lesson === 'math'
      || value.lesson === 'english'
      || value.lesson === 'programming'
      || value.lesson === 'history'
      || value.lesson === 'philosophy'
      || value.lesson === 'sports'
      || value.lesson === 'arts')) {
      return true;
    }
    return false;
  }

  passed(num) {
    const validator = (value) => ((num >= 3 && num <= 5) && value.grade > num);
    // return new LessonDataSchema([...this.validators, validator]);
    this.validators[1] = validator;
    return this;
  }
}
