// make references to the DOM elements
const $ = document;
const questionElement = $.querySelector(".questions");
const answerRight = $.querySelector(".right");
const answerLeft = $.querySelector(".left");
// animation references
const animButton = $.querySelector(".anim__button")
const svgContainer = $.querySelector('.svg');
// modal details
const modalContainer = $.querySelector('.modal')
const modalTitle = $.querySelector('.modal__title')
const timeDisplay = $.querySelector('.circle')
const timeContainer = $.querySelector('.time__container')
const answer = $.querySelectorAll('.answer')
const gameContainer = $.querySelector('.game__container')

// GAME STATE
var GAME_MODE = localStorage.getItem("gameMode");
var PLAYER_NAME = localStorage.getItem("playerName")
var PLAYER_SCORE = 0;
var QUESTIONS_REMAINING = 4;
var CAN_PLAY = true;
var GAME_OVER = false;
var START_GAME = true;

var CORRECT_ANSWER;

// update the board
const updateBoard = () => {
    document.querySelector("#gamemode").innerHTML = GAME_MODE;
    document.querySelector(".modal__mode").innerHTML = GAME_MODE;
    document.querySelector("#playername").innerHTML = PLAYER_NAME;
    document.querySelector(".modal__player").innerHTML = PLAYER_NAME;
    document.querySelector("#playerscore").innerHTML = PLAYER_SCORE;
    document.querySelector(".modal__score").innerHTML = PLAYER_SCORE;
    document.querySelector("#questionsremaining").innerHTML = QUESTIONS_REMAINING;
}

updateBoard()

// answer question function 
const answerQuestion = answer => {
    // dont answer if you don't have questions remaining
    if(QUESTIONS_REMAINING <= 0) {
        modalContainer.classList.remove('hide')
        // game over 
        GAME_OVER = true
    }
    
    CAN_PLAY = false;
    
    // when the answer is correct
    if(answer === CORRECT_ANSWER){
        // add five points to score
        PLAYER_SCORE += 5;
        answer === "right" ? answerRight.classList.add("success") : answerLeft.classList.add("success");
    } 
    // when the answer is incorrect
    else {
        // punish for incorrect
        PLAYER_SCORE -= 1
        answer === "right" ? answerRight.classList.add("danger") : answerLeft.classList.add("danger");
    }

    QUESTIONS_REMAINING--;
    
    updateBoard()

    if(QUESTIONS_REMAINING <= 0) {
        // game over 
        modalTitle.classList.add('caution')
        modalTitle.innerHTML = `Try Again`
        console.log("I AM INSIDE BOYZEN")
        modalContainer.classList.remove('hide')
        timeDisplay.classList.add('hide')
        timeContainer.classList.add('hide')
        gameContainer.classList.add('hide')
        GAME_OVER = true
    } else {
        // enable user play
        if(QUESTIONS_REMAINING <= 0) return
        setTimeout(() => {
            answerRight.classList.remove("success");
            answerRight.classList.remove("danger");
            answerLeft.classList.remove("success");
            answerLeft.classList.remove("danger");
            nextQuestion();
            CAN_PLAY = true;
        }, 2000);

    }
}


// get the data from the API
const randomQuestion = () => {
    (async () => {
        // get the question data from API
        const URL = "https://theakatsuki.xyz/api/generate";
        
        const results = await axios.get(URL);
        const questionObj = results.data.data;

        // put the question in the html
        questionElement.innerHTML = `${questionObj.question} = ?`;
        const randomNum = Math.floor(Math.random() * 10); // will use this for deciding where to show option
        if(randomNum % 2 === 0){
            // set correct answer
            CORRECT_ANSWER = "right";
            answerRight.innerHTML = `<span class="new__answer">${questionObj.correct}</span>`;
            answerLeft.innerHTML = `<span class="new__answer">${questionObj.incorrect}</span>`;
        } else {
            // set correct answer
            CORRECT_ANSWER = "left";
            answerRight.innerHTML = `<span class="new__answer">${questionObj.incorrect}</span>`;
            answerLeft.innerHTML = `<span class="new__answer">${questionObj.correct}</span>`;
        }
    })()
}

// start the timer and generate new question
function nextQuestion () {
    randomQuestion()
    startTimer()
}
let animPath = ''
if(PLAYER_SCORE < 20){
    animPath = "https://assets10.lottiefiles.com/packages/lf20_9s5vox93.json"
}else {
//animation path
    animPath = 'https://assets6.lottiefiles.com/packages/lf20_wkebwzpz.json'
}
// confetti
const animItem = bodymovin.loadAnimation({
    wrapper: svgContainer,
    animType: 'svg',
    loop: true,
    autoplay: true,
    path: animPath
})


document.querySelector("#startGame").addEventListener("click", () => {
    // create random question on start
    answer[0].classList.remove('hide')
    answer[1].classList.remove('hide')
    gameContainer.classList.remove('hide')
    timeContainer.classList.remove('hide')
    timeDisplay.classList.remove('hide')
    animButton.classList.add('hide')
    if(START_GAME) nextQuestion()
    START_GAME = false
})