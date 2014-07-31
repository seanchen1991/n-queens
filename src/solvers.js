/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var solution = new Array(n);
  var innerArray = new Array(n);
  for (var i = 0, x = solution.length; i < x; i++) {
    solution[i] = innerArray;
  }
  for (var i = 0, x = solution.length; i < x; i++) {
    for (var j = 0, y = innerArray.length; j < y; j++) {
      if (i === j) {
        solution[i][j]++;
      }
    }
  }
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var columnTracker = {}, solutionCount = 0;
  var checkRows = function(row) {
    for (var column = 0; column < n; column++) {
      if (!columnTracker[column]) {
        columnTracker[column] = true;
        if (row + 1 < n) {
          checkRows(row + 1);
        } else {
          solutionCount++;
        }
        columnTracker[column] = false;
      }
    }
    return;
  };

  checkRows(0);
  console.log('Number of solutions for ' + n + 'rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var row, solution = []; //fixme
  for (var i = 0; i < n; i++) {
    row = [];
    for (var j = 0; j < n; j++) {
      row.push(0);
    }
    solution.push(row);
  }

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
/*window.countNQueensSolutions = function(n) {
  // instantiate tracker objects for columns, major, and minor diagonals
  var columnTracker = {}, majorTracker = {}, minorTracker = {}, solutionCount = (n === 0) ? 1 : 0; //fixme
  // instantiate checkRows function
  var checkRows = function(row) {
    // for all columns with index less than n
    for (var column = 0; column < n; column++) {
      if (!columnTracker[column] && !majorTracker[column + row] && !minorTracker[column - row + n - 1]) {
        columnTracker[column] = true;
        majorTracker[column + row] = true;
        minorTracker[column - row + n - 1] = true;
        if (row + 1 < n) {
          checkRows(row + 1);
        } else {
          solutionCount++;
        }
        columnTracker[column] = false
        majorTracker[column + row] = false;
        minorTracker[column - row + n - 1] = false;
      }
    }
    return;
  };

  checkRows(0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};*/

// n-queens solution utilizing bitshifting
window.countNQueensSolutions = function(n, current, left, right, down) {
  // initialize solutionCount to 0
  var solutionCount = (n === 0) ? 1 : 0;
  // let current, left, right, and down be 0 if any are not given
  current = current || 0;
  left = left || 0;
  right = right || 0;
  down = down || 0;
  // initialize a variable referencing possible threats
  var threats = left | right | down;
  // iterate over ??
  for (var i = 1, x = 2 << (n - 1); i < x; i*=2) {
    // if threats AND i are falsy, and if we reach a board of size n
      // increment solutionCount since we've checked all rows for possible threats and none came up
      // otherwise, increment solutionCount with a recursive call to 
      // countNQueensBitShift, passing in updated values
    // return solutionCount 
    if (!(threats & i)) {
      if (current + 1 === n) {
        solutionCount++;
      } else {
        solutionCount += countNQueensSolutions(n, current + 1, (left + i) << 1, (right + i) >> 1, down + i);
      }
    }
  }
  return solutionCount;
};
