const routes = require("express").Router();

// create a connection to the database
const pgp = require("pg-promise")({});
const DATABASE_URL = process.env.DATABASE_URL || "postgresql://postgres:nimda@localhost:5432/quizit";
const config = {
    connectionString: DATABASE_URL
}
if(process.env.NODE_ENV === "productions") {
    config.ssl = {
        rejectUnauthorized: false
    }
}
const db = pgp(config);

// create instance of factory function
const questionService = require("../services")(db);

// create a route to randomly generate a question
routes.get("/generate", (req, res) => {
    const data = questionService.generateQuestion(1, 10, ["+", "-"]);
    res.json({
        data
    })
});

// post a mode
routes.post("/generate", async (req, res) => {
    const {mode} = req.body;
    if(mode){
        const modeData = await questionService.getMode(mode);
        let ops;
        if(mode === "easy") ops = ["+", "-"];
        if(mode === "medium") ops = ["+", "-"];
        if(mode === "hard") ops = ["+", "-", "*"];
        const data = questionService.generateQuestion(modeData.start_num, modeData.end_num, ops);
        res.json({
            data
        })
    }
})

// get all game modes
routes.get("/modes", async (req, res) => {
    const modes = await questionService.gameModes();
    res.json({
        modes
    })
});

// create a new user or get already existing user
routes.post("/user", async (req, res) => {
    let {username} = req.body;
    const user = await questionService.user(username);
    res.json({
        user
    })
});

// create a route to save user game play to the leaderboard
routes.post("/save", async (req, res) => {
    const userSave = req.body;
    await questionService.saveState(userSave);
    res.json({
        msg: "State saved to leaderboard"
    })
});

// get the leaderboard
routes.get("/leaderboard", async (req, res) => {
    const leaderboard = await questionService.leaderboard()
    res.json({
        leaderboard
    })
})

module.exports = routes;