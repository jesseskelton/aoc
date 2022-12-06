const fs = require('fs');
const { exit } = require('process');
const data = fs.readFileSync('input.txt', 'utf8');
const lines = data.split(/\n/);

function hasRepeats(str) {
    return /(.).*\1/.test(str);
}

for (let i = 0; i < lines.length; i++) 
{
    let line = lines[i]
    let packet = ""
    let message = ""
    for (let i = 0; i < line.length; i++)
    {
        packet = packet.concat(line[i])
        message = message.concat(line[i])
        if (packet.length == 4)
        {
            if (!hasRepeats(packet))
            {
                console.log(i + 1)
            }
            else
            {
                packet = packet.slice(1)
            }
        }
        if (message.length == 14)
        {
            if (!hasRepeats(message))
            {
                console.log(i + 1)
            }
            else
            {
                message = message.slice(1)
            }
        }
    }
}