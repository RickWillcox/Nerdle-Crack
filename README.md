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
Total possible Nerdle Answers:  17723
Total possible Nerdle Answers with no duplicate characters:  3331
Current answer:  □□□□□□□□
 
┌─────────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬──────┐
│ (index) │  0  │  1  │  2  │  3  │  4  │  5  │  6  │  7  │  8  │  9  │  *  │  /  │  +  │  -  │  =   │
├─────────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┼──────┤
│    0    │  0  │ 508 │ 334 │ 350 │ 373 │ 343 │ 329 │ 345 │ 368 │ 381 │  0  │  0  │  0  │  0  │  0   │
│    1    │ 250 │ 135 │ 197 │ 156 │ 189 │ 170 │ 181 │ 173 │ 202 │ 168 │ 694 │ 162 │ 391 │ 263 │  0   │
│    2    │ 48  │ 254 │ 171 │ 171 │ 184 │ 135 │ 179 │ 165 │ 191 │ 188 │ 128 │ 285 │ 532 │ 700 │  0   │
│    3    │ 106 │ 262 │ 345 │ 270 │ 274 │ 221 │ 221 │ 170 │ 160 │ 102 │ 246 │ 262 │ 236 │ 456 │  0   │
│    4    │  0  │ 364 │ 255 │ 251 │ 230 │ 216 │ 200 │ 219 │ 222 │ 195 │ 278 │ 292 │ 187 │ 246 │ 176  │
│    5    │ 104 │ 161 │ 171 │ 192 │ 190 │ 137 │ 164 │ 170 │ 182 │ 188 │  0  │  0  │  0  │  0  │ 1672 │
│    6    │ 40  │ 378 │ 232 │ 190 │ 171 │ 197 │ 183 │ 153 │ 147 │ 157 │  0  │  0  │  0  │  0  │ 1483 │
│    7    │ 438 │ 271 │ 297 │ 303 │ 309 │ 329 │ 295 │ 332 │ 371 │ 386 │  0  │  0  │  0  │  0  │  0   │
└─────────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┴──────┘
Possible Answers Left:  0 3331
Character: = | Index: 5 | Solutions left with this character: 1672
Current answer:  □□□□□=□□
------------------
 
┌─────────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬──────┐
│ (index) │  0  │  1  │  2  │  3  │  4  │  5  │  6  │  7  │  8  │  9  │  *  │  /  │  +  │  -  │  =   │
├─────────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┼──────┤
│    0    │  0  │ 171 │ 137 │ 151 │ 192 │ 182 │ 186 │ 197 │ 229 │ 227 │  0  │  0  │  0  │  0  │  0   │
│    1    │ 96  │ 92  │ 90  │ 104 │ 99  │ 110 │ 100 │ 119 │ 115 │ 115 │ 338 │ 58  │ 192 │ 44  │  0   │
│    2    │ 24  │ 29  │ 73  │ 89  │ 94  │ 59  │ 93  │ 86  │ 94  │ 79  │  0  │  0  │ 476 │ 476 │  0   │
│    3    │  0  │ 224 │ 188 │ 148 │ 124 │ 120 │ 80  │ 52  │ 16  │  0  │ 194 │ 134 │ 192 │ 200 │  0   │
│    4    │  0  │ 164 │ 177 │ 195 │ 201 │ 179 │ 171 │ 200 │ 213 │ 172 │  0  │  0  │  0  │  0  │  0   │
│    5    │  0  │  0  │  0  │  0  │  0  │  0  │  0  │  0  │  0  │  0  │  0  │  0  │  0  │  0  │ 1672 │
│    6    │  0  │ 362 │ 228 │ 170 │ 161 │ 177 │ 159 │ 139 │ 133 │ 143 │  0  │  0  │  0  │  0  │  0   │
│    7    │ 214 │ 134 │ 158 │ 152 │ 154 │ 175 │ 145 │ 182 │ 169 │ 189 │  0  │  0  │  0  │  0  │  0   │
└─────────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┴──────┘
Possible Answers Left:  1 1672
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
Current answer:  14+76=90
```
## Same as above but not removing duplicates
```

