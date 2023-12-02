console.log("My script is working...")
let click = new Audio("Click.wav")
let victory = new Audio("Won.mp3")
let gameOver = new Audio("GameOver.mp3")
let isgameover = false;
let turn = 'X'

//Function to change the turn
const changeTheTurn = () => {
    return turn === 'X' ? '0':'X'
}

//Function to check win
const checkWin = () =>{
    let boxtext = document.getElementsByClassName('boxtext');
    let wins = [
        [0, 1, 2, 0, 5, 0],
        [3, 4, 5, 0, 15, 0],
        [6, 7, 8, 0, 25, 0],
        [0, 3, 6, -10, 15, 90],
        [1, 4, 7, 0, 15, 90],
        [2, 5, 8, 10, 15, 90],
        [0, 4, 8, -0.5, 14.7, 45],
        [2, 4, 6, 0.1, 15.2, 135]
    ]
    wins.forEach((e)=>{
        if(boxtext[e[0]].innerText === boxtext[e[1]].innerText && boxtext[e[2]].innerText === boxtext[e[1]].innerText && boxtext[e[0]].innerText !==''){
            document.querySelector('.info').innerText = boxtext[e[0]].innerText + " Won";
            victory.play();
            isgameover = true;
            document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width= "190px";
            document.querySelector('.line').style.width = "30vw";
            document.querySelector('.line').style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
        }
    })
}

const drawGame = () =>{
    if(!isgameover){
        let emptyBoxes = Array.from(document.getElementsByClassName('boxtext').filter(box => box.innerText===''));
        if(emptyBoxes.length===0){
            document.querySelector('.info').innerText = "Draw! Try Again.";
            isgameover = true;
        }
    }
}
    


//Game Logic
let boxes = document.getElementsByClassName("box")
Array.from(boxes).forEach((element) => {
    let boxtext = element.querySelector(".boxtext");
    element.addEventListener('click', (e)=>{
        if(boxtext.innerText === ''){
            boxtext.innerHTML=turn;
            //change the turn after each move
            turn = changeTheTurn();
            click.play();
            checkWin();
            if(!isgameover){
              document.getElementsByClassName("info")[0].innerText = "Turn Of " + turn;  
            }
            
        }
    })
})

reset.addEventListener('click',(e)=>{
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element =>{
        element.innerText='';
    });
    turn = 'X';
    isgameover = false;
    document.querySelector('.line').style.width = "0vw";
    document.getElementsByClassName("info")[0].innerText = "Turn Of " + turn; 
    document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "0px";
});