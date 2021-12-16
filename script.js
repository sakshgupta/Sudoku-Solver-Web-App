var arr = [[], [], [], [], [], [], [], [], []];
// Temporary Array to Set Color to Numbers inside Sudoku
var temp = [[], [], [], [], [], [], [], [], []];

// Get the Initial Values in Puzzle
for (var i = 0; i < 9; i++) {
  for (var j = 0; j < 9; j++) {
    arr[i][j] = document.getElementById(i * 9 + j);
  }
}

// Mark all Values False
function initializeTemp(temp) {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      temp[i][j] = false;
    }
  }
}

// Set Values True where Intial Values are Given
function setTemp(board, temp) {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      if (board[i][j] != 0) {
        temp[i][j] = true;
      }
    }
  }
}

// Set Color to Cells that were Intially Filled
function setColor(temp) {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      if (temp[i][j] == true) {
        // arr[i][j].style.color = "#DC3545";
        arr[i][j].style.color = "#00ebff";
      }
    }
  }
}

// Set Color to Elements that Were Filled after the Sudoku Solver Function was Called
function resetColor() {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      arr[i][j].style.color = "#4b8271";
    }
  }
}

// Variale to Hold Sudoku
var board = [[], [], [], [], [], [], [], [], []];

let easybutton = document.getElementById("generate-sudoku-easy");
let mediumbutton = document.getElementById("generate-sudoku-medium");
let hardbutton = document.getElementById("generate-sudoku-hard");
let randombutton = document.getElementById("generate-sudoku-random");
let generate = document.getElementById("generate-blank");
let k = document.getElementById("blank-range");
let solve1 = document.getElementById("solve1");
let solve2 = document.getElementById("solve2");
let time = document.getElementById("time-taken-sudoku");

// console.log(arr)

function changeBoard(board) {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      if (board[i][j] != 0) {
        arr[i][j].innerText = board[i][j];
      } else {
        arr[i][j].innerText = "";
      }
    }
  }
}

// On Click of Easy Sudoku
easybutton.onclick = function () {
  var xhrRequest = new XMLHttpRequest();
  xhrRequest.onload = function () {
    var response = JSON.parse(xhrRequest.response);
    console.log(response)
    initializeTemp(temp);
    resetColor();
    board = response.board;
    setTemp(board, temp);
    setColor(temp);
    changeBoard(board);
  };
  xhrRequest.open("get", "https://sugoku.herokuapp.com/board?difficulty=easy");
  xhrRequest.send();
};

// On Click of Medium Sudoku
mediumbutton.onclick = function () {
  var xhrRequest = new XMLHttpRequest();
  xhrRequest.onload = function () {
    var response = JSON.parse(xhrRequest.response);
    console.log(response)
    initializeTemp(temp);
    resetColor();
    board = response.board;
    setTemp(board, temp);
    setColor(temp);
    changeBoard(board);
  };
  xhrRequest.open(
    "get",
    "https://sugoku.herokuapp.com/board?difficulty=medium"
  );
  xhrRequest.send();
};

// On Click of Hard Sudoku
hardbutton.onclick = function () {
  var xhrRequest = new XMLHttpRequest();
  xhrRequest.onload = function () {
    var response = JSON.parse(xhrRequest.response);
    console.log(response)
    initializeTemp(temp);
    resetColor();
    board = response.board;
    setTemp(board, temp);
    setColor(temp);
    changeBoard(board);
  };
  xhrRequest.open("get", "https://sugoku.herokuapp.com/board?difficulty=hard");
  xhrRequest.send();
};

// On Click of Random Sudoku
randombutton.onclick = function () {
  var xhrRequest = new XMLHttpRequest();
  xhrRequest.onload = function () {
    var response = JSON.parse(xhrRequest.response);
    console.log(response)
    initializeTemp(temp);
    resetColor();
    board = response.board;
    setTemp(board, temp);
    setColor(temp);
    changeBoard(board);
  };
  xhrRequest.open(
    "get",
    "https://sugoku.herokuapp.com/board?difficulty=random"
  );
  xhrRequest.send();
};

generate.onclick = function () {
  let n = k.value;
  let url = "http://127.0.0.1:5000/generate/" + n;

  fetch(url)
    .then((res) => res.json())
    .then((out) => {
      initializeTemp(temp);
      resetColor();
      board = out;
      setTemp(board, temp);
      setColor(temp);
      changeBoard(board);
    })
    .catch((err) => {
      throw err;
    });
};

function updateTextInput(val) {
  document.getElementById("textInput").value = val;
}

// REAL SUDOKU SOLVING FUNCTION IN JS

function isValid(board, r, c, val) {
  // Not Repeating in Same Row
  for (var row = 0; row < 9; row++) {
    if (board[row][c] == val) return false;
  }

  // Not Repeating in Same Column [Actually Can Combine Both Conditions [Row & Col]]
  for (var col = 0; col < 9; col++) {
    if (board[r][col] == val) return false;
  }

  // Sub-Grid
  var r = r - (r % 3);
  var c = c - (c % 3);

  for (var cr = r; cr < r + 3; cr++) {
    for (var cc = c; cc < c + 3; cc++) {
      if (board[cr][cc] == val) {
        return false;
      }
    }
  }
  return true;
}

//  REAL SOLVER SUDOKU FUNCTION
function solveSudokuHelper(board, r, c) {
  // Base Case [Reached on Last Row]
  if (r == 9) {
    changeBoard(board);
    return;
  }

  // If Column is 9 -> Go to First Element in Next Row
  if (c == 9) {
    solveSudokuHelper(board, r + 1, 0);
    return;
  }

  // If the Cell is Already Filled, You can Skip it
  if (board[r][c] != 0) {
    solveSudokuHelper(board, r, c + 1);
    return;
  }

  // 0 is there in Current Position
  for (var i = 1; i <= 9; i++) {
    if (isValid(board, r, c, i)) {
      // Assign the Number i
      board[r][c] = i;
      // Check for Rest of Sudoku
      var res = solveSudokuHelper(board, r, c + 1);
      if (res == true) {
        return true;
      }
      // Make the Cell Empty [BackTrack for Remaining Values]
      board[r][c] = 0;
    }
  }
  // If the Board is UnSolvable
  return false;
}

function solveSudoku(board) {
  // This will call Helper Recursive Function to Solve Sudoku
  solveSudokuHelper(board, 0, 0);
}

// When we Click on "Solve" Button, Solve Sudoko Function is Called
solve1.onclick = async () => {
  const rawResponse = await fetch("http://localhost:5000/api/backtracking", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(board),
  });
  const content = await rawResponse.json();
  //   console.log(content);
  changeBoard(content["board"]);
  time.innerHTML = content["time"] + " ns";
};

solve2.onclick = async () => {
  const rawResponse = await fetch("http://localhost:5000/api/set", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(board),
  });
  const content = await rawResponse.json();
  //   console.log(content);
  changeBoard(content["board"]);
  time.innerHTML = content["time"] + " ns";
  if (!content["success"]) {
    alert("Crooks's cannot solve this sudoku completely 😔");
  }
};