Total possible Nerdle Answers:  17723
Total possible Nerdle Answers with no duplicate characters:  3331 //not used
Current answer:  □□□□□□□□
 
┌─────────┬──────┬──────┬──────┬──────┬──────┬──────┬──────┬──────┬──────┬──────┬──────┬──────┬──────┬──────┬───────┐
│ (index) │  0   │  1   │  2   │  3   │  4   │  5   │  6   │  7   │  8   │  9   │  *   │  /   │  +   │  -   │   =   │
├─────────┼──────┼──────┼──────┼──────┼──────┼──────┼──────┼──────┼──────┼──────┼──────┼──────┼──────┼──────┼───────┤
│    0    │  0   │ 3255 │ 2107 │ 1875 │ 1846 │ 1716 │ 1733 │ 1683 │ 1708 │ 1800 │  0   │  0   │  0   │  0   │   0   │
│    1    │ 1480 │ 1133 │ 1292 │ 1069 │ 1240 │ 1138 │ 1194 │ 1011 │ 1159 │ 964  │ 2978 │ 414  │ 2002 │ 649  │   0   │
│    2    │ 258  │ 1048 │ 793  │ 647  │ 789  │ 730  │ 802  │ 674  │ 844  │ 776  │ 774  │ 1354 │ 3405 │ 4829 │   0   │
│    3    │ 252  │ 2017 │ 1949 │ 1645 │ 1547 │ 1321 │ 1140 │ 860  │ 743  │ 537  │ 1256 │ 1527 │ 1606 │ 1323 │   0   │
│    4    │ 720  │ 1695 │ 1349 │ 1281 │ 1251 │ 1208 │ 1192 │ 1159 │ 1152 │ 1185 │ 940  │ 1103 │ 471  │ 1699 │ 1318  │
│    5    │ 229  │ 1063 │ 902  │ 787  │ 783  │ 726  │ 722  │ 655  │ 695  │ 646  │  0   │  0   │  0   │  0   │ 10515 │
│    6    │ 214  │ 2525 │ 1510 │ 1245 │ 1186 │ 1095 │ 1055 │ 1003 │ 976  │ 1024 │  0   │  0   │  0   │  0   │ 5890  │
│    7    │ 1830 │ 1698 │ 1868 │ 1648 │ 1839 │ 1740 │ 1844 │ 1657 │ 1881 │ 1718 │  0   │  0   │  0   │  0   │   0   │
└─────────┴──────┴──────┴──────┴──────┴──────┴──────┴──────┴──────┴──────┴──────┴──────┴──────┴──────┴──────┴───────┘
Possible Answers Left:  0 17723
Character: = | Index: 5 | Solutions left with this character: 10515
Current answer:  □□□□□=□□
------------------
 
┌─────────┬──────┬──────┬──────┬──────┬──────┬──────┬──────┬──────┬──────┬──────┬──────┬─────┬──────┬──────┬───────┐
│ (index) │  0   │  1   │  2   │  3   │  4   │  5   │  6   │  7   │  8   │  9   │  *   │  /  │  +   │  -   │   =   │
├─────────┼──────┼──────┼──────┼──────┼──────┼──────┼──────┼──────┼──────┼──────┼──────┼─────┼──────┼──────┼───────┤
│    0    │  0   │ 1201 │ 1132 │ 1136 │ 1149 │ 1145 │ 1168 │ 1155 │ 1190 │ 1239 │  0   │  0  │  0   │  0   │   0   │
│    1    │ 755  │ 707  │ 714  │ 706  │ 712  │ 708  │ 713  │ 706  │ 714  │ 704  │ 1586 │ 184 │ 1486 │ 120  │   0   │
│    2    │ 129  │ 373  │ 440  │ 393  │ 461  │ 437  │ 474  │ 408  │ 490  │ 430  │  0   │  0  │ 3240 │ 3240 │   0   │
│    3    │  0   │ 1510 │ 1310 │ 1110 │ 910  │ 710  │ 510  │ 310  │ 110  │  0   │ 1141 │ 798 │ 1486 │ 610  │   0   │
│    4    │ 720  │ 1118 │ 1123 │ 1108 │ 1099 │ 1079 │ 1079 │ 1061 │ 1068 │ 1060 │  0   │  0  │  0   │  0   │   0   │
│    5    │  0   │  0   │  0   │  0   │  0   │  0   │  0   │  0   │  0   │  0   │  0   │  0  │  0   │  0   │ 10515 │
│    6    │  0   │ 2407 │ 1378 │ 1129 │ 1058 │ 975  │ 925  │ 887  │ 844  │ 912  │  0   │  0  │  0   │  0   │   0   │
│    7    │ 1205 │ 1097 │ 1133 │ 1038 │ 1086 │ 1023 │ 1040 │ 969  │ 999  │ 925  │  0   │  0  │  0   │  0   │   0   │
└─────────┴──────┴──────┴──────┴──────┴──────┴──────┴──────┴──────┴──────┴──────┴──────┴─────┴──────┴──────┴───────┘
Possible Answers Left:  1 10515
Character: + | Index: 2 | Solutions left with this character: 3240
Current answer:  □□+□□=□□
------------------
 
