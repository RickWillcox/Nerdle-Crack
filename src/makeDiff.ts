import { evaluate } from 'mathjs';
import { AllAnswers } from './allAnswers';
import { NewAnswers } from './newAnswers';

let inMineNotHis = AllAnswers.filter((x) => !NewAnswers.includes(x));
// console.log(inMineNotHis);

console.log('Raw Mine: ', AllAnswers.length, ' | Raw His: ', NewAnswers.length);
console.log('In mine not his:', inMineNotHis.length);

let inHisNotMine = NewAnswers.filter((x) => !AllAnswers.includes(x));
// console.log(inHisNotMine);
console.log('In hit not mine:', inHisNotMine.length);

let everything = AllAnswers.concat(NewAnswers);

console.log('both sets concat: ', everything.length);

let everythingNoDupes = [...new Set(everything)];

console.log('both sets concat dupes removed: ', everythingNoDupes.length);

let eq = ['1+2=3', '2+2=3', "0/2/3=0"];

let b = everythingNoDupes.filter((e) => {
    let s = e.split('=');
    return eval(`${s[0]}==${s[1]}`);
});
console.log(b.length);
console.log(b)

const fs = require('fs');

const writeStream = fs.createWriteStream('FinalAnswers.txt');
const pathName = writeStream.path;

b.forEach((value) => writeStream.write(`${value}\n`));

// the finish event is emitted when all data has been flushed from the stream
writeStream.on('finish', () => {
    console.log(`wrote all the array data to file ${pathName}`);
});

// handle the errors on the write process
writeStream.on('error', (err) => {
    console.error(`There is an error writing the file ${pathName} => ${err}`);
});

// close the stream
writeStream.end();
