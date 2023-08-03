const { findSourceMap } = require('module')

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
    console.log(`\x1b[034mlineJumpCount vaut :\x1b[037m ${lineJumpCount}`)

    for (let i = 0; i < toSearchArray.length; i++) {
        console.log(`\x1b[031mlineJumpCount vaut :\x1b[037m ${lineJumpCount}`)
        console.log(`Compteur de i : \x1b[036m${i}\x1b[037m`)
        console.log(`isFound : \x1b[036m${result.isFound}\x1b[037m`)
        if (!result.isFound) {
            i = 0
        }
        if (toSearchArray[i] === "\n") {
            lineCount += 1
            lineJumpCount += 1
            console.log(`\x1b[036mSaut de ligne de toSearch\x1b[037m`)
            console.log(`SearchIndex vaut : \x1b[036m${searchIndex}\x1b[037m`)
            console.log(`Fin de boucle vaut : \x1b[036m${(lineCount * boardLineLength) + lineCount - 1}\x1b[037m`)
            console.log(`Valeur de début de ligne suivante : \x1b[036m${boardArray[(lineCount * boardLineLength) + lineCount]}\x1b[037m`)
            console.log(`\x1b[036mlineCount vaut :\x1b[037m ${lineCount}`)
            console.log(`\x1b[036mboardLineLength vaut :\x1b[037m ${boardLineLength}`)
            console.log(`Prochain indice de recherche : \x1b[036m${(firstIndex + boardLineLength) + (lineJumpCount * boardLineLength + lineJumpCount)}\x1b[037m`)

            for (let k = 0; k <= boardArray.slice(searchIndex, ((firstIndex + boardLineLength) + (lineJumpCount * boardLineLength + lineJumpCount))).length; k++) {
                console.log(`Valeur de k : \x1b[033m${boardArray.slice(searchIndex, (firstIndex + boardLineLength) + (lineJumpCount * boardLineLength + lineJumpCount) + 1)[k]}\x1b[037m`)
                if (boardArray.slice(searchIndex, ((firstIndex + boardLineLength) + (lineJumpCount * boardLineLength + lineJumpCount) + 1))[k] === "\n") {
                    result.board.push('\n')
                } else {
                    result.board.push('-')
                }
            }

            i += 1
            console.log(`\x1b[034mlineJumpCount vaut :\x1b[037m ${lineJumpCount}`)

            searchIndex = (firstIndex + boardLineLength) + (lineJumpCount * boardLineLength + lineJumpCount) + 1
            console.log(`\x1b[034mfirstIndex vaut :\x1b[037m ${firstIndex}`)
            console.log(`\x1b[034mboardLineLength vaut :\x1b[037m ${boardLineLength}`)
            console.log(`\x1b[034mlineJumpCount vaut :\x1b[037m ${lineJumpCount}`)
        }
        console.log(`SearchIndex vaut : \x1b[036m${searchIndex}\x1b[037m`)
        console.log(`Compteur de i : \x1b[036m${i}\x1b[037m`)

        for (let j = searchIndex; j < boardArray.length; j++) {
            console.log(`Compteur de j : \x1b[035m${j}\x1b[037m et index de recherche \x1b[035m${searchIndex}\x1b[037m`)
            console.log(`isFound : \x1b[036m${result.isFound}\x1b[037m`)
            if (boardArray[j] === "\n") {
                if (i > 0 && i < toSearchLineLength) {
                    result.isFound = false
                    result.board = result.board.map(elem => elem !== '\n' ? elem = '-' : elem = '\n')
                    i = 0
                    console.log(`\x1b[032mSaut de ligne -\x1b[037m i vaut : \x1b[032m${i}\x1b[037m`)
                }

                result.board.push('\n')
                j += 1
                lineCount += 1
                console.log(`\x1b[035mSi saut à la ligne\x1b[037m - Compteur de j : \x1b[035m${j}\x1b[037m et index de recherche \x1b[035m${searchIndex}\x1b[037m`)
                console.log(`\x1b[035mQuelle ligne ?\x1b[037m ${lineCount}`)
            }

            if (toSearchArray[i] === boardArray[j] || toSearchArray[i] === " ") {
                console.log(`\x1b[036mConcordance :\x1b[037m ${toSearchArray[i]} === ${boardArray[j]}`)
                console.log(`Compteur de j : \x1b[035m${j}\x1b[037m et index de recherche \x1b[035m${searchIndex}\x1b[037m`)
                if (!result.isFound) {
                    firstIndex = j
                    firstLine = Math.trunc(firstIndex / boardLineLength)
                    console.log(`\x1b[036mfirstLine vaut :\x1b[037m ${firstLine}`)
                    console.log(`\x1b[036mfirstIndex vaut :\x1b[037m ${firstIndex}`)
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
                console.log(`\x1b[033mIndex de recherche : \x1b[037m ${searchIndex}`)
                break

            } else {

                if (result.isFound) {
                    console.log(`\x1b[031mDiscordance après concordance :\x1b[037m ${toSearchArray[i]} !== ${boardArray[j]}`)
                    if (lineJumpCount > -1) {
                        lineJumpCount = -1
                    }
                    result.isFound = false
                    searchIndex = firstIndex + 1
                    console.log(`\x1b[036mlineCount vaut :\x1b[037m ${lineCount}`)
                    console.log(`\x1b[036mfirstLine vaut :\x1b[037m ${firstLine}`)
                    lineCount = firstLine
                    console.log(`\x1b[036mlineCount vaut :\x1b[037m ${lineCount}`)
                    i = 0
                    result.board = result.board.slice(0, searchIndex).map(elem => elem !== '\n' ? elem = '-' : elem = '\n')
                    console.log(`\x1b[036mBoard résultat :\x1b[037m ${result.board}`)
                    console.log(`\x1b[033mIndex de recherche : \x1b[037m ${searchIndex}`)
                    break
                }
                else {
                    console.log(`\x1b[034mDiscordance :\x1b[037m ${toSearchArray[i]} !== ${boardArray[j]}`)
                    result.board.push('-')
                    console.log(`\x1b[033mIndex de recherche : \x1b[037m ${searchIndex}`)
                }
            }
        }
        if (searchIndex + lineCount >= boardArray.length - 1 && i < (toSearchArray.length - 1) / 2) {
            result.isFound = false
            break
        }
        console.log(`Nombres de lignes : \x1b[033m${lineCount}\x1b[037m`)
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