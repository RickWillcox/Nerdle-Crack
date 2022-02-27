import { AllAnswers } from './allAnswers';

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
    console.log(largestNumber);
    answer[largestNumber[0]] = largestNumber[2]; //set the answer index to the character
}

function makeFrequencyTable(arr: string[]): Object {
    let ft = { ...frequencyTable };
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
        var notFound = true;
        split.forEach((x) => {
            if (ans.includes(x)) {
                console.log(x, ans.includes(x));
                notFound = false;
            }
        });
        return notFound;
    });
}

function removeDuplicates(arr: string[]): string[] {
    const z: string[] = [];
    arr.forEach((x) => {
        let y = [...new Set(x.split(''))];
        if (y.length === 8) z.push(x);
    });
    // console.log(z);
    return z;
}

var answer: string[] = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
var answersNodupes: string[] = removeDuplicates(AllAnswers);

let ft = makeFrequencyTable(answersNodupes);
console.table(ft);
getLargestNumber(ft, answersNodupes);
console.log(answer);

while ([...new Set(answer)].length !== 8) {}
