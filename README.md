# Nerdle Crack
# tldr: 14+76=90

### Getting all the possible answers for Nerdle.

This involved finding out all the possible combinations of answers, or better put valid equations eg `1+1=2` is valid and `1+1=3` is not. 
To begin we figured out what combos are even possible.
To read this x is a digit/number so x can be either 0-9, xx is a two digit number and xxx is a three digit number. O means operator and = is equals sign.
```
123 group - 
x O xx = xxx
xx O x = xxx
x O xxx = xx
xxx O x = xx
xx O xxx = x
xxx O xx = x 
```

```
222 group - 
xx O xx = xx
```
```
1112 group - 
x O x O x = xx
xx O x O x = x
x O xx O x = x
x O x O xx = x
```
Now we have defined all the possible combinations of answers we can just brute force this using nested loops to try every single possible combination of numbers and operators and then check to see which ones are a valid equation (left side = right side)

There is a few rules we can use to reduce out number of checks / computations - 

The equals sign is always the last non number in the equation so `2 * 2 = 2 * 2` is invalid.

There can be no leading zeroes eg: `11+02=13` would never occur as the `02` has a leading zero. Same goes for three digit numbers.

Side note that a lone `0` is valid so `0+100=100` is valid(ignore characters)

Therefor we can say that the range of numbers for one, two and three digits are:
```
1: 0-9 > 10 possibilities
2: 10-99 > 89 possibilities
3: 100-999 > 899 possibilities
Operators: + - / * > 4 possibilities
Equals: = > possibilities
```
We can work out the number of combinations per possible equation by multiplying the total number of combinations possible per spot in the equation

for example from the 222 group we have the equation 
```
xx   O * xx   =   xx
89 * 4 * 89 * 1 * 89
= 2,819,876 possible combinations of numbers and operators. So that would be 2819876 times to test / loop through to bruteforce.
```
For the other groups we do the same for one line and then just multiply that number by the number of equations in the group
```
123 group = 6 equations
10 * 4 * 89 * 1 * 899 = 3,200,440 combinations 
* total equations(6)
= 19,202,640 total combinations

1112 group = 4 equations
10 * 4 * 10 * 4 * 10 * 1 * 89 = 1,424,000 combinations
* total equations(4)
= 5,696,000 total combinations

Add all together = 27,718,516 Possible combinations using these rules.
```

Using this brute force method which is one of the least efficient ways to do this we need to test roughly 27 million different equations to see if the left side of the equation equals the right side. Doing this is trival so I wont go into that here.

After checking every single equation we were left with `16,713` possible equations that Nerdle can present you.

