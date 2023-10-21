const askQuestion = (req, res) => {
    let response = {
        response: "Se supone que las preguntas vienen de la base de datos, pero actualmente no puedo hacerlo."
    }
    res.status(200).json(response);
};

module.exports = {
    askQuestion
};