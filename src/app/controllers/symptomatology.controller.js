const fs = require("fs");
const { join } = require("path");
const axios = require('axios');

const getPrompt = async () => {
    const path = `${__dirname}`;
    const text = fs.readFileSync(join(path, "prompt.txt"), "utf-8")
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
    const url = "https://api.openai.com/v1/chat/completions"
    const config = {
        headers: {
            'Authorization': "Bearer "+process.env.OPENAI_API_KEY,
            'Content-Type': 'application/json'
        }
    };
    const postData = {
        model: 'gpt-3.5-turbo',
        messages: [
            { role: "system", content: prompt },
            { role: "assistant", content: "OK" },
            { role: "user", content: symptomatology }
        ]
    };

    const chatCompletion = await axios.post(url, postData, config);

    const response = chatCompletion['data']['choices'][0]['message']['content']
    res.status(200).json({message: response});
};

module.exports = {
    getDiagnosis
};