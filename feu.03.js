/*Fonctions*/
const findSudoku = (sudoku) => {
    const sudokuContent = dataRead(sudoku)
    const sudokuArray = sudokuContent.split('').filter(num => num !== "\r")

    let lineCount = 0
    for (let i = 0; i < sudokuArray.length; i++) {
        if (sudokuArray[i] === '\n') {
            lineCount += 10

        } else if (sudokuArray[i] === '.') {
            let line = getLine(sudokuArray, lineCount)
            let column = getColumn(sudokuArray, i, lineCount)
            sudokuArray.splice(i, 1, getNumberSearched(line, column, sudokuArray[i]))
        }
    }

    return sudokuArray.join('')
}

const getColumn = (array, index, line) => {
    const columnArray = []
    columnArray.push(array[index - line])

    for (let i = index + 10 - line; i <= index + 80 - line; i++) {
        columnArray.push(array[i])
        i += 9
    }

    return columnArray
}

const getLine = (array, line) => {
    const lineArray = array.slice(line, line + 8)

    return lineArray
}

const getNumberSearched = (line, column, blank) => {
    let lineSearch = ['1', '2', '3', '4', '5', '6', '7', '8', '9']

    for (let i = 0; i < lineSearch.length; i++) {
        for (let j = 0; j < line.length; j++) {
            if (lineSearch[i] === line[j]) {
                lineSearch.splice(i, 1)
                i -= 1

                break

            } else if (lineSearch[i] === column[j]) {
                lineSearch.splice(i, 1)
                i -= 1

                break
            }
        }
    }

    return lineSearch.filter(char => char !== '.')[0]
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
const displayFindSudoku = () => {
    const argument = isValidArguments(getArguments())
    const file = argument[0]

    if (!argument) {
        return
    }

    if (!isValidFile(file) || !dataRead(file)) {
        return
    }

    return console.log(findSudoku(file))
}

/*Affichage du résultat*/
displayFindSudoku()