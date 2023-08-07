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
        if (boardArray[i] !== "\n" && boardArray !== boardControllers.obstacle) {
            squareSizes.push(getSquare(boardArray, i, boardControllers))
        }
    }

    console.log()

    return boardArray
}

const buildBiggestSquare = (column, line,) => {

}

const getSquare = (array, index, controllers) => {
    let lineFound = {
        count: 0,
        beginning: index,
        end: index + controllers.lineLength
    }
    let lineInfo = true

    let columnsArray = []
    columnsArray.push(getColumns(array, index))

    console.log(`\x1b[33mtempIndex des lignes :\x1b[37m ${lineFound.end}`)
    console.log(`\x1b[33mLongueur du tableau :\x1b[37m ${array.length}`)
    while (lineInfo !== false && lineFound.end < array.length) {
        lineFound.count += 1
        lineInfo = nextLine(array, lineFound.end)
        columnsArray.push(getColumns(array, lineFound.end))
        lineFound.end = lineFound.end + controllers.lineLength
        console.log(`\x1b[34mIndex des lignes :\x1b[37m ${lineFound.end}`)
    }
    lineFound.end = lineFound.end - controllers.lineLength
    console.log(`\x1b[33mCompteur de lignes :\x1b[37m ${lineFound.count}`)
    console.log(`\x1b[33mIndex des lignes :\x1b[37m ${lineFound.end}`)
    console.log(`\x1b[33mTableau des colonnes :\x1b[37m`)
    console.log(columnsArray)


    let squareFound = []
    let indexColumn = columnsArray[0].beginning

    if (lineFound.count > columnsArray.sort((a, b) => a.count - b.count)[0].count) {
        lineFound.count = columnsArray.sort((a, b) => a.count - b.count)[0].count
        lineFound.end = lineFound.beginning + (controllers.lineLength * lineFound.count)
    } else {
        columnsArray.sort((a, b) => a.count - b.count)[0].count = lineFound.count
    }
    columnsArray.sort((a, b) => a.count - b.count)[0].beginning = indexColumn
    console.log("index : " + columnsArray.sort((a, b) => a.count - b.count)[0].beginning)
    squareFound.push(columnsArray.sort((a, b) => a.count - b.count)[0])
    squareFound.push(lineFound)

    return squareFound
}

const getColumns = (array, index) => {
    let columnFound = {
        count: 0,
        beginning: index,
        end: index
    }
    let columnInfo = true

    while (columnInfo !== false) {
        columnFound.count += 1
        columnInfo = nextColumn(array, index + columnFound.count)
        columnFound.end += 1
    }

    columnFound.end = columnFound.end - 1
    console.log(`\x1b[32mCompteur de colonnes :\x1b[37m ${columnFound.count}`)
    console.log(`\x1b[32mIndex de début des colonnes :\x1b[37m ${columnFound.beginning}`)
    console.log(`\x1b[32mIndex de fin des colonnes :\x1b[37m ${columnFound.end}`)

    return columnFound
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