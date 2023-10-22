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
    console.log("Input: " + symptomatology)
    if (process.env.DEPLOY === "false") {
        const diagnosis = "{Recommendations}\n[\"Rest and avoid sudden movements\", \"Stay hydrated\"]\n\n{Medications}\n[]\n\n{Examinations}\n[\"Blood pressure measurement\", \"Ear examination\"]"
        return res.status(200).json({
            "diagnosis": formatearRespuestaChatGPT(diagnosis)
        });
    }

    const prompt = await getPrompt();
    const url = "https://api.openai.com/v1/chat/completions"
    const config = {
        headers: {
            'Authorization': "Bearer " + process.env.OPENAI_API_KEY,
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
    //console.log("Origen: " + response)
    //const finalResponse = {"diagnosis": formatearRespuestaChatGPT(response)}
    //console.log("Final: " + finalResponse["diagnosis"])
    res.status(200).json({diagnosis:response});
};

function formatearRespuestaChatGPT(input) {
    const lines = input.split('\n');
    const result = {};
  
    let currentSection = '';
  
    for (const line of lines) {
      if (line.startsWith('{')) {
        // Comienza una nueva sección
        currentSection = line.slice(1, -1);
        result[currentSection] = [];
      } else if (line.startsWith('[')) {
        // Agrega elementos a la sección actual
        const elementos = JSON.parse(line);
        result[currentSection] = elementos;
      }
    }
  
    // Genera la estructura de salida excluyendo las secciones sin elementos
    const output = Object.keys(result)
      .filter((seccion) => result[seccion].length > 0)
      .map((seccion) => {
        const elementos = result[seccion];
        const elementosNumerados = elementos.map((elemento, index) => `${index + 1}. ${elemento}`);
        return `${seccion}\n${elementosNumerados.join('\n')}`;
      });

    const salida = output.join('\n\n');
    const fraseCabecera = "Taking into account your symptoms, I give you the following diagnosis";
    const resultadoFinal = `${fraseCabecera}\n\n${salida}`;
    return resultadoFinal;
  }

module.exports = {
    getDiagnosis
};