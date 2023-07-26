/*Fonctions*/
const buildRectangle = (numbers) => {
    const horizontalLines = arrayWithNumber(numbers[0])
    const verticalLines = arrayWithNumber(numbers[1])
    const sides = builSides(horizontalLines, verticalLines)
    const indexCorners = []

    sides.forEach((side, index) => {
        if (side === 'o') {
            indexCorners.push(index)
        }
    })

    const filling = []

    for (let i = 0; i < numbers[0] - 2; i++) {
        filling.push(" ")
    }

    const topBottom = sides.slice(0, indexCorners[1] + 1).join('')
    const leftRight = sides.slice(indexCorners[1] + 1).join(`${filling.join('')}|\n`) + `${filling.join('')}|`
    const rectangle = topBottom.concat('\n', leftRight.concat('\n', topBottom))

    return rectangle
}

const arrayWithNumber = (number) => {
    let newArray = []

    for (let i = 0; i < number; i++) {
        newArray.push(i)
    }

    return newArray
}

const builSides = (horizontalLines, verticalLines) => {
    let rectangleSides = []

    for (const verticalLine of verticalLines) {
        for (const horizontalLine of horizontalLines) {
            if (verticalLine === 0) {
                if (horizontalLine === 0 || horizontalLine === horizontalLines.length - 1) {
                    rectangleSides.push('o')
                } else {
                    rectangleSides.push('-')
                }
            }
        }

        rectangleSides.push('|')
    }

    return rectangleSides
}

/*Gestion des erreurs*/
const isValidArguments = (arguments) => {
    if (arguments.length === 2) {
        return arguments
    } else {
        return console.log("Une erreur est survenue. Veuillez renseigner deux arguments.")
    }
}

const isValidNumber = (number) => {
    if (!isNaN(number)) {
        return Number(number)
    } else {
        return console.log("Une erreur est survenue.")
    }
}

/*Parsing*/
const getArguments = () => {
    const arguments = process.argv.slice(2)
    return arguments
}

/*Résolution*/
const displayRectangle = () => {
    let numbers = isValidArguments(getArguments())

    if (!numbers) {
        return
    }

    for (let i = 0; i < numbers.length; i++) {
        if (!isValidNumber(numbers[i])) {
            return
        } else {
            numbers[i] = isValidNumber(numbers[i])
        }
    }

    return console.log(buildRectangle(numbers))
}

/*Affichage du résultat*/
displayRectangle()