┌─────────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬───┬───┬──────┬───┬──────┐
│ (index) │  0  │  1  │  2  │  3  │  4  │  5  │  6  │  7  │  8  │  9  │ * │ / │  +   │ - │  =   │
├─────────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┼───┼───┼──────┼───┼──────┤
│    0    │  0  │ 755 │ 655 │ 555 │ 455 │ 355 │ 255 │ 155 │ 55  │  0  │ 0 │ 0 │  0   │ 0 │  0   │
│    1    │ 360 │ 352 │ 344 │ 336 │ 328 │ 320 │ 312 │ 304 │ 296 │ 288 │ 0 │ 0 │  0   │ 0 │  0   │
│    2    │  0  │  0  │  0  │  0  │  0  │  0  │  0  │  0  │  0  │  0  │ 0 │ 0 │ 3240 │ 0 │  0   │
│    3    │  0  │ 755 │ 655 │ 555 │ 455 │ 355 │ 255 │ 155 │ 55  │  0  │ 0 │ 0 │  0   │ 0 │  0   │
│    4    │ 360 │ 352 │ 344 │ 336 │ 328 │ 320 │ 312 │ 304 │ 296 │ 288 │ 0 │ 0 │  0   │ 0 │  0   │
│    5    │  0  │  0  │  0  │  0  │  0  │  0  │  0  │  0  │  0  │  0  │ 0 │ 0 │  0   │ 0 │ 3240 │
│    6    │  0  │  0  │ 55  │ 155 │ 255 │ 355 │ 455 │ 555 │ 655 │ 755 │ 0 │ 0 │  0   │ 0 │  0   │
│    7    │ 288 │ 296 │ 304 │ 312 │ 320 │ 328 │ 336 │ 344 │ 352 │ 360 │ 0 │ 0 │  0   │ 0 │  0   │
└─────────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┴───┴───┴──────┴───┴──────┘
Possible Answers Left:  2 3240
Character: 1 | Index: 0 | Solutions left with this character: 755
Current answer:  1□+□□=□□
------------------
 
┌─────────┬────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬───┬───┬─────┬───┬─────┐
│ (index) │ 0  │  1  │  2  │  3  │  4  │  5  │  6  │  7  │  8  │  9  │ * │ / │  +  │ - │  =  │
├─────────┼────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┼───┼───┼─────┼───┼─────┤
│    0    │ 0  │ 755 │  0  │  0  │  0  │  0  │  0  │  0  │  0  │  0  │ 0 │ 0 │  0  │ 0 │  0  │
│    1    │ 80 │ 79  │ 78  │ 77  │ 76  │ 75  │ 74  │ 73  │ 72  │ 71  │ 0 │ 0 │  0  │ 0 │  0  │
│    2    │ 0  │  0  │  0  │  0  │  0  │  0  │  0  │  0  │  0  │  0  │ 0 │ 0 │ 755 │ 0 │  0  │
│    3    │ 0  │ 100 │ 100 │ 100 │ 100 │ 100 │ 100 │ 100 │ 55  │  0  │ 0 │ 0 │  0  │ 0 │  0  │
│    4    │ 80 │ 79  │ 78  │ 77  │ 76  │ 75  │ 74  │ 73  │ 72  │ 71  │ 0 │ 0 │  0  │ 0 │  0  │
│    5    │ 0  │  0  │  0  │  0  │  0  │  0  │  0  │  0  │  0  │  0  │ 0 │ 0 │  0  │ 0 │ 755 │
│    6    │ 0  │  0  │ 55  │ 100 │ 100 │ 100 │ 100 │ 100 │ 100 │ 100 │ 0 │ 0 │  0  │ 0 │  0  │
│    7    │ 71 │ 72  │ 73  │ 74  │ 75  │ 76  │ 77  │ 78  │ 79  │ 80  │ 0 │ 0 │  0  │ 0 │  0  │
└─────────┴────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┴───┴───┴─────┴───┴─────┘
Possible Answers Left:  3 755
Character: 1 | Index: 3 | Solutions left with this character: 100
Current answer:  1□+1□=□□
------------------
 
