/*Fonctions*/
const findMazePath = (maze) => {
    const mazeData = dataRead(maze).split('')
    const mazeArray = mazeData.slice(mazeData.indexOf('\n') + 1).filter(char => char !== '\r')
    const mazeMatrix = getMatrix(mazeArray)
    const instructions = mazeData.slice(0, mazeData.indexOf('\r'))
    const mazeControllers = {
        entry: instructions[instructions.length - 2],
        exit: instructions[instructions.length - 1],
        path: instructions[instructions.length - 3],
        space: instructions[instructions.length - 4]
    }
    console.log(`\x1b[31mInstructions : \x1b[37m${instructions}`)
    console.log(instructions)
    console.log(`\x1b[31mPath : \x1b[37m${mazeControllers.path}`)
    console.log(`\x1b[35mMaze array : \x1b[37m`)
    console.log(`${mazeArray.join('')}`)

    const entry = getEntryCoords(mazeMatrix, mazeControllers.entry)
    console.log(`\x1b[34mCoordonnees porte entree : \x1b[37m${entry}`)
    const exits = getExitsCoords(mazeMatrix, mazeControllers.exit)
    console.log(`\x1b[34mCoordonnees portes sortie : \x1b[37m${exits.join(' / ')}`)
    console.log(exits)

    // const theShortestPath = getShortestPath(mazeMatrix, entry, exits, mazeControllers.space, [[], []])
    // console.log(`\x1b[34mLe plus court chemin : \x1b[37m${theShortestPath.join('')}`)
    // console.log(theShortestPath)

    return mazeMatrix
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

const getShortestPath = (matrix, entry, exits, space, actuallyPath) => {
    const paths = actuallyPath
    for (let exit of exits) {
        for (let i = entry[0]; i < matrix.length; i++) {
            for (let j = entry[1]; j < matrix[i].length; j++) {
                console.log(`\x1b[32mOu je suis : \x1b[37m${matrix[i][j]} aux coordonnees ${i} et ${j}`)
                console.log(`\x1b[31mElement a droite : \x1b[37m${matrix[i][j + 1]}`)
                console.log(`\x1b[31mSpace : \x1b[37m${space}`)
                if (matrix[i][j + 1] === space) {
                    console.log(`\x1b[31mOu je suis : \x1b[37m${matrix[i][j + 1]} aux coordonnees ${i} et ${j} et \x1b[31mje suis passe a droite !\x1b[37m`)
                    console.log(`\x1b[32mPath : \x1b[37m${paths}`)
                    paths[exits.indexOf(exit)].push([i, j + 1])
                    getShortestPath(matrix, paths[exits.indexOf(exit)].length - 1, exits, space, paths)
                } else if (matrix[i + 1][j] === space) {
                    console.log(`\x1b[33mOu je suis : \x1b[37m${matrix[i][j]} aux coordonnees ${i + 1} et ${j} et \x1b[33mje suis passe en bas !\x1b[37m`)
                    paths[exits.indexOf(exit)].push([i + 1, j])
                    i = i + 1
                    j = j - 1
                    getShortestPath(matrix, paths[exits.indexOf(exit)].length - 1, exits, space, paths)
                } else if (matrix[i][j - 1] === space) {
                    console.log(`\x1b[34mOu je suis : \x1b[37m${matrix[i][j - 1]} aux coordonnees ${i} et ${j} et \x1b[34mje suis passe a gauche !\x1b[37m`)
                    paths[exits.indexOf(exit)].push([i, j - 1])
                    j = j - 2
                    getShortestPath(matrix, paths[exits.indexOf(exit)].length - 1, exits, space, paths)
                } else if (matrix[i - 1][j] === space) {
                    console.log(`\x1b[35mOu je suis : \x1b[37m${matrix[i - 1][j]} aux coordonnees ${i} et ${j} et \x1b[35mje suis passeen haut !\x1b[37m`)
                    paths[exits.indexOf(exit)].push([i - 1, j])
                    i = i - 1
                    j = j - 1
                    getShortestPath(matrix, paths[exits.indexOf(exit)].length - 1, exits, space, paths)
                } else if ([i, j + 1] === exit || [i + 1, j] === exit || [i, j - 1] === exit || [i - 1, j] === exit) {
                    paths[exits.indexOf(exit)].push(exit)
                    console.log(`\x1b[35mNUL\x1b[37m$`)
                    return paths
                } else {
                    console.log(`\x1b[35mTRES NUL\x1b[37m$`)
                    break
                }
            }
        }
    }

    return paths
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