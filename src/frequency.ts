//@ts-nocheck
import { AllAnswers } from './allAnswers';

var frequencyIndex: Object = {
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
    },
};

console.log(frequencyIndex[0]['0']);

AllAnswers.forEach((answer) => {
    let splitAnswer = answer.split('');
    console.log(splitAnswer);
});
