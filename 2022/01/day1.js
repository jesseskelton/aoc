const fs = require('fs');
const data = fs.readFileSync('input.txt', 'utf8');
const lines = data.split(/\n/);

let elves = [], total = 0;

for (let i = 0; i < lines.length; i++) 
{
    let line = lines[i];
    
    if (line.length != 0)
    {
        total = total + parseInt(line)
    }
    else
    {
        elves.push(total)
        total = 0;
    }
}

elves = elves.sort((a,b) => b - a)

console.log('Part 1')
console.log(elves.at(0))

console.log('Part 2')
console.log(elves.slice(0, 3).reduce((sum, value) => sum + value))
