const fs = require('fs');
const data = fs.readFileSync('input.txt', 'utf8');
const lines = data.split(/\n/);

let stacks = []
let secondStacks = []
let endOfStacks = false;
let moves = []

for (let i = 0; i < lines.length; i++) 
{
    let line = lines[i]
    
    if (isEndOfInput(line) && !endOfStacks)
    {
        endOfStacks = true;
    } 

    if (!endOfStacks) // build stacks 
    {
        for (let count = 1; count <= line.length; count += 4)
        {
            if (line[count] !== " ") 
            {
                stacks[count] = stacks[count] || [];
                stacks[count].push(line[count])
            }
        }
    }
    else // moves time
    {
        if (line.length > 0 && line[1] != 1)
        {
            moves.push(line)
        }
    }
}

stacks = stacks.filter(n => n) // trim that bad boy up.
secondStacks = stacks.map((arr) => arr.slice()) // deep copy

moves.forEach(line => {

    const matches = line.match(/\d+/g);
    const numberOfMoves = matches[0]
    const start = matches[1] - 1
    const end = matches[2] - 1

    //console.log('move ' + numberOfMoves + ' from ' + start + ' to ' + end)

    tempStack = []
    for (let i = 0; i < numberOfMoves; i++)
    {
        stacks[end].unshift(stacks[start].shift()) // this line is confusing. move 3 from 2 to 1
        tempStack.push(secondStacks[start].shift())
    }
    secondStacks[end].unshift(...tempStack)
})

//console.log(stacks)
//console.log(secondStacks)

let p1 = ""
let p2 = ""
for (let i = 0; i < stacks.length; i++)
{
    p1 += stacks[i][0]
    p2 += secondStacks[i][0]
}

console.log(p1)
console.log(p2)

function isEndOfInput(line) {
    if(line[1] == 1)
    {
        return true
    }

    return false
}
