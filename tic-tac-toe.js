let player = 'x';
let numberOfTurns = 0;
let clickedBox = [];

let totalMove = ['', '', '', '', '', '', '', '', ''];
let xMove = [];
let oMove = [];

const winningMoves = [
  // Horizontal
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  // Vertical
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  // Diagonal
  [1, 5, 9],
  [3, 5, 7],
];

const boxes = document.querySelectorAll('.js-box');

boxes.forEach((box, index) => {
  box.addEventListener('click', () => {
    clicked(index, box);
    winningCheck();
  });
});

function clicked(index, box) {
  if (!clickedBox.includes(index + 1)) {
    // console.log(`clicked ${index + 1}\nhas not been clicked\nplayer ${player}`);

    if (player === 'x') {
      player = 'o';
      xMove.push(index + 1);
      numberOfTurns++;
      addStyleX(box);
    } else {
      player = 'x';
      oMove.push(index + 1);
      numberOfTurns++;
      addStyleO(box);
    }
    // console.log(`X ${xMove}`);
    // console.log(`O ${oMove}`);
    console.log(numberOfTurns);

    clickedBox.push(index + 1);
  } else {
    console.log(`has been clicked ${index + 1}`);
    console.log(boxMoves[index]);
  }
}

function addStyleX(box) {
  box.classList.add('style-X');
  box.innerHTML = 'X';
}

function addStyleO(box) {
  box.classList.add('style-O');
  box.innerHTML = 'O';
}

function winningCheck() {
  if (xMove.length >= 3) {
    if (checkWinningMoves(xMove)) {
      let winPattern = checkWinningMoves(xMove) - 1;
      console.log('X Win');
      displayWiner('x', winPattern);
    }
    if (checkWinningMoves(oMove)) {
      let winPattern = checkWinningMoves(oMove) - 1;
      console.log('O Win');
      displayWiner('o', winPattern);
    }
  }
}

function checkWinningMoves(move) {
  move.sort();
  console.log(move);

  let matchingCount = 0;
  let matchedSet = -1;
  let hasBeenFound = false;

  for (let i = 0; i < winningMoves.length; i++) {
    const winningMovesSet = winningMoves[i];
    // console.log(winningMovesSet);

    for (let j = 0; j < move.length; j++) {
      const moveValue = move[j];
      // console.log(moveValue);

      if (winningMovesSet.includes(moveValue)) {
        // console.log(`Found ${moveValue} in set ${i}`);
        matchingCount++;
      }
    }
    if (matchingCount === 3) {
      // console.log(`Found matched set in ${i}`);
      matchedSet = i;
      hasBeenFound = true;
      break;
    } else {
      matchingCount = 0;
    }
    if (hasBeenFound) {
      break;
    }
  }
  return matchedSet + 1;
}

const boxing = [
  document.querySelector('.box1'),
  document.querySelector('.box2'),
  document.querySelector('.box3'),
  document.querySelector('.box4'),
  document.querySelector('.box5'),
  document.querySelector('.box6'),
  document.querySelector('.box7'),
  document.querySelector('.box8'),
  document.querySelector('.box9'),
];

let fadeBox = [true, true, true, true, true, true, true, true, true];

function displayWiner(winner, winPattern) {
  const winPatternSet = winningMoves[winPattern];
  console.log(winPatternSet);

  if (winner === 'x') {
    for (let i = 0; i < winPatternSet.length; i++) {
      const winPatternValue = winPatternSet[i];
      const winPatternValueIndex = winPatternValue - 1;
      console.log(winPatternValueIndex);

      fadeBox[winPatternValueIndex] = false;
    }
    console.log(fadeBox);
  }

  if (winner === 'o') {
    for (let i = 0; i < winPatternSet.length; i++) {
      const winPatternValue = winPatternSet[i];
      const winPatternValueIndex = winPatternValue - 1;
      console.log(winPatternValueIndex);

      fadeBox[winPatternValueIndex] = false;
    }
    console.log(fadeBox);
  }

  fadeBox.forEach((value, index) => {
    if (value) {
      boxing[index].classList.add('box-dim');
    }
  });

  fadeBox.forEach((value, index) => {
    if (!value) {
      boxing[index].classList.add('box-emphasize');
    }
  });
}

document.querySelector('.js-reset-button').addEventListener('click', reset);

function reset() {
  console.log('reset');
  location.reload();
}
