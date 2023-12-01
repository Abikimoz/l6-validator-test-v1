import Validator from './src/Validator.js';

const v = new Validator();
const schema2 = v.lessonData().passed(3);

console.log(schema2.isValid({ lesson: 'programming', date: '11.02.12', grade: 3 })); // true
console.log(schema2.isValid({ lesson: 'history', date: '11.02.12', grade: 2 })); // false

export default Validator;
