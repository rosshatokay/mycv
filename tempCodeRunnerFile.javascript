/**
 * @param {number[][]} grid
 * @return {number}
 */
var orangesRotting = function (grid) {
  const EMPTY = 0
  const FRESH = 1
  const ROTTEN = 2

  const q = []

  const m = grid.length
  const n = grid[0].length

  let minutes = 0
  let numOfFresh = 0

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === FRESH) numOfFresh++
      if (grid[i][j] === ROTTEN) q.push([i, j])
    }
  }

  const directions = [[0, 1], [0, -1], [-1, 0], [1, 0]]

  

  return fresh == 0 ? time : -1
};

console.log(orangesRotting([[2, 1, 1], [1, 1, 0], [0, 1, 1]]))