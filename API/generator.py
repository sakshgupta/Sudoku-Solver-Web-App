# Used to generate the sudoku grid and solve the problem

from functions import isPossible
from random import randint, shuffle

base = 3
n = base**2

counter = 0


def generator(k):
    grid = [[0 for i in range(0, 9)] for j in range(0, 9)]
    fillDiagonal(grid)
    fillRemaining(grid)
    remove(grid, k)
    return grid


def fillDiagonal(grid):
    i = 0
    while i < n:
        fillBox(grid, i, i)
        i += base


def fillBox(grid, row, col):
    for i in range(0, base):
        for j in range(0, base):
            while True:
                num = randint(1, 9)
                if notInBox(grid, row, col, num):
                    grid[i + row][j + col] = num
                    break


def notInBox(grid, row, col, num):
    for i in range(row, row + base):
        for j in range(col, col + base):
            if grid[i][j] == num:
                return False
    return True


def notInRow(grid, row, num):
    for i in range(0, n):
        if grid[row][i] == num:
            return False
    return True


def notInCol(grid, col, num):
    for i in range(0, n):
        if grid[i][col] == num:
            return False
    return True


def emptySquare(grid):
    for i in range(0, 9):
        for j in range(0, 9):
            if grid[i][j] == 0:
                return True
    return False


def fillRemaining(grid):
    numbers = [i for i in range(1, 10)]
    for i in range(0, 81):
        row = i // 9
        col = i % 9
        if grid[row][col] == 0:
            shuffle(numbers)
            for num in numbers:
                if isPossible(grid, row, col, num):
                    grid[row][col] = num
                    if not emptySquare(grid):
                        return True
                    else:
                        if fillRemaining(grid):
                            return True
            break
    grid[row][col] = 0
    return False


def solve(grid):
    global counter
    for i in range(0, 81):
        row = i//9
        col = i % 9
        if grid[row][col] == 0:
            for value in range(1, 10):
                if isPossible(grid, row, col, value):
                    grid[row][col] = value
                    if not emptySquare(grid):
                        counter += 1
                        break
                    else:
                        if solve(grid):
                            return True
            break
    grid[row][col] = 0


def remove(grid, k):
    while k > 0:
        while True:
            row = randint(0, 8)
            col = randint(0, 8)
            if grid[row][col] != 0:
                break
        backup = grid[row][col]
        grid[row][col] = 0

        copy = []
        for c in grid:
            copy.append(c)
        global counter
        counter = 0
        solve(copy)
        if counter != 1:
            grid[row][col] = backup
        else:
            k -= 1


# grid = generator(g, 40)
# for g in grid:
#     print(g)
