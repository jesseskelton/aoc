const fs = require('fs');
const data = fs.readFileSync('input.txt', 'utf8');
const lines = data.split(/\n/);

let outcomes = {
    "ROCK": { points: 1, beats: "SCISSORS", loses: "PAPER" },
    "PAPER": { points: 2, beats: "ROCK", loses: "SCISSORS" },
    "SCISSORS": { points: 3, beats: "PAPER", loses: "ROCK" },
};

const moveMap = {
    "A": "ROCK",
    "B": "PAPER",
    "C": "SCISSORS",
    "X": "ROCK",
    "Y": "PAPER",
    "Z": "SCISSORS"
}

const requiredResult = {
    "X": "LOSE",
    "Y": "DRAW",
    "Z": "WIN"
}

let p1 = 0, p2 = 0;

for (let i = 0; i < lines.length; i++) 
{
    let line = lines[i]
    let move = line.split(" ")

    let opponent = moveMap[move[0]]
    let you = moveMap[move[1]]
    let score = outcomes[you].points;

    if (you == opponent) {
        score += 3; // draw
    } else if (outcomes[you].beats == opponent) {
        score += 6; // win
    }

    p1 += score;

    score = 0;

    let outcome = requiredResult[move[1]]

    if (outcome === "WIN") {
        score = 6 + outcomes[outcomes[opponent].loses].points
    } else if (outcome === "DRAW") {
        score = 3 + outcomes[opponent].points
    } else {
        score = outcomes[outcomes[opponent].beats].points
    }

    p2 += score;
}

console.log(p1);
console.log(p2);