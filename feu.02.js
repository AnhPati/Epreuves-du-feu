/*Fonctions*/
const forFind = (board, toSearch) => {
    const boardData = dataRead(board)
    console.log(`\x1b[031mFichier :\x1b[037m ${board}`)
    console.log(`\x1b[035mDonnées :\x1b[037m`)
    console.log(`${boardData}`)

    const toSearchData = dataRead(toSearch)
    console.log(`\x1b[031mFichier :\x1b[037m ${toSearch}`)
    console.log(`\x1b[035mDonnées :\x1b[037m`)
    console.log(`${toSearchData}`)

    let boardArray = boardData.split("").filter(char => char !== "\r")
    let toSearchArray = toSearchData.split("").filter(char => char !== "\r")
    console.log(boardArray)
    console.log(toSearchArray)
    let lineCount = 0

    for (let i = 0; i < toSearchArray.length; i++) {
        // for (j = 0; j = boardArray.length; i++) {
        //     if (toSearch[j] = boardData[i]) {
        //         if (boardArray[j] === "\n") {
        //             lineCount += 1
        //             console.log(`Compteur de lignes : \x1b[036m${lineCount}\x1b[037m`)
        //         }

        //     }
        // }

        console.log(`Compteur de i : \x1b[036m${i}\x1b[037m`)
    }


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