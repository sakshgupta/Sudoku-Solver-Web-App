# To check if it is possible to find the solution of the sudoku.
# To find the solution for the both the algos

import math
import copy
from crook import loop_basic_rule, loop_algorithm, check_box_eliminate_others

N = 9


def isPossible(grid, row, col, num):
    for x in range(9):
        if grid[row][x] == num:
            return False
    for x in range(9):
        if grid[x][col] == num:
            return False
    startRow = row - row % 3
    startCol = col - col % 3
    for i in range(3):
        for j in range(3):
            if grid[i + startRow][j + startCol] == num:
                return False
    return True


def solve1(grid, row, col):
    if (row == N - 1 and col == N):
        return True
    if col == N:
        row += 1
        col = 0
    if grid[row][col] > 0:
        return solve1(grid, row, col + 1)
    for num in range(1, N + 1, 1):
        if isPossible(grid, row, col, num):
            grid[row][col] = num
            if solve1(grid, row, col + 1):
                return True
        grid[row][col] = 0
    return False

def solve2(question):
    # Copy existing information from question
    solution = copy.deepcopy(question)
    possible_value = {}

    # Cell notation [i, j] i , j: from 1 to 9
    # First is to include all possible numbers for each cell
    for i in range(1, 10):
        for j in range(1, 10):
            possible_value[i, j] = list(range(1, 10))

    # If the cell is already filled, remove all possible numbers for this cell
    for i in range(1, 10):
        for j in range(1, 10):
            if solution[i - 1][j - 1] != 0:
                possible_value[i, j] = []

    # Run basic rules and Crook's algorithm
    while True:
        solution_old = copy.deepcopy(solution)
        loop_basic_rule(possible_value, solution)
        loop_algorithm(possible_value, solution)
        check_box_eliminate_others(possible_value)
        if solution == solution_old:
            break

   

    # # Check if the final result is solution
    if (min([sum(x) for x in zip(*solution)]) == max([sum(x) for x in zip(*solution)])
            and min([sum(x) for x in solution]) == max([sum(x) for x in solution])
            and min([sum(x) for x in zip(*solution)]) == 45
            and min([sum(x) for x in solution]) == 45):
        # pass
        return [solution, True]
    else:
        # if not found solution then solve remaining with backtracking
        # solve1(solution,0,0)
        return [solution, False]
    # return solution