┌─────────┬────┬─────┬────┬────┬────┬────┬────┬────┬────┬────┬───┬───┬─────┬───┬─────┐
│ (index) │ 0  │  1  │ 2  │ 3  │ 4  │ 5  │ 6  │ 7  │ 8  │ 9  │ * │ / │  +  │ - │  =  │
├─────────┼────┼─────┼────┼────┼────┼────┼────┼────┼────┼────┼───┼───┼─────┼───┼─────┤
│    0    │ 0  │ 100 │ 0  │ 0  │ 0  │ 0  │ 0  │ 0  │ 0  │ 0  │ 0 │ 0 │  0  │ 0 │  0  │
│    1    │ 10 │ 10  │ 10 │ 10 │ 10 │ 10 │ 10 │ 10 │ 10 │ 10 │ 0 │ 0 │  0  │ 0 │  0  │
│    2    │ 0  │  0  │ 0  │ 0  │ 0  │ 0  │ 0  │ 0  │ 0  │ 0  │ 0 │ 0 │ 100 │ 0 │  0  │
│    3    │ 0  │ 100 │ 0  │ 0  │ 0  │ 0  │ 0  │ 0  │ 0  │ 0  │ 0 │ 0 │  0  │ 0 │  0  │
│    4    │ 10 │ 10  │ 10 │ 10 │ 10 │ 10 │ 10 │ 10 │ 10 │ 10 │ 0 │ 0 │  0  │ 0 │  0  │
│    5    │ 0  │  0  │ 0  │ 0  │ 0  │ 0  │ 0  │ 0  │ 0  │ 0  │ 0 │ 0 │  0  │ 0 │ 100 │
│    6    │ 0  │  0  │ 55 │ 45 │ 0  │ 0  │ 0  │ 0  │ 0  │ 0  │ 0 │ 0 │  0  │ 0 │  0  │
│    7    │ 10 │ 10  │ 10 │ 10 │ 10 │ 10 │ 10 │ 10 │ 10 │ 10 │ 0 │ 0 │  0  │ 0 │  0  │
└─────────┴────┴─────┴────┴────┴────┴────┴────┴────┴────┴────┴───┴───┴─────┴───┴─────┘
Possible Answers Left:  4 100
Character: 2 | Index: 6 | Solutions left with this character: 55
Current answer:  1□+1□=2□
------------------
 
