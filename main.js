const redTeamScore = document.querySelector(".red__team__score");
const gameBox = document.querySelector(".game__box");
const blueTeamScore = document.querySelector(".blue__team__score");
const gameBoxTable = document.querySelector(".game__box__table");
const btnRefresh = document.querySelector(".refresh");
const btnMaxBoxNum = document.querySelector(".maxBox");
const BLUE = true;
const RED = false;

btnRefresh.addEventListener("click", () => {
  reset();
  console.log("refreshed");
});

let maxSize = 3;
let blueScore = 0;
let redScore = 0;
let boxArray = new Array(maxSize * maxSize).fill(null);
// false red turn , true blue
// always blue first start
let turn = BLUE;
let gameState = true;

let id = 0;

const drawTable = () => {
  delete boxArray;
  boxArray = new Array(maxSize * maxSize).fill(null);
  for (let i = 0; i < maxSize; i++) {
    const tr = document.createElement("tr");
    for (let i = 0; i < maxSize; i++) {
      const td = createItem(id);
      tr.appendChild(td);
      id++;
    }
    gameBoxTable.appendChild(tr);
  }
};

const createItem = (id) => {
  const td = document.createElement("td");
  td.className = "container";
  td.id = id;
  td.innerHTML = id;
  td.addEventListener("click", (e) => {
    let boxId = e.target.id;
    if (gameState === false || boxArray[boxId] !== null) return;
    boxArray[boxId] = turn;
    e.target.style.backgroundColor = turn ? "blue" : "red";
    if (checkBingo(turn, boxId)) {
      console.log(`${turn ? "blue" : "red"} Win`);
      if (turn === RED) {
        redTeamScore.innerText = ++redScore;
      } else {
        blueTeamScore.innerText = ++blueScore;
      }
      gameState = false;
    }
    turn = !turn;
  });
  return td;
};

drawTable();
let tds = document.querySelectorAll("td");

btnMaxBoxNum.addEventListener("click", () => {
  reset();
  id = 0;
  const trs = document.querySelectorAll("tr");
  trs.forEach((v) => {
    v.remove();
  });
  maxSize = parseInt(document.querySelector(".maxBox__num").value);
  if (maxSize > 7) {
    maxSize = 7;
  }
  drawTable();
});

const reset = () => {
  boxArray.fill(null);
  turn = BLUE;
  tds.forEach((v) => {
    v.style.backgroundColor = "antiquewhite";
  });
  gameState = true;
};

const checkBingo = (turn, id) => {
  if (drawCheck()) {
    console.log("its draw");
    gameState = false;
    return;
  }

  let index = parseInt(id);

  // row Check
  let start = parseInt(index / maxSize) * maxSize;
  let end = start + maxSize;
  if (checkDirect(start, end, 1, turn)) return true;

  // col Check
  start = parseInt(index % maxSize);
  end = maxSize * maxSize;
  if (checkDirect(start, end, maxSize, turn)) return true;

  // right diagonal Check
  if (parseInt(index % (maxSize + 1)) === 0) {
    start = 0;
    end = maxSize * maxSize;
    if (checkDirect(start, end, maxSize + 1, turn)) return true;
  }
  // left diagonal Check

  if (parseInt(index % (maxSize - 1)) === 0) {
    start = maxSize - 1;
    end = start * maxSize + 1;
    if (checkDirect(start, end, maxSize - 1, turn)) return true;
  }
  return false;
};

const checkDirect = (start, end, value, turn) => {
  let _start = start;
  while (_start < end) {
    if (boxArray[_start] !== turn) return false;
    _start += value;
  }
  return true;
};

const drawCheck = () => {
  for (let index = 0; index < boxArray.length; index++) {
    if (boxArray[index] === null) return false;
  }
  // true is draw
  return true;
};