### The Assumptions
This is not the best way to solve a game like this, if you want a lesson in information theory head [here for a lesson on it using Wordle](https://www.youtube.com/watch?v=v68zYyaEmEA)

Since this method is beyond me at the moment, what I have chosen to do is calculate the best starting equation based on the probability of a certain character / operator landing in a certain index. I am also assuming that since this is a game of information that including equations with duplicates in them to begin with is not a good idea. Doing so leaves us with 1304 valid starting answers.

Also when selecting the largest number from the frequency table sometimes there is two that are equal. In this case I just take the first one I found that was the largest, overall for this method this wouldn't make almost any difference, however it does mean there is likely many other very similar answers based off this model.

### The Solution

We start with an ANSWER array of length 8, where every element is just an empty space.

We look at our answers and see if any of our answers match any position of our Answer Array
One the first iteration nothing will match so no answers are removed from Answers. Any non matching answers are removed
```
Example of what this step does visually
answer = [' ', '+', ' ', ' ', '=', ' ', ' ', ' '];
input array ["345", "=34", "+12", "s13"]
function(inputarray)
output array ["345", "s13"]
```

For every possible answer in the valid answers array make a frequency table/object for increase its count by 1 every time it occurs.
Select the largest number in the table, take its number/operator and put it in the corresponding index. In the first frequency table you can see the `=` sign in `index 5` was the one with the highest frequency occurring `1040` times. 

We then place the value `=` in `index 5`

This completes the first iteration. 

We run all of this recursively passing in our frequency table we made and the current answer list.

The next iteration then recalculates the Frequency table and answers list based upon what we already have in Answers.

Below is the output showing each iteration and how I arrived at the best equation 14+76=90

```
Total possible Nerdle Answers:  16713
Total possible Nerdle Answers with no duplicate characters:  1304
Current answer:  □□□□□□□□
 
┌─────────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬────┬─────┬─────┬─────┬──────┐
│ (index) │  0  │  1  │  2  │  3  │  4  │  5  │  6  │  7  │  8  │  9  │ *  │  /  │  +  │  -  │  =   │
├─────────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┼────┼─────┼─────┼─────┼──────┤
│    0    │  0  │ 186 │ 132 │ 126 │ 137 │ 150 │ 140 │ 138 │ 148 │ 147 │ 0  │  0  │  0  │  0  │  0   │
│    1    │ 116 │ 100 │ 104 │ 120 │ 116 │ 129 │ 121 │ 136 │ 137 │ 137 │ 76 │  0  │ 12  │  0  │  0   │
│    2    │ 48  │  6  │ 38  │ 22  │ 23  │ 17  │ 41  │ 15  │ 31  │ 23  │ 76 │  0  │ 488 │ 476 │  0   │
│    3    │  0  │ 224 │ 210 │ 162 │ 146 │ 148 │ 98  │ 75  │ 46  │ 19  │ 0  │ 152 │  0  │ 24  │  0   │
│    4    │  0  │ 96  │ 112 │ 116 │ 131 │ 128 │ 126 │ 144 │ 152 │ 123 │ 0  │  0  │  0  │  0  │ 176  │
│    5    │  0  │ 74  │ 34  │ 38  │ 32  │ 19  │ 19  │ 18  │ 15  │ 15  │ 0  │  0  │  0  │  0  │ 1040 │
│    6    │ 40  │ 128 │ 104 │ 106 │ 117 │ 141 │ 145 │ 131 │ 147 │ 157 │ 0  │  0  │  0  │  0  │  88  │
│    7    │ 124 │ 90  │ 142 │ 122 │ 134 │ 132 │ 134 │ 139 │ 160 │ 127 │ 0  │  0  │  0  │  0  │  0   │
└─────────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┴────┴─────┴─────┴─────┴──────┘
Possible Answers Left:  0 1304
Character: = | Index: 5 | Solutions left with this character: 1040
Current answer:  □□□□□=□□
------------------
 
┌─────────┬────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬───┬────┬─────┬─────┬──────┐
│ (index) │ 0  │  1  │  2  │  3  │  4  │  5  │  6  │  7  │  8  │  9  │ * │ /  │  +  │  -  │  =   │
├─────────┼────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┼───┼────┼─────┼─────┼──────┤
│    0    │ 0  │ 149 │ 105 │ 94  │ 112 │ 113 │ 113 │ 110 │ 124 │ 120 │ 0 │ 0  │  0  │  0  │  0   │
│    1    │ 96 │ 92  │ 90  │ 104 │ 99  │ 110 │ 100 │ 119 │ 115 │ 115 │ 0 │ 0  │  0  │  0  │  0   │
│    2    │ 24 │  3  │ 16  │  7  │  9  │  2  │ 14  │  2  │ 11  │  0  │ 0 │ 0  │ 476 │ 476 │  0   │
│    3    │ 0  │ 224 │ 188 │ 148 │ 124 │ 120 │ 80  │ 52  │ 16  │  0  │ 0 │ 76 │  0  │ 12  │  0   │
│    4    │ 0  │ 96  │ 106 │ 108 │ 126 │ 115 │ 113 │ 133 │ 143 │ 100 │ 0 │ 0  │  0  │  0  │  0   │
│    5    │ 0  │  0  │  0  │  0  │  0  │  0  │  0  │  0  │  0  │  0  │ 0 │ 0  │  0  │  0  │ 1040 │
│    6    │ 0  │ 112 │ 100 │ 86  │ 107 │ 121 │ 121 │ 117 │ 133 │ 143 │ 0 │ 0  │  0  │  0  │  0   │
│    7    │ 76 │ 84  │ 100 │ 100 │ 106 │ 109 │ 97  │ 122 │ 123 │ 123 │ 0 │ 0  │  0  │  0  │  0   │
└─────────┴────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┴───┴────┴─────┴─────┴──────┘
Possible Answers Left:  1 1040
Character: + | Index: 2 | Solutions left with this character: 476
Current answer:  □□+□□=□□
------------------
 
┌─────────┬────┬─────┬────┬────┬────┬────┬────┬────┬─────┬─────┬───┬───┬─────┬───┬─────┐
│ (index) │ 0  │  1  │ 2  │ 3  │ 4  │ 5  │ 6  │ 7  │  8  │  9  │ * │ / │  +  │ - │  =  │
├─────────┼────┼─────┼────┼────┼────┼────┼────┼────┼─────┼─────┼───┼───┼─────┼───┼─────┤
│    0    │ 0  │ 112 │ 94 │ 74 │ 62 │ 60 │ 40 │ 26 │  8  │  0  │ 0 │ 0 │  0  │ 0 │  0  │
│    1    │ 0  │ 48  │ 48 │ 50 │ 58 │ 48 │ 52 │ 60 │ 64  │ 48  │ 0 │ 0 │  0  │ 0 │  0  │
│    2    │ 0  │  0  │ 0  │ 0  │ 0  │ 0  │ 0  │ 0  │  0  │  0  │ 0 │ 0 │ 476 │ 0 │  0  │
│    3    │ 0  │ 112 │ 94 │ 74 │ 62 │ 60 │ 40 │ 26 │  8  │  0  │ 0 │ 0 │  0  │ 0 │  0  │
│    4    │ 0  │ 48  │ 48 │ 50 │ 58 │ 48 │ 52 │ 60 │ 64  │ 48  │ 0 │ 0 │  0  │ 0 │  0  │
│    5    │ 0  │  0  │ 0  │ 0  │ 0  │ 0  │ 0  │ 0  │  0  │  0  │ 0 │ 0 │  0  │ 0 │ 476 │
│    6    │ 0  │  0  │ 0  │ 4  │ 40 │ 48 │ 68 │ 80 │ 116 │ 120 │ 0 │ 0 │  0  │ 0 │  0  │
│    7    │ 76 │ 36  │ 40 │ 44 │ 36 │ 52 │ 36 │ 52 │ 44  │ 60  │ 0 │ 0 │  0  │ 0 │  0  │
└─────────┴────┴─────┴────┴────┴────┴────┴────┴────┴─────┴─────┴───┴───┴─────┴───┴─────┘
Possible Answers Left:  2 476
Character: 9 | Index: 6 | Solutions left with this character: 120
Current answer:  □□+□□=9□
------------------
 
┌─────────┬────┬────┬────┬────┬────┬────┬────┬────┬────┬─────┬───┬───┬─────┬───┬─────┐
│ (index) │ 0  │ 1  │ 2  │ 3  │ 4  │ 5  │ 6  │ 7  │ 8  │  9  │ * │ / │  +  │ - │  =  │
├─────────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼─────┼───┼───┼─────┼───┼─────┤
│    0    │ 0  │ 18 │ 18 │ 16 │ 8  │ 18 │ 16 │ 18 │ 8  │  0  │ 0 │ 0 │  0  │ 0 │  0  │
│    1    │ 0  │ 16 │ 16 │ 12 │ 20 │ 12 │ 12 │ 12 │ 20 │  0  │ 0 │ 0 │  0  │ 0 │  0  │
│    2    │ 0  │ 0  │ 0  │ 0  │ 0  │ 0  │ 0  │ 0  │ 0  │  0  │ 0 │ 0 │ 120 │ 0 │  0  │
│    3    │ 0  │ 18 │ 18 │ 16 │ 8  │ 18 │ 16 │ 18 │ 8  │  0  │ 0 │ 0 │  0  │ 0 │  0  │
│    4    │ 0  │ 16 │ 16 │ 12 │ 20 │ 12 │ 12 │ 12 │ 20 │  0  │ 0 │ 0 │  0  │ 0 │  0  │
│    5    │ 0  │ 0  │ 0  │ 0  │ 0  │ 0  │ 0  │ 0  │ 0  │  0  │ 0 │ 0 │  0  │ 0 │ 120 │
│    6    │ 0  │ 0  │ 0  │ 0  │ 0  │ 0  │ 0  │ 0  │ 0  │ 120 │ 0 │ 0 │  0  │ 0 │  0  │
│    7    │ 20 │ 12 │ 8  │ 12 │ 12 │ 16 │ 8  │ 16 │ 16 │  0  │ 0 │ 0 │  0  │ 0 │  0  │
└─────────┴────┴────┴────┴────┴────┴────┴────┴────┴────┴─────┴───┴───┴─────┴───┴─────┘
Possible Answers Left:  3 120
Character: 4 | Index: 1 | Solutions left with this character: 20
Current answer:  □4+□□=9□
------------------
 
┌─────────┬───┬───┬───┬───┬────┬───┬───┬───┬───┬────┬───┬───┬────┬───┬────┐
│ (index) │ 0 │ 1 │ 2 │ 3 │ 4  │ 5 │ 6 │ 7 │ 8 │ 9  │ * │ / │ +  │ - │ =  │
├─────────┼───┼───┼───┼───┼────┼───┼───┼───┼───┼────┼───┼───┼────┼───┼────┤
│    0    │ 0 │ 4 │ 2 │ 4 │ 0  │ 3 │ 2 │ 3 │ 2 │ 0  │ 0 │ 0 │ 0  │ 0 │ 0  │
│    1    │ 0 │ 0 │ 0 │ 0 │ 20 │ 0 │ 0 │ 0 │ 0 │ 0  │ 0 │ 0 │ 0  │ 0 │ 0  │
│    2    │ 0 │ 0 │ 0 │ 0 │ 0  │ 0 │ 0 │ 0 │ 0 │ 0  │ 0 │ 0 │ 20 │ 0 │ 0  │
│    3    │ 0 │ 4 │ 2 │ 4 │ 0  │ 3 │ 2 │ 3 │ 2 │ 0  │ 0 │ 0 │ 0  │ 0 │ 0  │
│    4    │ 0 │ 4 │ 2 │ 2 │ 0  │ 0 │ 4 │ 4 │ 4 │ 0  │ 0 │ 0 │ 0  │ 0 │ 0  │
│    5    │ 0 │ 0 │ 0 │ 0 │ 0  │ 0 │ 0 │ 0 │ 0 │ 0  │ 0 │ 0 │ 0  │ 0 │ 20 │
│    6    │ 0 │ 0 │ 0 │ 0 │ 0  │ 0 │ 0 │ 0 │ 0 │ 20 │ 0 │ 0 │ 0  │ 0 │ 0  │
│    7    │ 4 │ 4 │ 4 │ 0 │ 0  │ 4 │ 2 │ 2 │ 0 │ 0  │ 0 │ 0 │ 0  │ 0 │ 0  │
└─────────┴───┴───┴───┴───┴────┴───┴───┴───┴───┴────┴───┴───┴────┴───┴────┘
Possible Answers Left:  4 20
Character: 1 | Index: 0 | Solutions left with this character: 4
Current answer:  14+□□=9□
------------------
 
┌─────────┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┐
│ (index) │ 0 │ 1 │ 2 │ 3 │ 4 │ 5 │ 6 │ 7 │ 8 │ 9 │ * │ / │ + │ - │ = │
├─────────┼───┼───┼───┼───┼───┼───┼───┼───┼───┼───┼───┼───┼───┼───┼───┤
│    0    │ 0 │ 4 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │
│    1    │ 0 │ 0 │ 0 │ 0 │ 4 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │
│    2    │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 4 │ 0 │ 0 │
│    3    │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 2 │ 2 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │
│    4    │ 0 │ 0 │ 1 │ 1 │ 0 │ 0 │ 1 │ 0 │ 1 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │
│    5    │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 4 │
│    6    │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 4 │ 0 │ 0 │ 0 │ 0 │ 0 │
│    7    │ 1 │ 0 │ 1 │ 0 │ 0 │ 0 │ 1 │ 1 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │
└─────────┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┘
Possible Answers Left:  5 4
Character: 7 | Index: 3 | Solutions left with this character: 2
Current answer:  14+7□=9□
------------------
 
┌─────────┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┐
│ (index) │ 0 │ 1 │ 2 │ 3 │ 4 │ 5 │ 6 │ 7 │ 8 │ 9 │ * │ / │ + │ - │ = │
├─────────┼───┼───┼───┼───┼───┼───┼───┼───┼───┼───┼───┼───┼───┼───┼───┤
│    0    │ 0 │ 2 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │
│    1    │ 0 │ 0 │ 0 │ 0 │ 2 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │
│    2    │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 2 │ 0 │ 0 │
│    3    │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 2 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │
│    4    │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 1 │ 0 │ 1 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │
│    5    │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 2 │
│    6    │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 2 │ 0 │ 0 │ 0 │ 0 │ 0 │
│    7    │ 1 │ 0 │ 1 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │
└─────────┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┘
Possible Answers Left:  6 2
Character: 6 | Index: 4 | Solutions left with this character: 1
Current answer:  14+76=9□
------------------
 
┌─────────┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┐
│ (index) │ 0 │ 1 │ 2 │ 3 │ 4 │ 5 │ 6 │ 7 │ 8 │ 9 │ * │ / │ + │ - │ = │
├─────────┼───┼───┼───┼───┼───┼───┼───┼───┼───┼───┼───┼───┼───┼───┼───┤
│    0    │ 0 │ 1 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │
│    1    │ 0 │ 0 │ 0 │ 0 │ 1 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │
│    2    │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 1 │ 0 │ 0 │
│    3    │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 1 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │
│    4    │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 1 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │
│    5    │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 1 │
│    6    │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 1 │ 0 │ 0 │ 0 │ 0 │ 0 │
│    7    │ 1 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │
└─────────┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┘
Possible Answers Left:  7 1
Character: 0 | Index: 7 | Solutions left with this character: 1
Best Answer Based Always choosing the highest probabilty of greens:  14+76=90

```
