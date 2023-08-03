/*Fonctions*/
const forFind = (board, toSearch) => {
    const boardArray = dataRead(board).split("").filter(char => char !== "\r")
    const toSearchArray = dataRead(toSearch).split("").filter(char => char !== "\r")
    const boardLineLength = boardArray.indexOf('\n')
    const toSearchLineLength = toSearchArray.indexOf('\n')

    let firstLine = 0
    let lineCount = 0
    let firstIndex = 0
    let searchIndex = 0
    let lineJumpCount = -1
    let result = {
        board: [],
        coords: [0, 0],
        isFound: false
    }

    for (let i = 0; i < toSearchArray.length; i++) {
        if (!result.isFound) {
            i = 0
        }
        if (toSearchArray[i] === "\n") {
            lineCount += 1
            lineJumpCount += 1

            for (let k = 0; k <= boardArray.slice(searchIndex, ((firstIndex + boardLineLength) + (lineJumpCount * boardLineLength + lineJumpCount))).length; k++) {
                if (boardArray.slice(searchIndex, ((firstIndex + boardLineLength) + (lineJumpCount * boardLineLength + lineJumpCount) + 1))[k] === "\n") {
                    result.board.push('\n')
                } else {
                    result.board.push('-')
                }
            }

            searchIndex = (firstIndex + boardLineLength) + (lineJumpCount * boardLineLength + lineJumpCount) + 1
        }

        for (let j = searchIndex; j < boardArray.length; j++) {
            if (boardArray[j] === "\n") {
                if (i > 0 && i < toSearchLineLength) {
                    result.isFound = false
                    result.board = result.board.map(elem => elem !== '\n' ? elem = '-' : elem = '\n')
                    i = 0
                }

                result.board.push('\n')
                j += 1
                lineCount += 1
            }

            if (toSearchArray[i] === boardArray[j] || toSearchArray[i] === " ") {
                if (!result.isFound) {
                    firstIndex = j
                    firstLine = Math.trunc(firstIndex / boardLineLength)
                    result.isFound = true
                    result.coords[0] = (j - firstLine * boardLineLength) - firstLine
                    result.coords[1] = firstLine
                }

                if (toSearchArray[i] === " ") {
                    result.board.push('-')
                } else {
                    result.board.push(toSearchArray[i])
                }

                searchIndex = j + 1
                break

            } else {

                if (result.isFound) {
                    if (lineJumpCount > -1) {
                        lineJumpCount = -1
                    }
                    result.isFound = false
                    searchIndex = firstIndex + 1
                    lineCount = firstLine
                    i = 0
                    result.board = result.board.slice(0, searchIndex).map(elem => elem !== '\n' ? elem = '-' : elem = '\n')
                    break
                }
                else {
                    result.board.push('-')
                }
            }
        }
        if (searchIndex + lineCount >= boardArray.length - 1 && i < (toSearchArray.length - 1) / 2) {
            result.isFound = false
            break
        }
    }

    if (searchIndex < boardArray.length - 1) {
        for (let l = searchIndex; l < boardArray.length; l++) {
            if (boardArray[l] === '\n') {
                result.board.push('\n')
            } else {
                result.board.push('-')
            }

        }
    }

    return result.isFound ? `Trouvé !
Coordonnées : ${result.coords.join(',')}
${result.board.join('')}` : "Introuvable"
}

const dataRead = (file) => {
    const fs = require('fs')
    let data

    try {
        data = fs.readFileSync(file, { encoding: 'utf8' })
    } catch (err) {
        console.error(err)
    }

    return data
}

/*Gestion des erreurs*/
const isValidArguments = (arguments) => {
    if (arguments.length >= 1) {
        return arguments
    } else {
        return console.log("Une erreur est survenue. Veuillez renseigner deux arguments.")
    }
}

/*Parsing*/
const getArguments = () => {
    const arguments = process.argv.slice(2)
    return arguments
}

/*Résolution*/
const displayForFind = () => {
    const arguments = isValidArguments(getArguments())
    let board = arguments[0]
    let toSearch = arguments[1]

    if (!arguments) {
        return
    }

    return console.log(forFind(board, toSearch))
}

/*Affichage du résultat*/
displayForFind()