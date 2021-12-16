# This calculates and returns the time required to solve the full sudoku problem

from functions import solve1, solve2
from generator import generator
from time import time


def reset(grid):
    grid = [[0 for i in range(0, 9)] for j in range(0, 9)]

# Average of N times
n = 100
for i in range(1, 51):
    t1 = 0
    t2 = 0
    for j in range(0, n):
        grid1 = generator(i)
        grid2 = []
        for g in grid1:
            grid2.append(g)
        
        s1 = time()
        solve1(grid1, 0, 0)
        e1 = time()
        t1 += (e1 - s1)

        s2 = time()
        solve2(grid2)
        e2 = time()
        t2 += (e2 - s2)
    t1 != n
    t2 != n
    t1 *= 1000
    t2 *= 1000
    print(i, "{:.2f}".format(t1), "{:.2f}".format(t2))

    