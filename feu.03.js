/*Fonctions*/
const findSudoku = (sudoku) => {
    const sudokuContent = dataRead(sudoku)
    const sudokuArray = sudokuContent.split('').filter(num => num !== "\r")
    console.log(sudokuArray)

    let lineCount = 0
    console.log(`Sudoku taille : ${sudokuArray.length}`)
    for (let i = 0; i < sudokuArray.length; i++) {
        console.log(`\x1b[33mNuméro :\x1b[37m ${sudokuArray[i]} \x1b[33mIndex :\x1b[37m ${i}`)
        if (sudokuArray[i] === '\n') {
            lineCount += 10
            console.log(`\x1b[35mCompteur de lignes :\x1b[37m ${lineCount}`)

        } else if (sudokuArray[i] === '.') {
            let line = getLine(sudokuArray, lineCount)
            let column = getColumn(sudokuArray, i, lineCount)

            console.log(`\x1b[35mElement supprimé :\x1b[37m ${sudokuArray[i]}`)
            // console.log(`\x1b[36mChiffre manquant : ${getNumberSearched(line, column, sudokuArray[i])}\x1b[37m`)
            sudokuArray.splice(i, 1, getNumberSearched(line, column, sudokuArray[i]))
            console.log(`\x1b[35mElement ajouté :\x1b[37m ${sudokuArray[i]}`)
        }
    }

    return sudokuArray
}

const getColumn = (array, index, line) => {
    const columnArray = []
    // console.log(`\x1b[36mArray :\x1b[37m`)
    // console.log(array)
    // console.log(`\x1b[36mIndex :\x1b[37m ${index}`)
    // console.log(`\x1b[36mLine :\x1b[37m ${line}`)

    columnArray.push(array[index - line])
    for (let i = index + 10 - line; i <= index + 80 - line; i++) {
        // console.log(i)
        columnArray.push(array[i])
        i += 9
    }

    console.log(`\x1b[32mArray colonne :\x1b[37m`)
    console.log(columnArray)
    return columnArray
}

const getLine = (array, line) => {

    console.log(`\x1b[36mArray :\x1b[37m`)
    console.log(array)
    console.log(`\x1b[36mLigne :\x1b[37m ${line}`)
    console.log(`\x1b[36mDébut de ligne :\x1b[37m ${array[line]}`)
    const lineArray = array.slice(line, line + 8)
    console.log(`\x1b[36mLigne à récupérer :\x1b[37m ${lineArray}`)
    return lineArray
}

const getNumberSearched = (line, column, blank) => {
    let lineSearch = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
    console.log(`\x1b[31mline :\x1b[37m`)
    console.log(line)
    console.log(`\x1b[31mcolumn :\x1b[37m`)
    console.log(column)
    console.log(`\x1b[36mBlank :\x1b[37m ${blank}`)
    for (let i = 0; i < lineSearch.length; i++) {
        for (let j = 0; j < line.length; j++) {
            console.log(`\x1b[36mColonne :\x1b[37m ${column[j]}`)
            console.log(`\x1b[36mLigne :\x1b[37m ${line[j]}`)
            console.log(`\x1b[36mComparaison :\x1b[37m ${lineSearch[i]}`)
            console.log(`\x1b[31mRecherche :\x1b[37m`)
            console.log(lineSearch)
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

    const result = lineSearch.filter(char => char !== '.')[0]
    console.log(`\x1b[31mRésultat :\x1b[37m ${result}`)
    if (isNaN(result)) {
        return '.'
    } else {
        return result
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