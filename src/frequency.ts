import { AllAnswers } from './allAnswers';
import { NewAnswers } from './newAnswers';
import { FinalAnswers } from './FinalAnswers';

var frequencyTable: Object = {
    0: {
        '0': 0,
        '1': 0,
        '2': 0,
        '3': 0,
        '4': 0,
        '5': 0,
        '6': 0,
        '7': 0,
        '8': 0,
        '9': 0,
        '*': 0,
        '/': 0,
        '+': 0,
        '-': 0,
        '=': 0,
    },
    1: {
        '0': 0,
        '1': 0,
        '2': 0,
        '3': 0,
        '4': 0,
        '5': 0,
        '6': 0,
        '7': 0,
        '8': 0,
        '9': 0,
        '*': 0,
        '/': 0,
        '+': 0,
        '-': 0,
        '=': 0,
    },
    2: {
        '0': 0,
        '1': 0,
        '2': 0,
        '3': 0,
        '4': 0,
        '5': 0,
        '6': 0,
        '7': 0,
        '8': 0,
        '9': 0,
        '*': 0,
        '/': 0,
        '+': 0,
        '-': 0,
        '=': 0,
    },
    3: {
        '0': 0,
        '1': 0,
        '2': 0,
        '3': 0,
        '4': 0,
        '5': 0,
        '6': 0,
        '7': 0,
        '8': 0,
        '9': 0,
        '*': 0,
        '/': 0,
        '+': 0,
        '-': 0,
        '=': 0,
    },
    4: {
        '0': 0,
        '1': 0,
        '2': 0,
        '3': 0,
        '4': 0,
        '5': 0,
        '6': 0,
        '7': 0,
        '8': 0,
        '9': 0,
        '*': 0,
        '/': 0,
        '+': 0,
        '-': 0,
        '=': 0,
    },
    5: {
        '0': 0,
        '1': 0,
        '2': 0,
        '3': 0,
        '4': 0,
        '5': 0,
        '6': 0,
        '7': 0,
        '8': 0,
        '9': 0,
        '*': 0,
        '/': 0,
        '+': 0,
        '-': 0,
        '=': 0,
    },
    6: {
        '0': 0,
        '1': 0,
        '2': 0,
        '3': 0,
        '4': 0,
        '5': 0,
        '6': 0,
        '7': 0,
        '8': 0,
        '9': 0,
        '*': 0,
        '/': 0,
        '+': 0,
        '-': 0,
        '=': 0,
    },
    7: {
        '0': 0,
        '1': 0,
        '2': 0,
        '3': 0,
        '4': 0,
        '5': 0,
        '6': 0,
        '7': 0,
        '8': 0,
        '9': 0,
        '*': 0,
        '/': 0,
        '+': 0,
        '-': 0,
        '=': 0,
    },
};

function getLargestNumber(ft: Object, subArr: string[]) {
    let largestNumber: [number, number, string] = [0, 0, ' ']; // index number char
    for (let slotKey in ft) {
        //slotKey 1-7
        for (let charKey in ft[slotKey]) {
            // 0-9+-=/*
            if (
                ft[slotKey][charKey] > largestNumber[1] && //number is largest so far
                !answer.includes(ft[slotKey]) && //char not already in answer
                answer[slotKey] === ' ' //answer index is still blank
            ) {
                largestNumber = [slotKey, ft[slotKey][charKey], charKey];
            }
        }
    }
    answer[largestNumber[0]] = largestNumber[2]; //set the answer index to the character
    return largestNumber;
}

function makeFrequencyTable(arr: string[]): Object {
    let ft = JSON.parse(JSON.stringify(frequencyTable));
    arr.forEach((answer) => {
        let splitAnswer = answer.split('');
        for (let i = 0; i < splitAnswer.length; i++) {
            ft[i][splitAnswer[i]] += 1;
        }
    });
    return ft;
}

function removeAnswersUsed(arr: string[], ans: string[]): string[] {
    return arr.filter((item) => {
        var split = item.split('');
        var notInAnswer = false;
        var found = true;
        for (let i = 0; i < split.length; i++) {
            if (ans[i] == ' ') {
                continue;
            }
            if (ans[i] != split[i]) {
                found = false;
            }
        }
        return found;
    });
}

function createStringFromArray(arr: string[]): string {
    let rtnString: string = [];
    for (let char of arr) {
        if (char === ' ') {
            rtnString += '???';
        } else {
            rtnString += char;
        }
    }
    return rtnString;
}

function removeDuplicates(arr: string[]): string[] {
    const z: string[] = [];
    arr.forEach((x) => {
        let y = [...new Set(x.split(''))];
        if (y.length === 8) z.push(x);
    });
    return z;
}

function getBestAnswer(answerArr: string[], ft?: Object) {
    if (count >= 8) {
        return;
    }
    answerArr = removeAnswersUsed(answerArr, answer);

    ft = makeFrequencyTable(answerArr);
    let largestNum = getLargestNumber(ft, answerArr);

    console.log(' ');
    console.table(ft);
    console.log('Possible Answers Left: ', count, answerArr.length);
    console.log(
        `Character: ${largestNum[2]} | Index: ${largestNum[0]} | Solutions left with this character: ${largestNum[1]}`
    );
    console.log('Current answer: ', createStringFromArray(answer));
    console.log('------------------');

    count += 1;
    getBestAnswer(answerArr, ft);
}

var count = 0;
var answer: string[] = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
var answersNoDupes: string[] = removeDuplicates(FinalAnswers);

console.log('Total possible Nerdle Answers: ', FinalAnswers.length);
// console.log(
//     'Total possible Nerdle Answers with no duplicate characters: ',
//     answersNoDupes.length
// );
console.log('Current answer: ', createStringFromArray(answer));
getBestAnswer(FinalAnswers, frequencyTable);
