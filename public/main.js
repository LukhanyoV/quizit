// make references to the DOM elements
const $ = document;
const questionElement = $.querySelector(".questions");
const answerRight = $.querySelector(".right");
const answerLeft = $.querySelector(".left");


// get the data from the API
const randomQuestion = async () => {
    // get the question data from API
    const URL = "http://localhost:5000/api/generate";

    const results = await axios.get(URL);
    const questionObj = results.data.data;
    console.log("ho ho ho", results.data);

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
}

// create random question on start
randomQuestion()