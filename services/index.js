module.exports = (db) => {

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

    // find a user by the username
    const findUser = async username => {
        return await db.oneOrNone("SELECT * FROM players WHERE username = $1", [username])
    }

    // create a new user 
    const createUser = async username => {
        await db.none("INSERT INTO players (username) VALUES ($1)", [username]);
    }

    // create or get the user
    const user = async username => {
        // try and find the user
        const user = await findUser(username);
        if(user) return user; // return the user if found
        // create the user
        await createUser(username);
        return await findUser(username);
    }

    // get the game modes
    const gameModes = async () => {
        return await db.manyOrNone("SELECT * FROM modes");
    }

    // get by mode
    const getMode = async mode => {
        return await db.oneOrNone("SELECT * FROM modes WHERE mode = $1", [mode]);
    }

    // save game state
    // if the user and the mode exists update
    const saveState = async ({playerId, modeId, score}) => {
        // check to see if state exists first
        const check = await db.oneOrNone("SELECT * FROM leaderboard WHERE player_id = $1 AND mode_id = $2", [playerId, modeId])
        if(check) {
            // then update
            await db.none("UPDATE leaderboard SET score = $1 WHERE id = $2", [score, check.id])
        } else {
            await db.none("INSERT INTO leaderboard (player_id, mode_id, score) VALUES ($1, $2, $3)", [playerId, modeId, score])
        }
    }

    // get the leaderboards
    const leaderboard = async () => {
        return await db.manyOrNone("SELECT username, mode, score FROM leaderboard AS l JOIN players AS p ON l.player_id = p.id JOIN modes AS m ON l.mode_id = m.id")
    }

    return {
        generateQuestion,
        user,
        gameModes,
        saveState,
        leaderboard,
        getMode
    }
}