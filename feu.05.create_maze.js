/*Fonctions*/
const createMaze = (height, width, chars, gates) => {
    const fs = require('fs')

    const maze = []
    maze.push(`${height}x${width}${chars}${gates}`)
    maze.push(`\n`)
    const firstEntry =getRandomInt(0, width - 4) + 2
    const secondEntry = getRandomInt(0, width - 4) + 2

    console.log(`\x1b[31mChars 0 : \x1b[37m${chars[0]}`)
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            if (j === 0 && i === firstEntry) {
                maze.push(gates[0])
            } else if ((i === height - 1 && j === secondEntry)||(j === width - 1 && i === secondEntry)) {
                maze.push(gates[1])
            } else if ((i >= 1 && i <= height - 2) && (j >= 1 && j <= width - 2) && getRandomInt(0, 100) > 20) {
                maze.push(chars[1])
            } else {
                maze.push(chars[0])
            }
        }
        maze.push('\n')
    }

    maze.pop()
    fs.writeFileSync('feu.05.maze.txt', maze.join(''))


    return maze.join('')
}

const getRandomInt = (min, max) => {
    const minInt = Math.ceil(min)
    const maxInt = Math.floor(max)

    return Math.floor(Math.random() * (maxInt - minInt + 1)) + minInt
}


/*Gestion des erreurs*/
const isValidArguments = (arguments) => {
    if (arguments.length === 4) {
        return arguments
    } else {
        return console.log("Une erreur est survenue. Veuillez renseigner un seul argument.")
    }
}

const isValidNumber = (number) => {
    if (!isNaN(number)) {
        return Number(number)
    } else {
        return console.log("Une erreur est survenue.")
    }
}

const isValidChar = (char) => {
    if (char.length === 3) {
        return char
    } else {
        return console.log("Veuillez renseigner le caractère pour un obstacle, pour un espace et pour le chemin.")
    }
}

const isValidGates = (gates) => {
    if (gates.length === 2) {
        return gates
    } else {
        console.log("Veuillez renseigner un caractère d'entrée et un de sortie du labyrinthe.")
    }
}

/*Parsing*/
const getArguments = () => {
    const arguments = process.argv.slice(2)
    return arguments
}

/*Résolution*/
const displaymaze = () => {
    const arguments = isValidArguments(getArguments())

    if (!arguments) {
        return
    }
    console.log(arguments)
    let dimensions = arguments.slice(0, 2)
    console.log(dimensions)
    const characters = isValidChar(arguments[2])
    console.log(characters)
    const gates = isValidGates(arguments[3])

    for (dimension of dimensions) {
        if (!isValidNumber(dimension)) {
            return
        } else {
            dimension = isValidNumber(dimension)
        }
    }

    if (!characters || !gates) {
        return
    }

    return console.log(createMaze(dimensions[0], dimensions[1], characters, gates))
}

/*Affichage du résultat*/
displaymaze()