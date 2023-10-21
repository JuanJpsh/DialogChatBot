const openai = require("../../config/chatgpt")
const { readFileSync } = require("fs");
const { join } = require("path");

const getPrompt = async () => {
    const path = `${__dirname}`;
    const text = readFileSync(join(path, "prompt.txt"), "utf-8")
    return text
}

const getDiagnosis = async (req, res) => {
    const { symptomatology } = req.body

    if (process.env.DEPLOY === "false") {
        return res.status(200).json({
            diagnosis: "{Recommendations}\n[\"Rest and avoid sudden movements\", \"Stay hydrated\"]\n\n{Medications}\n[]\n\n{Examinations}\n[\"Blood pressure measurement\", \"Ear examination\"]"
        });
    }

    const prompt = await getPrompt();

    const chatCompletion = await openai.chat.completions.create({
        messages: [
            { role: "system", content: prompt },
            { role: "assistant", content: "OK" },
            { role: "user", content: symptomatology }
        ],
        model: "gpt-3.5-turbo",
    });

    const response = chatCompletion['choices'][0]['message']['content']
    console.log(response)

    res.status(200).json(chatCompletion);
};

module.exports = {
    getDiagnosis
};