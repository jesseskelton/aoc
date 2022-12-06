const fs = require('fs');
const data = fs.readFileSync('input.txt', 'utf8');
const lines = data.split(/\n/);

matches = []
badges = []
for (let i = 0; i < lines.length; i++) 
{
    let line = lines[i]
    const frontCompartment = line.substring(0, line.length / 2)
    const backCompartment = line.substring(line.length / 2, line.length)
    
    matches[i] = findMatchesTwoStrings(frontCompartment, backCompartment, "")
    
    // check the elves badge every third
    badgeMatches = ""
    if (i % 3 === 2) {
        badges.push(findMatchesTwoStrings(
                findMatchesTwoStrings(lines[i - 2], lines[i - 1]), 
                lines[i]
            )
        )
    }
}

//p1
console.log(sumScores(matches))
// p2
console.log(sumScores(badges))

function findMatchesTwoStrings(string1, string2, currentMatches = "") {
    string1.split('').map(char => {
        if (string2.indexOf(char) != -1) {
            if (currentMatches.indexOf(char) === -1) {
                currentMatches = currentMatches + char
            }
        }
    })
    return currentMatches
}

function calculatePoints(character) {
    const points = character.charCodeAt(0) - 96
    if (points < 0) {
        return character.charCodeAt(0) - 38 // A..B..C
    }
    return points
}

function sumScores(matches) {
    let score = 0
    matches.forEach(char => score += calculatePoints(char))
    return score
}