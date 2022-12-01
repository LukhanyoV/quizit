// make references to the DOM elements
const $ = document;
const questionElement = $.querySelector(".questions");
const answerRight = $.querySelector(".right");
const answerLeft = $.querySelector(".left");
// animation references
const animButton = $.querySelector(".anim__button")
const svgContainer = $.querySelector('.svg')
// get the data from the API
const randomQuestion = () => {
    (async () => {
        // get the question data from API
        const URL = "http://localhost:5000/api/generate";
        
        const results = await axios.get(URL);
        const questionObj = results.data.data;
                
        // put the question in the html
        questionElement.innerHTML = `${questionObj.question} = ?`;
        const randomNum = Math.floor(Math.random() * 10); // will use this for deciding where to show option
        if(randomNum % 2 === 0){
            answerRight.innerHTML = `<span class="name">${questionObj.correct}</span>`;
            answerLeft.innerHTML = `<span class="name">${questionObj.incorrect}</span>`;
        } else {
            answerRight.innerHTML = `<span class="name">${questionObj.incorrect}</span>`;
            answerLeft.innerHTML = `<span class="name">${questionObj.correct}</span>`;
        }
    })()
}

// create random question on start
randomQuestion()


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
    path: 'https://assets9.lottiefiles.com/packages/lf20_wkebwzpz.json'
})

// trigger
animButton.addEventListener('click', () => {
    console.log("I was clicked!!!")
    animItem.play()
})

animItem.addEventListener('complete', () => {
    console.log("I am hidden!!!")
    svgContainer.classList.add("hide")
})