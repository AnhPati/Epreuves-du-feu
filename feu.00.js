/*Fonctions*/
const buildRectangle = (numbers) => {
    const horizontalLines = numbers[0]
    const verticalLines = numbers[1] > 2 ? numbers[1] - 2 : 0
    const sides = builSides(horizontalLines, verticalLines)

    const filling = []

    for (let i = 0; i < numbers[0] - 2; i++) {
        filling.push(" ")
    }

    let topBottom = sides.horizontalSide.join('')
    let leftRight = sides.verticalSide.length > 0 ? sides.verticalSide.join(`${filling.join('')}|\n`) + `${filling.join('')}|` : null
    let rectangle = []

    if (leftRight !== null && numbers[0] === 1) {
        leftRight = leftRight.slice(0, leftRight.length - 1)
        rectangle = topBottom.concat('\n', leftRight.concat('\n', topBottom))

    } else if (leftRight === null && numbers[1] - 2 === 0) {
        rectangle = topBottom.concat('\n', topBottom)

    } else if (leftRight !== null) {
        rectangle = topBottom.concat('\n', leftRight.concat('\n', topBottom))

    } else {
        rectangle = topBottom
    }

    return rectangle
}

const builSides = (horizontalLines, verticalLines) => {
    let rectangleSides = {
        horizontalSide: [],
        verticalSide: []
    }

    for (let i = 1; i <= horizontalLines; i++) {
        if (i === 1 || i === horizontalLines) {
            rectangleSides.horizontalSide.push('o')
        } else {
            rectangleSides.horizontalSide.push('-')
        }
    }

    if (verticalLines > 0) {
        for (let j = 1; j <= verticalLines; j++) {
            rectangleSides.verticalSide.push('|')
        }
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