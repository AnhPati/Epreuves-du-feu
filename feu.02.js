/*Fonctions*/
const forFind = (board) => {
    const fs = require('fs')
    
    try {
        const data = fs.readFileSync(board)
        console.log(data)
    } catch (err) {
        console.error(err)
    }

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

    return console.log(forFind(board))
}

/*Affichage du résultat*/
displayForFind()