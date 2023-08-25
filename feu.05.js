/*Fonctions*/
const findMazePath = (maze) => {
    const mazeData = dataRead(maze).split('')
    const mazeArray = mazeData.slice(mazeData.indexOf('\n') + 1).filter(char => char !== '\r')
    const mazeMatrix = getMatrix(mazeArray)
    const instructions = mazeData.slice(0, mazeData.indexOf('\n'))
    const mazeControllers = {
        entry: instructions[instructions.length - 2],
        exit: instructions[instructions.length - 1],
        path: instructions[instructions.length - 3],
        space: instructions[instructions.length - 4]
    }
    console.log(`\x1b[33mInstructions : \x1b[37m`)
    console.log(instructions)
    console.log(`\x1b[32mControls : \x1b[37m`)
    console.log(mazeControllers)

    const entry = getEntryCoords(mazeMatrix, mazeControllers.entry)
    console.log(`\x1b[34mCoordonnees porte entree : \x1b[37m${entry}`)
    const exits = getExitsCoords(mazeMatrix, mazeControllers.exit)
    console.log(`\x1b[35mCoordonnees portes sortie : \x1b[37m${exits[0]} et ${exits[1]}`)

    const theShortestPath = getShortestPath(mazeMatrix, entry, exits, mazeControllers)

    return theShortestPath
}

const getMatrix = (array) => {
    let index = 0
    const matrix = []
    for (let i = 0; i < array.length; i++) {
        if (array[i] === '\n') {
            matrix.push(array.slice(index, i))
            index = i + 1
        }
    }

    matrix.push(array.slice(index))

    return matrix
}

const getEntryCoords = (matrix, entry) => {
    const coords = [0, 0]
    console.log(`\x1b[31mEntree : \x1b[37m${entry}`)
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] === entry) {
                coords[0] = i
                coords[1] = j
                break
            }
        }
    }

    return coords
}

const getExitsCoords = (matrix, exit) => {
    const coords = []
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] === exit) {
                coords.push([i, j])
            }
        }
    }

    return coords
}

const getShortestPath = (maze, entry, exits, controls) => {
    const mazeWithPath = maze
    const steps = [[-1, 0], [0, 1], [1, 0], [0, -1]]
    const shortestPath = {
        minLength: [Infinity],
        visited: maze.map(a => a.map(b => b = false)),
        nextPos: [],
        lastPos: maze.map(a => a.map(b => b = '?')),
        goodExit: null
    }

    shortestPath.visited[entry[0]][entry[1]] = true
    shortestPath.nextPos.push([entry, 0])

    while (shortestPath.nextPos.length > 0) {
        let [[coord_x, coord_y], mazeLength] = shortestPath.nextPos.shift()
        console.log(`\x1b[31mCoordonnées : \x1b[37m${coord_x} et ${coord_y}`)
        if ((coord_x === exits[0][0] && coord_y === exits[0][1]) || (coord_x === exits[1][0] && coord_y === exits[1][1])) {
            shortestPath.minLength = mazeLength
            shortestPath.goodExit = [coord_x, coord_y]

            break

        } else {
            for ([step_x, step_y] of steps) {
                let neighbor_x = coord_x + step_x
                let neighbor_y = coord_y + step_y

                if ((maze.length > neighbor_x && neighbor_x >= 0) && (maze.length > neighbor_y && neighbor_y >= 0)) {
                    if (maze[neighbor_x][neighbor_y] === controls.space || maze[neighbor_x][neighbor_y] === controls.exit) {
                        if (!shortestPath.visited[neighbor_x][neighbor_y]) {
                            shortestPath.visited[neighbor_x][neighbor_y] = true
                            shortestPath.nextPos.push([[neighbor_x, neighbor_y], mazeLength + 1])
                            shortestPath.lastPos[neighbor_x][neighbor_y] = [coord_x, coord_y]
                        }
                    }
                }
            }
        }
    }



    if (shortestPath.length !== Infinity && shortestPath.goodExit !== null) {
        while ((shortestPath.goodExit[0] !== entry[0]) || (shortestPath.goodExit[1] !== entry[1])) {
            let tempLastPos = shortestPath.lastPos[shortestPath.goodExit[0]][shortestPath.goodExit[1]]
            mazeWithPath[shortestPath.goodExit[0]][shortestPath.goodExit[1]] = controls.path
            shortestPath.goodExit = tempLastPos
        }

        for (let line of mazeWithPath) {
            line.push('\n')
        }

        return mazeWithPath.flat().join('')

    } else {
        return `Ce labyrinthe n'a pas de sortie accessible.`
    }
}

const dataRead = (file) => {
    const fs = require('fs')
    let data
    let error

    try {
        data = fs.readFileSync(file, { encoding: 'utf8' })
    } catch (err) {
        error = err
    }

    if (error !== undefined) {
        console.log("Une erreur est survenue. Le fichier renseigné n'existe pas dans ce répertoire.")

        return
    } else {
        return data
    }
}

/*Gestion des erreurs*/
const isValidArguments = (arguments) => {
    if (arguments.length === 1) {
        return arguments
    } else {
        return console.log("Une erreur est survenue. Veuillez renseigner un seul argument.")
    }
}

const isValidFile = (file) => {
    if (file.slice(-4) === ".txt") {
        return file
    } else {
        return console.log("Une erreur est survenue. Ne sont pris en charge qu'uniquement les fichiers dont l'extension est '.txt'.")
    }
}

/*Parsing*/
const getArguments = () => {
    const arguments = process.argv.slice(2)
    return arguments
}

/*Résolution*/
const displayMazePath = () => {
    const argument = isValidArguments(getArguments())
    const file = argument[0]

    if (!argument) {
        return
    }

    if (!isValidFile(file) || !dataRead(file)) {
        return
    }

    return console.log(findMazePath(file))
}

/*Affichage du résultat*/
displayMazePath()