┌─────────┬────┬────┬────┬───┬───┬───┬───┬───┬───┬────┬───┬───┬────┬───┬────┐
│ (index) │ 0  │ 1  │ 2  │ 3 │ 4 │ 5 │ 6 │ 7 │ 8 │ 9  │ * │ / │ +  │ - │ =  │
├─────────┼────┼────┼────┼───┼───┼───┼───┼───┼───┼────┼───┼───┼────┼───┼────┤
│    0    │ 0  │ 55 │ 0  │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0  │ 0 │ 0 │ 0  │ 0 │ 0  │
│    1    │ 10 │ 9  │ 8  │ 7 │ 6 │ 5 │ 4 │ 3 │ 2 │ 1  │ 0 │ 0 │ 0  │ 0 │ 0  │
│    2    │ 0  │ 0  │ 0  │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0  │ 0 │ 0 │ 55 │ 0 │ 0  │
│    3    │ 0  │ 55 │ 0  │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0  │ 0 │ 0 │ 0  │ 0 │ 0  │
│    4    │ 10 │ 9  │ 8  │ 7 │ 6 │ 5 │ 4 │ 3 │ 2 │ 1  │ 0 │ 0 │ 0  │ 0 │ 0  │
│    5    │ 0  │ 0  │ 0  │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0  │ 0 │ 0 │ 0  │ 0 │ 55 │
│    6    │ 0  │ 0  │ 55 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0  │ 0 │ 0 │ 0  │ 0 │ 0  │
│    7    │ 1  │ 2  │ 3  │ 4 │ 5 │ 6 │ 7 │ 8 │ 9 │ 10 │ 0 │ 0 │ 0  │ 0 │ 0  │
└─────────┴────┴────┴────┴───┴───┴───┴───┴───┴───┴────┴───┴───┴────┴───┴────┘
Possible Answers Left:  5 55
Character: 0 | Index: 1 | Solutions left with this character: 10
Current answer:  10+1□=2□
------------------
 
┌─────────┬────┬────┬────┬───┬───┬───┬───┬───┬───┬───┬───┬───┬────┬───┬────┐
│ (index) │ 0  │ 1  │ 2  │ 3 │ 4 │ 5 │ 6 │ 7 │ 8 │ 9 │ * │ / │ +  │ - │ =  │
├─────────┼────┼────┼────┼───┼───┼───┼───┼───┼───┼───┼───┼───┼────┼───┼────┤
│    0    │ 0  │ 10 │ 0  │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0  │ 0 │ 0  │
│    1    │ 10 │ 0  │ 0  │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0  │ 0 │ 0  │
│    2    │ 0  │ 0  │ 0  │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 10 │ 0 │ 0  │
│    3    │ 0  │ 10 │ 0  │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0  │ 0 │ 0  │
│    4    │ 1  │ 1  │ 1  │ 1 │ 1 │ 1 │ 1 │ 1 │ 1 │ 1 │ 0 │ 0 │ 0  │ 0 │ 0  │
│    5    │ 0  │ 0  │ 0  │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0  │ 0 │ 10 │
│    6    │ 0  │ 0  │ 10 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0  │ 0 │ 0  │
│    7    │ 1  │ 1  │ 1  │ 1 │ 1 │ 1 │ 1 │ 1 │ 1 │ 1 │ 0 │ 0 │ 0  │ 0 │ 0  │
└─────────┴────┴────┴────┴───┴───┴───┴───┴───┴───┴───┴───┴───┴────┴───┴────┘
Possible Answers Left:  6 10
Character: 0 | Index: 4 | Solutions left with this character: 1
Current answer:  10+10=2□
------------------
 
┌─────────┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┐
│ (index) │ 0 │ 1 │ 2 │ 3 │ 4 │ 5 │ 6 │ 7 │ 8 │ 9 │ * │ / │ + │ - │ = │
├─────────┼───┼───┼───┼───┼───┼───┼───┼───┼───┼───┼───┼───┼───┼───┼───┤
│    0    │ 0 │ 1 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │
│    1    │ 1 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │
│    2    │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 1 │ 0 │ 0 │
│    3    │ 0 │ 1 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │
│    4    │ 1 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │
│    5    │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 1 │
│    6    │ 0 │ 0 │ 1 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │
│    7    │ 1 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │
└─────────┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┘
Possible Answers Left:  7 1
Character: 0 | Index: 7 | Solutions left with this character: 1
Current answer:  10+10=20
```


## Nerdle Games using 14+76=90
```
nerdlegame 39 3/6

⬛🟪⬛⬛⬛🟩🟪⬛
🟩🟩🟩🟩⬛🟩🟩⬛
🟩🟩🟩🟩🟩🟩🟩🟩 
```
![image](https://user-images.githubusercontent.com/53924507/155885632-34ba7b59-eeb4-4b28-ae98-ac5ebdf92ebc.png)
