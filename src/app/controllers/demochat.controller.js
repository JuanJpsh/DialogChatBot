const openai = require("../../config/chatgpt")

const getMessage = (req, res) => {
    const { message } = req.body;
    console.log("Mensaje: " + message);
    res.status(200).json({ response: "Mensaje correcto" });
};

const demochatgpt = async (req, res) => {
    const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: "user", content: "Say this is a test" }],
        model: "gpt-3.5-turbo",
    });

    res.status(200).json(chatCompletion);
};


module.exports = {
    getMessage,
    demochatgpt
};