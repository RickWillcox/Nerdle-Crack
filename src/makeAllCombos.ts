// = only in 5/6/7
// no operator in 1
// max operators is 2
// no 0 after equals
// 3 2 1   1000 100 10
// 2 2 2
// 1 1 1 2     16 combos of operators  10* 1.6mil
//

import { allPrimeNumbers1000 } from './sets';
import { evaluate } from 'mathjs';
const fs = require('fs');
const operators: string[] = ['*', '/', '+', '-'];

function oneTwoThree(): string[] {
    // Possible combinations
    // x OP xx = xxx - solution 1
    // xx OP x = xxx - solution 2
    // xxx OP x = xx - solution 3
    // x OP xxx = xx - solution 4
    // xxx OP xx = x - solution 5
    // xx OP xxx = x - solution 6
    var validCombos: string[] = [];
    let count = 0;

    for (let xxx = MIN_THREE; xxx <= MAX_THREE; xxx++) {
        operators.forEach((op) => {
            for (let x = MIN_ONE; x <= MAX_ONE; x++) {
                for (let xx = MIN_TWO; xx <= MAX_TWO; xx++) {
                    operators.forEach((op) => {
                        // check all solution 1 / 1 2 3
                        if (evaluate(`${x}${op}${xx}`) === xxx) {
                            validCombos.push(`"${x}${op}${xx}=${xxx}",`);
                        }
                        // check all solution 2 / 2 1 3
                        if (evaluate(`${xx}${op}${x}`) === xxx) {
                            validCombos.push(`"${xx}${op}${x}=${xxx}",`);
                        }
                        // xxx OP x = xx - solution 3 / 3 1 2
                        if (evaluate(`${xxx}${op}${x}`) === xx) {
                            validCombos.push(`"${xxx}${op}${x}=${xx}",`);
                        }
                        // x OP xxx = xx - solution 4 / 1 3 2
                        if (evaluate(`${x}${op}${xxx}`) === xx) {
                            validCombos.push(`"${x}${op}${xxx}=${xx}",`);
                        }
                        // xxx OP xx = x - solution 5 / 3 2 1
                        if (evaluate(`${xxx}${op}${xx}`) === x) {
                            validCombos.push(`"${xxx}${op}${xx}=${x}",`);
                        }
                        // xx OP xxx = x - solution 6 / 2 3 1
                        if (evaluate(`${xx}${op}${xxx}`) === x) {
                            validCombos.push(`"${xx}${op}${xxx}=${x}",`);
                        }
                        count += 1;
                    });
                }
            }
        });
    }
    // console.log('123: ', count);
    return validCombos;
}

function twoTwoTwo(): string[] {
    // Possible combinations
    // xx OP xx = xx - solution 1
    var validCombos: string[] = [];
    let count = 0;

    for (let xx1 = MIN_TWO; xx1 <= MAX_TWO; xx1++) {
        for (let xx2 = MIN_TWO; xx2 <= MAX_TWO; xx2++) {
            for (let xx3 = MIN_TWO; xx3 <= MAX_TWO; xx3++) {
                operators.forEach((op) => {
                    // check all solution 1 / 2 2 2
                    if (evaluate(`${xx1}${op}${xx2}`) === xx3) {
                        validCombos.push(`"${xx1}${op}${xx2}=${xx3}",`);
                    }
                    count += 1;
                });
            }
        }
    }

    // console.log('222: ', count);
    return validCombos;
}

function oneOneOneTwo(): string[] {
    // Possible combinations
    // x OP x OP x = xx - solution 1
    // x OP x OP xx = x3 - solution 2
    // x OP xx OP x = x2 - solution 3
    // xx OP x OP x = x1 - solution 4
    var validCombos: string[] = [];
    var count = 0;
    for (let x1 = MIN_ONE; x1 < MAX_ONE; x1++) {
        for (let x2 = MIN_ONE; x2 < MAX_ONE; x2++) {
            for (let x3 = MIN_ONE; x3 < MAX_ONE; x3++) {
                for (let xx = MIN_TWO; xx < MAX_TWO; xx++) {
                    operators.forEach((op) => {
                        // solution 1
                        if (evaluate(`${x1}${op}${x2}${op}${x3}`) === xx) {
                            validCombos.push(
                                `"${x1}${op}${x2}${op}${x3}=${xx}",`
                            );
                        }
                        // solution 2
                        if (evaluate(`${x1}${op}${x2}${op}${xx}`) === x3) {
                            validCombos.push(
                                `"${x1}${op}${x2}${op}${xx}=${x1}",`
                            );
                        }
                        // solution 3
                        if (evaluate(`${x1}${op}${xx}${op}${x3}`) === x2) {
                            validCombos.push(
                                `"${x1}${op}${xx}${op}${x3}=${x2}",`
                            );
                        }
                        // solution 4
                        if (evaluate(`${xx}${op}${x2}${op}${x3}`) === x1) {
                            validCombos.push(
                                `"${xx}${op}${x2}${op}${x3}=${x1}",`
                            );
                        }
                        count += 1;
                    });
                }
            }
        }
    }
    // console.log(count);
    return validCombos;
}
const MIN_ONE = 0;
const MAX_ONE = 9;
const MIN_TWO = 10;
const MAX_TWO = 99;
const MIN_THREE = 100;
const MAX_THREE = 999;

var allValidCombos: string[] = [];
var oneTwoThreeArr: string[] = [];
var twoTwoTwoArr: string[] = [];
var oneOneOneTwoArr: string[] = [];

oneTwoThreeArr = oneTwoThreeArr.concat(oneTwoThree()); //1m52s
twoTwoTwoArr = twoTwoTwoArr.concat(twoTwoTwo()); // 14s
oneOneOneTwoArr = oneOneOneTwoArr.concat(oneOneOneTwo()); // 1.6s

allValidCombos = oneTwoThreeArr.concat(twoTwoTwoArr, oneOneOneTwoArr);
console.log('All Valid Combos Pre Remove Dupes:', allValidCombos.length);

allValidCombos = [...new Set(allValidCombos)];
console.log('All Valid Combos:', allValidCombos.length);

const writeStream = fs.createWriteStream('all_answers.txt');
const pathName = writeStream.path;

allValidCombos.forEach((value) => writeStream.write(`${value}\n`));

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

// console.log(oneTwoThreeArr.length); //12960000 iterations
// console.log(twoTwoTwoArr.length); // 2916000 iterations
// console.log(oneOneOneTwoArr.length); // 26244 iterations
