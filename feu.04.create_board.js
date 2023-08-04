/*Fonctions*/
const createBoard = (column, line, density) => {
    const fs = require('fs')

    const board = []
    board.push(`${line}.xo`)
    board.push(`\n`)

    for (let i = 0; i < line; i++) {
        for (let j = 0; j < column; j++) {
            board.push((Math.random(line) * 2 < density) ? 'x' : '.')
        }

        board.push('\n')
    }

    board = board
    fs.writeFileSync('feu.04.board.txt', board.join(''))


    return board.join('')
}


/*Gestion des erreurs*/
const isValidArguments = (arguments) => {
    if (arguments.length === 3) {
        return arguments
    } else {
        return console.log("Une erreur est survenue. Veuillez renseigner un seul argument.")
    }
}
const isValidNumber = (number) => {
    if (!isNaN(number)) {
        return Number(number)
    } else {

    } return console.log("Une erreur est survenue.")
}

/*Parsing*/
const getArguments = () => {
    const arguments = process.argv.slice(2)
    return arguments
}

/*Résolution*/
const displayBoard = () => {
    let numbers = isValidArguments(getArguments())

    if (!numbers) {
        return
    }

    for (number of numbers) {
        if (!isValidNumber(number)) {
            return
        } else {
            number = isValidNumber(number)
        }
    }

    return console.log(createBoard(numbers[0], numbers[1], numbers[2]))
}

/*Affichage du résultat*/
displayBoard()