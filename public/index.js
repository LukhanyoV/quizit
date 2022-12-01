const semiCircles = document.querySelectorAll('.semi__circle')
const timer = document.querySelector('.timer')
const time = document.querySelector('.time')

const hr = 0
const min = 0
const sec = 16

const hours = hr * 36000000
const minutes = min * 60000
const seconds = sec * 1000
const setTime = hours + minutes + seconds

let startTime = Date.now()
let futureTime = startTime + setTime


const countDownTimer = () => {
    const currentTime = Date.now()
    const remainingTime = futureTime - currentTime;
    const angle = (remainingTime / setTime) * 360


    if(angle > 180){
        semiCircles[2].style.display = 'none'
        semiCircles[0].style.transform = 'rotate(180deg)'
        semiCircles[1].style.transform = `rotate(${angle}deg)` 
    }else{
        semiCircles[2].style.display = 'block'
        semiCircles[0].style.transform = `rotate(${angle}deg)` 
        semiCircles[1].style.transform = `rotate(${angle}deg)` 
    }

    // timer
    const hrs = Math.floor((remainingTime / (1000 * 60 * 60)) % 24)
    const mins = Math.floor((remainingTime / (1000 * 60 * 60)) % 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false}).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})
    const secs = Math.floor((remainingTime / 1000) % 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})

    timer.innerHTML = `
    <div>${mins}</div>
    <div class='colon'>:</div>
    <div>${secs}</div>
    `;
    time.innerHTML = `
    <div>${mins}</div>
    <div class='colon'>:</div>
    <div>${secs}</div>
    `;
    if(remainingTime <= 6000){
        semiCircles[0].style.backgroundColor = 'red'
        semiCircles[1].style.backgroundColor = 'red'
        timer.style.color = 'red'
    }

    if(remainingTime < 0){
    setInterval(timerLoop)
    semiCircles[0].style.display = 'none'
    semiCircles[1].style.display = 'none'
    semiCircles[2].style.display = 'none'

    timer.innerHTML = `
    <div>00</div>
    <div class='colon'>:</div>
    <div>00</div>
    `;

    time.innerHTML = `
    <div>00</div>
    <div class='colon'>:</div>
    <div>00</div>
    `;
    clearInterval(timerLoop);
    }
    
}

// start the timer function
let timerLoop = setInterval(countDownTimer);
function startTimer() {
    startTime = Date.now()
    futureTime = startTime + setTime
    timerLoop = setInterval(countDownTimer);
}
