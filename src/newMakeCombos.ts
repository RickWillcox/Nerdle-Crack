import { evaluate } from 'mathjs';
const fs = require('fs');

const char = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '0',
    '*',
    '/',
    '-',
    '+',
    '=',
];

const getCombinations = (arr = []) => {
    const combine = (sub, ind) => {
        let result = [];
        let i, l, p;
        for (i = ind, l = arr.length; i < l; i++) {
            p = sub.slice(0);
            p.push(arr[i]);
            result = result.concat(combine(p, i + 1));
            result.push(p.join(''));
        }
        return result;
    };
    return combine([], 0);
};

const a = ['1', '2', '3', '+', '=', '4'];

var result = [];

function permutation(arr, currentSize) {
    if (currentSize == 1) {
        result.push(arr.join(''));
        return;
    }

    for (let i = 0; i < currentSize; i++) {
        permutation(arr, currentSize - 1);
        if (currentSize % 2 == 1) {
            let temp = arr[0];
            arr[0] = arr[currentSize - 1];
            arr[currentSize - 1] = temp;
        } else {
            let temp = arr[i];
            arr[i] = arr[currentSize - 1];
            arr[currentSize - 1] = temp;
        }
    }
}

permutation(char, char.length);

let c = result.filter((r) => {
    let d = r.split('=');
    let f = d[0] + `==` + d[1];
    try {
        console.log(eval(f));
        return eval(f);
    } catch {
        return false;
    }
});
console.log(c);
// use result here

// const combos = getCombinations(a).filter((ch) => {
//     return evaluate(ch);
// });
// console.log(combos);
// const writeStream = fs.createWriteStream('all_answers_new.txt');
// const pathName = writeStream.path;

// combos.forEach((value) => writeStream.write(`${value}\n`));

// // the finish event is emitted when all data has been flushed from the stream
// writeStream.on('finish', () => {
//     console.log(`wrote all the array data to file ${pathName}`);
// });

// // handle the errors on the write process
// writeStream.on('error', (err) => {
//     console.error(`There is an error writing the file ${pathName} => ${err}`);
// });

// // close the stream
// writeStream.end();
