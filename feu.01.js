/*Fonctions*/
const calculator = (expression) => {
    let expressionArray = cleanNumbers(expression.split(''))
    let priorityExpression = priorityCalc(expressionArray)
    expressionArray.splice(priorityExpression.beginning, priorityExpression.end, priorityExpression.result)

    while (expressionArray.length > 1) {
        priorityExpression = priorityCalc(expressionArray)
        expressionArray.splice(priorityExpression.beginning, priorityExpression.end, priorityExpression.result)
    }

    const result = expressionArray[0]

    return result
}

const priorityCalc = (expressionArray) => {
    let priorityObject = {
        priority: false,
        operation: [],
        beginning: 0,
        end: 0,
        result: 0,
    }

    if (expressionArray.join('').includes('(')) {
        priorityObject.priority = true

        if (expressionArray.slice(expressionArray.indexOf('('), expressionArray.indexOf(')')).length + 1 === 3) {
            priorityObject.beginning = expressionArray.indexOf('(')
            priorityObject.end = 3
            priorityObject.result = cleanParenthesis(expressionArray.slice(expressionArray.indexOf('('), expressionArray.indexOf(')') + 1))

            return priorityObject

        } else {
            priorityObject.beginning = expressionArray.indexOf('(') + 1
            priorityObject.end = 3
            priorityObject.operation = cleanParenthesis(expressionArray.slice(expressionArray.indexOf('('), expressionArray.indexOf(')') + 1))
        }
    }

    if (expressionArray.join('').includes("/") || expressionArray.join('').includes("*") || expressionArray.join('').includes("%")) {
        if (!priorityObject.priority) {
            for (let i = 0; i < expressionArray.length; i++) {
                if (expressionArray[i] === "/" || expressionArray[i] === "*" || expressionArray[i] === "%") {
                    priorityObject.beginning = i - 1
                    priorityObject.end = 3
                    priorityObject.priority = true
                    priorityObject.operation = expressionArray.slice(i - 1, i + 2)
                    break
                }
            }

        } else {
            for (let j = 0; j < priorityObject.operation.length; j++) {
                if (priorityObject.operation[j] === "/" || priorityObject.operation[j] === "*" || priorityObject.operation[j] === "%") {
                    priorityObject.end = 3
                    priorityObject.beginning = priorityObject.beginning + j - 1
                    priorityObject.operation = priorityObject.operation.slice(j - 1, j + 2)
                    break
                }
            }
        }


    } else {
        if (!priorityObject.priority) {
            priorityObject.beginning = priorityObject.beginning
            priorityObject.end = 3
            priorityObject.priority = true
            priorityObject.operation = expressionArray.slice(0, 3)

        } else {
            priorityObject.beginning = priorityObject.beginning
            priorityObject.end = 3
            priorityObject.operation = priorityObject.operation.slice(0, 3)
        }
    }

    priorityObject.result = operatorCalc(priorityObject.operation)

    return priorityObject
}
const operatorCalc = (operation) => {
    let operationArray = operation
    let result

    switch (operationArray[1]) {
        case "*":
            result = operationArray[0] * operationArray[2]
            break
        case "/":
            result = operationArray[0] / operationArray[2]
            break
        case "%":
            result = operationArray[0] % operationArray[2]
            break
        case "+":
            result = operationArray[0] + operationArray[2]
            break
        case "-":
            result = operationArray[0] - operationArray[2]
            break
    }

    return result
}

/*Gestion des erreurs*/
const isValidArguments = (arguments) => {
    if (arguments.length === 1) {
        return arguments
    } else {
        return console.log("Une erreur est survenue. Veuillez renseigner votre expression arithmétique entre guillemets.")
    }
}

/*Parsing*/
const getArguments = () => {
    const arguments = process.argv.slice(2)
    return arguments
}

const cleanBlank = (expressionArray) => {
    let withoutBlank = expressionArray.filter(char => char !== " ")

    return withoutBlank
}

const cleanNumbers = (expressionArray) => {
    const dirtyExpression = cleanBlank(expressionArray)
    let cleanExpression = []
    let tempChar = 0

    for (let i = 0; i < dirtyExpression.length; i++) {
        if ((isNaN(dirtyExpression[i])) || (isNaN(dirtyExpression[i]) && i === dirtyExpression.length - 1)) {
            cleanExpression.push(dirtyExpression[i])

        } else {
            if (isNaN(dirtyExpression[i + 1]) && tempChar === 0) {
                cleanExpression.push(Number(dirtyExpression[i]))

            } else if (isNaN(dirtyExpression[i + 1]) && tempChar > 0) {
                cleanExpression.push(Number(dirtyExpression.slice(i - tempChar, i + 1).join('')))
                tempChar = 0

            } else if (i === dirtyExpression.length - 1 && tempChar > 0) {
                cleanExpression.push()

            } else {
                tempChar += 1
            }
        }

    }

    return cleanExpression
}

const cleanParenthesis = (expressionArray) => {
    let withoutParenthesis = expressionArray.filter(char => char !== "(" && char !== ")")

    return withoutParenthesis
}

/*Résolution*/
const displayCalculator = () => {
    let expression = isValidArguments(getArguments())

    if (!expression) {
        return
    }

    return console.log(calculator(expression[0]))
}

/*Affichage du résultat*/
displayCalculator()