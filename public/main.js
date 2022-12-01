// GAME STATE
var GAME_MODE = localStorage.getItem("playerName");
var PLAYER_NAME = 'Yonela'
var PLAYER_SCORE = 0;
var QUESTIONS_REMAINING = 5;
var CAN_PLAY = true;
var GAME_OVER = false;

var CORRECT_ANSWER;

// update the board
const updateBoard = () => {
    document.querySelector("#mode").innerHTML = GAME_MODE;
    document.querySelector("#playername").innerHTML = PLAYER_NAME;
    document.querySelector("#playerscore").innerHTML = PLAYER_SCORE;
    document.querySelector("#questionsremaining").innerHTML = QUESTIONS_REMAINING;
}
updateBoard()

// answer question function 
const answerQuestion = answer => {
    console.log("CORRECT", CORRECT_ANSWER);
    console.log("ANSWER", answer);

    // dont answer if you don't have questions remaining
    if(QUESTIONS_REMAINING <= 0) {

        // game over 
        GAME_OVER = true
    }
    
    CAN_PLAY = false;
    
    if(answer === CORRECT_ANSWER){
        // add five points to score
        PLAYER_SCORE += 5;
        answerRight.classList.add("success")
    } else {
        answerRight.classList.add("danger")
    }

    QUESTIONS_REMAINING--;
    updateBoard()

    if(QUESTIONS_REMAINING <= 0) {
        // game over 
        modalContainer.classList.remove('hide')
        GAME_OVER = true
    } else {

        // enable user play
        if(QUESTIONS_REMAINING <= 0) return
        setTimeout(() => {
            answerRight.classList.remove("success");
            answerRight.classList.remove("danger");

            nextQuestion();
            CAN_PLAY = true;
        }, 2000);

    }
}

// make references to the DOM elements
const $ = document;
const questionElement = $.querySelector(".questions");
const answerRight = $.querySelector(".right");
const answerLeft = $.querySelector(".left");
// animation references
const animButton = $.querySelector(".anim__button")
const svgContainer = $.querySelector('.svg');
const modalContainer = $.querySelector('.modal')

// get the data from the API
const randomQuestion = () => {
    (async () => {
        // get the question data from API
        const URL = "http://theakatsuki.xyz/api/generate";
        
        const results = await axios.get(URL);
        const questionObj = results.data.data;

        
        // put the question in the html
        questionElement.innerHTML = `${questionObj.question} = ?`;
        const randomNum = Math.floor(Math.random() * 10); // will use this for deciding where to show option
        if(randomNum % 2 === 0){
            // set correct answer
            CORRECT_ANSWER = "right";
            answerRight.innerHTML = `<span class="name">${questionObj.correct}</span>`;
            answerLeft.innerHTML = `<span class="name">${questionObj.incorrect}</span>`;
        } else {
            // set correct answer
            CORRECT_ANSWER = "left";
            answerRight.innerHTML = `<span class="name">${questionObj.incorrect}</span>`;
            answerLeft.innerHTML = `<span class="name">${questionObj.correct}</span>`;
        }
    })()
}

// start the timer and generate new question
function nextQuestion () {
    randomQuestion()
    startTimer()
}


// confetti
const animItem = bodymovin.loadAnimation({
    wrapper: svgContainer,
    animType: 'svg',
    loop: true,
    autoplay: true,
    path: 'https://assets6.lottiefiles.com/packages/lf20_wkebwzpz.json'
})

// trigger
animButton.addEventListener('click', () => {
    console.log("I was clicked!!!")
    console.log(svgContainer)
    animItem.play()
})

// animItem.addEventListener('complete', () => {
//     console.log("I am hidden!!!")
//     svgContainer.classList.add("hide")
// })