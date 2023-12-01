/* eslint-disable class-methods-use-this */
import GradeSchema from './GradeSchema.js';
import LessonDataSchema from './lessonDataSchema.js';

export default class Validator {
  grade() {
    const validator = (value) => typeof value === 'number'
        && value >= 2
        && value <= 5
        && Number.isInteger(value);
    return new GradeSchema([validator]);
  }

  lessonData() {
    const validator = (value) => typeof value === 'object';
    return new LessonDataSchema([validator]);
  }
}
