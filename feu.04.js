/*Fonctions*/
const findBiggestSquare = (board) => {
    const boardData = dataRead(board).split('')
    const boardArray = boardData.slice(boardData.indexOf('\n') + 1)
    const boardMatrix = getMatrix(boardArray)
    const instructions = boardData.slice(0, boardData.indexOf('\n'))

    const boardControllers = {
        lineLength: Number(instructions[0]),
        space: instructions[1],
        obstacle: instructions[2],
        fill: instructions[3]
    }

    const square = {
        index: 0,
        size: 0
    }

    const tempSquare = {
        index: 0,
        size: 0
    }

    for (let i = 0; i < boardMatrix.length; i++) {
        for (let j = 0; j < boardMatrix[i].length; j++) {
            if (j >= boardControllers.lineLength - 1) {
                break
            } else if (boardMatrix[i][j] === boardControllers.space) {
                tempSquare.index = (i * boardControllers.lineLength) + j
                if (i > 0) {
                    tempSquare.index = tempSquare.index + (i)
                }
                tempSquare.size = getBiggestSquare(boardMatrix, i, j, boardControllers.space)

                if (tempSquare.size > square.size) {
                    square.index = tempSquare.index
                    square.size = tempSquare.size
                }
            }
        }

        if (square.size >= boardMatrix.length - i) {
            break
        }
    }

    const boardResult = fillSquare(boardArray, square.index, square.size, boardControllers.fill, boardControllers.lineLength + 1)

    return boardResult
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

const fillSquare = (array, index, size, fill, lineLength) => {
    const arrayFilled = array.slice(0, index)
    const limit = index + ((lineLength * (size - 1)) + (size - 1))
    let lineCount = 0

    for (let i = index; i < array.length; i++) {
        if (array[i] === '\n') {
            arrayFilled.push(array[i])
            lineCount += 1

        } else if (i <= limit && (i >= index + (lineCount * lineLength) && i < index + (lineCount * lineLength) + size)) {
            arrayFilled.push(fill)

        } else {
            arrayFilled.push(array[i])
        }
    }

    return arrayFilled
}

const getBiggestSquare = (matrix, indexLine, indexColumn, space) => {
    let size = 1
    let isSquare = false

    for (let h = 0; h < size && h < matrix.length; h++) {
        for (let i = indexLine; i <= (indexLine + size) && i < matrix.length; i++) {
            for (let j = indexColumn; j <= (indexColumn + size) && j < matrix[i].length; j++) {
                if (matrix[i][j] === space && matrix.slice(indexLine).length > size && matrix[i].slice(indexColumn).length > size) {
                    isSquare = true
                } else {
                    isSquare = false
                    break
                }
            }

            if (!isSquare) {
                break
            }
        }

        if (isSquare) {
            size += 1
        } else {
            break
        }
    }

    return size
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