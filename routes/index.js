const routes = require("express").Router();
const questionService = require("../services")();

routes.get("/generate", (req, res) => {
    const data = questionService.generateQuestion(1, 10, ["+", "-"]);
    res.json({
        data
    })
});

module.exports = routes;