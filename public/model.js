Notification.requestPermission();
var notify = true
var startgame = true

function message(msg) {
    if(notify){
        var notification = new Notification("Hi there!", {body: msg});

        notify = false
        setTimeout(function() {
            notification.close()
        }, 3000);
    }
}


// More API functions here:
// https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/pose

// the link to your model provided by Teachable Machine export panel
const URL = 'https://teachablemachine.withgoogle.com/models/T98Ko0Pg5/';
let model, webcam, ctx, labelContainer, maxPredictions;

async function init() {
    const modelURL = URL + 'model.json';
    const metadataURL = URL + 'metadata.json';

    // load the model and metadata
    // Refer to tmPose.loadFromFiles() in the API to support files from a file picker
    model = await tmPose.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // Convenience function to setup a webcam
    const flip = true; // whether to flip the webcam
    webcam = new tmPose.Webcam(300, 200, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    webcam.play();
    window.requestAnimationFrame(loop);

    // append/get elements to the DOM
    const canvas = document.getElementById('canvas');
    canvas.width = 300; canvas.height = 200;
    ctx = canvas.getContext('2d');
}

async function loop(timestamp) {
    webcam.update(); // update the webcam frame
    await predict();
    window.requestAnimationFrame(loop);

    // create random question on start
    if(startgame) nextQuestion()
    startgame = false

}

async function predict() {
    // Prediction #1: run input through posenet
    // estimatePose can take in an image, video or canvas html element
    const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
    // Prediction 2: run input through teachable machine classification model
    const prediction = await model.predict(posenetOutput);
    
    if(CAN_PLAY){

    // GAME LOGIC FOR CHOOSING
    const leftHand = prediction.find(item => item.className === 'Left Hand');
    const rightHand = prediction.find(item => item.className === 'Right Hand');
    const headRight = prediction.find(item => item.className === 'Head Right');
    const headLeft = prediction.find(item => item.className === 'Head Left');

        // TODO send answer
        if (leftHand.probability > 0.96) {
            answerQuestion("left")
        } else if (rightHand.probability > 0.96) {
            answerQuestion("right")
        }
        // GAME LOGIC FOR CHOOSING
        
        // finally draw the poses
        
    }
    
    if(GAME_OVER){
        // game over 
        animItem.play()
    }
    
    drawPose();
}

function drawPose() {
    ctx.drawImage(webcam.canvas, 0, 0);
}

// initialise game
init()