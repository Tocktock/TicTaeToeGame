const redTeamScore = document.querySelector(".red__team__score");
const gameBox = document.querySelector(".game__box");
const blueTeamScore = document.querySelector(".blue__team__score");
const gameBoxTable = document.querySelector(".game__box__table");
const button = document.querySelector("button");

const BLUE = true;
const RED = false;

button.addEventListener("click", () => {
  reset();
  console.log("refreshed");
});

const MAX_SIZE = 3;
let blueScore = 0;
let redScore = 0;
let boxArray = new Array(MAX_SIZE * MAX_SIZE).fill(null);
// false red turn , true blue
// always blue first start
let turn = true;
let gameState = true;

let id = 0;
for (let i = 0; i < 3; i++) {
  const tr = document.createElement("tr");
  for (let i = 0; i < 3; i++) {
    const td = document.createElement("td");
    td.className = "container";
    td.id = id;
    td.innerHTML = id;
    td.addEventListener("click", (e) => {
      if (gameState === false) return;
      let boxId = e.target.id;
      if (boxArray[boxId] !== null) {
        return;
      }
      boxArray[boxId] = turn;
      e.target.style.backgroundColor = turn ? "blue" : "red";
      if (checkBingo(turn, boxId)) {
        console.log(`${turn ? "blue" : "red"} Win`);
        if (turn === false) {
          redTeamScore.innerText = ++redScore;
        } else {
          blueTeamScore.innerText = ++blueScore;
        }
        gameState = false;
      }
      turn = !turn;
    });
    tr.appendChild(td);
    id++;
  }
  gameBoxTable.appendChild(tr);
}
const tds = document.querySelectorAll("td");

const reset = () => {
  boxArray.fill(null);
  turn = true;
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
  let start = parseInt(index / MAX_SIZE) * MAX_SIZE;
  let end = start + MAX_SIZE;
  if (checkDirect(start, end, 1, turn)) return true;

  // col Check
  start = parseInt(index % MAX_SIZE);
  end = MAX_SIZE * MAX_SIZE;
  if (checkDirect(start, end, 3, turn)) return true;
  // right diagonal Check
  if (parseInt(index % (MAX_SIZE + 1)) === 0) {
    start = 0;
    end = MAX_SIZE * MAX_SIZE;
    if (checkDirect(start, end, MAX_SIZE + 1, turn)) return true;
  }
  // left diagonal Check

  if (parseInt(index % (MAX_SIZE - 1)) === 0) {
    start = MAX_SIZE - 1;
    end = start * MAX_SIZE + 1;
    if (checkDirect(start, end, MAX_SIZE - 1, turn)) return true;
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
