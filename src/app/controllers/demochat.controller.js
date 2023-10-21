const getMessage = (req, res) => {
    const { message } = req.body;
    console.log("Mensaje: " + message);
    res.status(200).json({response: "Mensaje correcto"});
};

module.exports = {
    getMessage
};