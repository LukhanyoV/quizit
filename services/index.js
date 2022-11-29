module.exports = () => {

    // generate a random whole number between min and max
    const randrange = (min, max) => {
        return Math.floor(Math.random() * (max-min) + min);
    }

    // generate a random question
    const generateQuestion = (min, max, ops) => {
        // intialize num 1 and num 2 as a random number
        let num1 = randrange(min, max);
        let num2 = randrange(min, max);
        // make sure that the numbers are not the same
        while(num1 === num2) num2 = randrange(min, max);
        // choose random operator
        let op = ops[Math.floor(Math.random() * ops.length)];
        // find the correct answer
        // let correct = eval(num1, op, num2); // i don't use evil
        let correct;
        switch(op){
            case "+":
                correct = num1 + num2;
                break;
            case "-":
                correct = num1 - num2;
                break;
            case "*":
                correct = num1 * num2;
                break;
            case "/":
                correct = num1 / num2;
                break;
        }
        // find the incorrect answer
        // an correct answer will just be the correct answer minus 1
        let incorrect = correct - 1;
        // return the question and options
        return {
            question: `${num1} ${op} ${num2}`,
            correct,
            incorrect
        }
    }

    return {
        generateQuestion
    }
}