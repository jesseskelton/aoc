const fs = require('fs');
var util = require('util')
const data = fs.readFileSync('2022/07/input.txt', 'utf8');
//const data = fs.readFileSync('input.txt', 'utf8');
const lines = data.split(/\n/);

let tree = {
    parent: null,
    name: "/",
    children: [],
    files: []
}

let currentDirectory = tree
for (let i = 0; i < lines.length; i++) 
{
    let line = lines[i]
    
    if (line[0] == "$")
    {        
        let command = line[2] 
        if (command == "c") // cd 
        {
            let name = line.substring(5, line.length)
            
            if (name == "..") {
                currentDirectory = currentDirectory.parent
            }
            else {
                let dir = findDirectory(name, currentDirectory)

                if (dir == null) {
                    dir = {
                        parent: currentDirectory,
                        name: name,
                        children: [],
                        files: []
                    }
                    currentDirectory.children.push(dir)
                }
                
                currentDirectory = dir
            }
        }
        else if (command == "l") { } // ls
    }
    else // reading directories
    {
        if (line[0] == "d") // dir
        {
            const name = line.substring(4, line.length)
            if (name == "vbzr") {
                const something = "1"
            }
            let dir = findDirectory(name, currentDirectory)
            if (dir == null) {
                dir = {
                    parent: currentDirectory,
                    name,
                    children: [],
                    files: []
                }
                currentDirectory.children.push(dir)
            }
           
        }
        else // files
        {
            const size = parseInt(line.match(/(\d+)/)[0])
            const name = line.substring(size.toString().length + 1, line.length)
            currentDirectory.files.push({ 
                size,
                name
            })
        }
    }
}

let matching = []
findallDirectoriesUnderSize(100000, tree, matching)
console.log(util.inspect(tree, { showHidden: true, depth: null }))
console.log("p1: " + matching.map(a => a.size).reduce((a,b) => a + b))

const diskSpaceAvailable = 70000000
const spaceNeeded = 30000000
const spaceUsed = tree.size
console.log('p2: ' + findSizeOfSmallest(diskSpaceAvailable, spaceNeeded, spaceUsed, tree, tree.size))

function findDirectory(directoryName, search) {
    if (search.name == directoryName) {
        return search
    }

    if (directoryName == "wmct") {
        const something = 'test';
    }

    for (let element of search.children) {
        search = findDirectory(directoryName, element)
        if (search != null && search.name == directoryName) {
            return search
        }
    }

    return null
}

function findallDirectoriesUnderSize(size, searchTree, matchedDirectories) {
    let totalSize = searchTree.files
                                .map(a => a.size)
                                .reduce((a, b) => a + b, 0)

    for (let i = 0; i < searchTree.children.length; i++) {
        const childSize = findallDirectoriesUnderSize(
            size, 
            searchTree.children[i], 
            matchedDirectories
        ) 
    
        totalSize = totalSize + childSize
    }

    searchTree.size = totalSize

    if (totalSize <= size) {
        matchedDirectories.push({
            name: searchTree.name,
            size: totalSize
        })
    }

    return totalSize
}

function findSizeOfSmallest(diskSpaceAvailable, 
                            spaceNeeded,
                            spaceUsed,
                            searchTree, 
                            currentSmallest) {
    if (searchTree.size < currentSmallest
        && diskSpaceAvailable - spaceUsed + searchTree.size >= spaceNeeded) {
        currentSmallest = searchTree.size
    }
    else {
        console.log(searchTree.name + ' ' + searchTree.size)
        console.log(diskSpaceAvailable - spaceUsed + searchTree.size)
        
    }

    for (let i = 0; i < searchTree.children.length; i++) {
        const smallest = findSizeOfSmallest(
            diskSpaceAvailable,
            spaceNeeded,
            spaceUsed,
            searchTree.children[i], 
            currentSmallest
        )
        if (smallest < currentSmallest) {
            currentSmallest = smallest
        }
    }

    return currentSmallest
}
