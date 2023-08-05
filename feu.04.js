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

    const square = {

    }

    for (let i = 0; i < boardArray.length; i++) {
        if (boardArray[i] === "\n") {
            i += 1
        }
    }

    console.log(boardControllers.lineLength)
    console.log(boardControllers.space)
    console.log(boardControllers.obstacle)
    console.log(boardControllers.fill)
    return boardArray
}

const getSquare = (boardArray, index, controllers) => {
    let result = false

    if (boardArray[index + 1] === ".") {
        result = true

        if (boardArray[index + controllers.lineLength] === ".") {
            result = true

            if (boardArray[index + controllers.lineLength + 1] === ".") {
                result = true

            } else {
                return result
            }

        } else {
            return result
        }

    } else {
        return result = false
    }

    return result
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