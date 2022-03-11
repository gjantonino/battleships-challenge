# battleships-challenge
This is an exercise from an interview which I didn't complete successfully at the time and wanted to finish it.

The goal is to create a function that receives a battleship game board of N x M size, with ships already layed out, and returns the amount of ships found of each type. Ships are represented by a "#" character and water is represented by a "." character.

## Ship types can be the following:

patrolBoat = #
subamire = ##
destroyer = ###

Destroyer ships can also take an "L" shape in any direction. In the example below, there are 4 destroyer ships, 3 submarines and 2 patrolBoats

            ['.','#','#','.','#',"#"], r = 0
            ['.','.','#','.','.',"."], r = 1
            ['.','#','.','.','.',"#"], r = 2
            ['.','#','#','.','.',"#"], r = 3
            ['.','.','.','.','.',"."], r = 4
            ['.','#','#','.','#',"#"], r = 5
            ['.','#','.','.','.',"."], r = 6
            ['.','.','#','.','#',"."], r = 7
            ['.','#','#','.','.',"#"], r = 8
         c =  0   1   2   3   4   5

## Solution Approach

I attemped to solve this by using recursive "crawling" function, that once a ship is first found will try to crawl in all possible directions and count the amount of positions found in each direction. At the same time, memoizing the positions that belong to a ship so they position is not detected again (similar to try to sink the ship).

## Run tests

Run tests with "npm test".

There is a "boards.js" file under test/boards where you can add more board layouts to test. Make sure you add the expected result as an array of the amount of ships for each type that the test layout has. i.e [5,2,3] means 5 destroyers, 2 submaires, 3 patrolBoats. The test will iterate over the boards and output the results.