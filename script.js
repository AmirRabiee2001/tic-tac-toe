// Game Logic =>
// we have an array of 9 : [1,2,3,4,5,6,7,8,9]
// winning cases are : 
// [0,1,2], [3,4,5], [6,7,8] for rows
// [0,3,6], [1,4,7], [2,5,8] for cols
// [0,4,8], [2,4,6] for diagonal
// if all cells are played and no winning case, it's a tie

// Globals

var gameArray = new Array(9)
for(let i=0; i<9; i++){
    gameArray[i] = undefined
} 
var gameBoard = document.getElementById('game-board')
var currentPlayer = undefined
const cells = document.getElementsByClassName('cell')
// Create player object

const playerFactory = (name, sign) =>{
    return {name,sign}
} 

// Predefine players
const player1 = playerFactory('Player1', 'x')
const player2 = playerFactory('Player2', 'o')


// Game Module

const game = (
    ()=>{
        const selectCell = (cellNum, element) => {
            if(gameArray[cellNum] === undefined){
                gameArray[cellNum] = currentPlayer.sign
                element.classList.add(`cell-${currentPlayer.sign}`)
                game.playRound()
            }
        }
        const playRound = () =>{
            if(game.checkForWin(player1.sign)){
                alert(`${player1.name} wins!`)
            }
            else if(game.checkForWin(player2.sign)){
                alert(`${player2.name} wins!`)
            }
            else if(game.checkForTie()){
                alert("it's a tie")
            }
            else{
            currentPlayer = currentPlayer === player1 ? player2 : player1
            gameBoard.classList.remove(...gameBoard.classList)
            gameBoard.classList.add('game-board',`${currentPlayer.sign}-turn`)
            document.getElementById('turn-display').textContent = `${currentPlayer.name}'s Turn!`
            }
        }
        const startGame = ()=>{
            player1.name = document.getElementById('playerName1').value
            player2.name = document.getElementById('playerName2').value
            if(player1.name === '' || player2.name === ''){
                alert('Please fill the names')
            }
            else{
                currentPlayer = player1
                gameBoard.classList.remove(...gameBoard.classList)
                gameBoard.classList.add('game-board',`${currentPlayer.sign}-turn`)
                document.getElementById('modal').style.display = 'none'
                document.getElementById('turn-display').textContent = `${currentPlayer.name}'s Turn!`
                
            }   
        }
        const checkForWin = (sign) =>{
            // check rows
            for(let i=0;i<3;i++){
                const row = i*3
                if(gameArray[row] === sign && gameArray[row+1] === sign && gameArray[row+2] === sign){
                    game.restart()
                    return true
                }
            }
            // Check cols
            for(let i =0;i<3;i++){
                if(gameArray[i] === sign && gameArray[i+3] === sign && gameArray[i+6] === sign){
                    game.restart()
                    return true
                }
            }
            if((gameArray[0] === sign && gameArray[4] === sign && gameArray[8] === sign) || 
                (gameArray[2] === sign && gameArray[4] === sign && gameArray[6] === sign)
            ){
                    game.restart()
                    return true
            }
        }
        const restart = () =>{
            for(let i=0; i<9; i++){
                gameArray[i] = undefined
                cells[i].classList.remove('cell-x', 'cell-o')
                
            } 
            game.startGame()
        }
        const checkForTie = () =>{
            if (gameArray.every(cell => cell === 'x' || cell === 'o')){
                game.restart()
                return true
            }
        }
        return{selectCell, playRound, startGame, checkForWin, restart, checkForTie}
    }
)()