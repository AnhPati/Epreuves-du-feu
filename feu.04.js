/*Fonctions*/
const findBiggestSquare = (board) => {
    const boardData = dataRead(board).split('')
    const boardArray = boardData.slice(boardData.indexOf('\n') + 1)
    const instructions = boardData.slice(0, boardData.indexOf('\n'))

    const boardControllers = {
        lineLength: Number(instructions[0]) + 1,
        space: instructions[1],
        obstacle: instructions[2],
        fill: instructions[3]
    }

    const squareSizes = []

    for (let i = 0; i < boardArray.length; i++) {
        if (boardArray[i] === "\n" || boardArray === boardControllers.obstacle) {
            i += 1

        } else {
            squareSizes.push(getSquare(boardArray, i, boardControllers))
            console.log(`\x1b[33mtempResult vaut :\x1b[37m ${squareSizes}`)
        }
    }

    console.log(squareSizes)

    return boardArray
}

const getSquare = (array, index, controllers) => {
    let lineCount = 0
    let tempLine = index + controllers.lineLength
    let tempColumns = []
    let lineInfo = true
    tempColumns.push(getColumns(array, index))
    console.log(`\x1b[33mtempLine vaut :\x1b[37m ${tempLine}`)
    console.log(`\x1b[33mLongueur du tableau :\x1b[37m ${array.length}`)
    while (lineInfo !== false && tempLine < array.length) {
        lineCount += 1
        lineInfo = nextLine(array, tempLine)
        tempColumns.push(getColumns(array, tempLine))
        tempLine = tempLine + controllers.lineLength
        console.log(`\x1b[34mtempLine vaut :\x1b[37m ${tempLine}`)
    }
    console.log(`\x1b[33mCompteur de lignes :\x1b[37m ${lineCount}`)
    console.log(`\x1b[33mtempLine vaut :\x1b[37m ${tempLine}`)
    console.log(`\x1b[33mIndex des lignes :\x1b[37m ${tempLine}`)
    console.log(`\x1b[33mTableaux des colonnes :\x1b[37m ${tempColumns}`)

    if (lineCount > tempColumns.sort((a, b) => a - b)[0]) {
        return tempColumns.sort((a, b) => a - b)[0]
    } else {
        return lineCount
    }
}

const getColumns = (array, column) => {
    let columnCount = column - column
    let columnInfo = true

    while (columnInfo !== false) {
        columnCount += 1
        columnInfo = nextColumn(array, column + columnCount)
    }
    console.log(`\x1b[32mCompteur de colonnes :\x1b[37m ${columnCount}`)
    console.log(`\x1b[32mIndex des colonnes :\x1b[37m ${column}`)

    return columnCount
}

// const getLines = (array, line, lineLengt) => {
//     let lineCount = line - line
//     let tempLine = line + lineLengt
//     let tempColumns = []
//     let lineInfo = true
//     tempColumns.push(getColumns(array, line))
//     console.log(`\x1b[33mtempLine vaut :\x1b[37m ${tempLine}`)
//     console.log(`\x1b[33mLongueur du tableau :\x1b[37m ${array.length}`)
//     while (lineInfo !== false && tempLine < array.length) {
//         lineCount += 1
//         lineInfo = nextLine(array, tempLine)
//         tempColumns.push(getColumns(array, tempLine))
//         tempLine = tempLine + lineLengt
//         console.log(`\x1b[34mtempLine vaut :\x1b[37m ${tempLine}`)
//     }
//     console.log(`\x1b[33mCompteur de lignes :\x1b[37m ${lineCount}`)
//     console.log(`\x1b[33mtempLine vaut :\x1b[37m ${tempLine}`)
//     console.log(`\x1b[33mIndex des lignes :\x1b[37m ${tempLine}`)
//     console.log(`\x1b[33mTableaux des colonnes :\x1b[37m ${tempColumns}`)

//     if (lineCount > tempColumns.sort((a, b) => a - b)[0]) {
//         return tempColumns.sort((a, b) => a - b)[0]
//     } else {
//         return lineCount
//     }

// }

const nextColumn = (array, column) => {
    let nextColumn = false

    if (array[column] === ".") {
        nextColumn = true
    }

    return nextColumn
}

const nextLine = (array, line) => {
    let nextLine = false

    if (array[line] === ".") {
        nextLine = true
    }

    return nextLine
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
const displayBiggestSquare = () => {
    const argument = isValidArguments(getArguments())
    const file = argument[0]

    if (!argument) {
        return
    }

    if (!isValidFile(file) || !dataRead(file)) {
        return
    }

    return console.log(findBiggestSquare(file))
}

/*Affichage du résultat*/
displayBiggestSquare()