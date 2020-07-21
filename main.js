const redTeamScore = document.querySelector(".red__team__score");
const gameBox = document.querySelector(".game__box");
const blueTeamScore = document.querySelector(".blue__team__score");
const gameBoxTable = document.querySelector(".game__box__table")

let blueScore = 0;
let redScore = 0;
let boxArray = new Array(9).fill(null)
// false red turn , true blue
let turn = false

let id = 0;
for (let i = 0; i < 3; i++) {
    const tr = document.createElement("tr");
    for (let i = 0; i < 3; i++) {
        const td = document.createElement("td");
        td.className ="container"
        td.id= id;
        td.innerHTML = id;
        td.addEventListener("click",(e)=> {
        
            let boxId = e.target.id;
            if(boxArray[boxId] !== null) {return}
            boxArray[boxId] = turn;
            e.target.style.backgroundColor = turn ? "red" : "blue";
            turn = !turn;
            console.log(boxArray)
            if(checkBingo(turn, boxId)) {
                console.log(`${turn ? "red" : "blue"} Win`);
                if( turn === false) {
                    redTeamScore.innerText = ++redScore;
                } else {
                    blueTeamScore.innerText = ++blueScore;
                }

            }
        })
        tr.appendChild(td);
        id++;
    }
    gameBoxTable.appendChild(tr)
}

console.log(boxArray)
const checkBingo = (turn, id) => {

    let index = id;
    // angle right down
    
        // left up
        if( !checkDirect(index, -4, turn) && !checkDirect(index, +4, turn) )
        {return true}

    // angle right up
        // right up
        if(!checkDirect(index, -2, turn) && !checkDirect(index, +2, turn))
        {return true}

    // angle right
        if(!checkDirect(index, +1, turn) && !checkDirect(index ,-1, turn))
        {return true}

    // angle up
        if(!checkDirect(index , -3, turn) && !checkDirect(index, +3 , turn))
        {return true}

    return false;
}

const checkDirect = (index ,value, turn) => {
    let temp = index + value;
    while(temp >=0 && temp <= 9) {
        if(boxArray[value] != turn) {
            return false;
        }
        temp + value;
    }
}