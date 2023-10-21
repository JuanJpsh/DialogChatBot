

const login = async (req, res) => {
    const fs = require('fs');
    const path = require('path');
    const pathMock = path.join(__dirname, '../libs/mocksUsers.json')
    const usuariosJSON = fs.readFileSync(pathMock, 'utf-8');
    const usuarios = JSON.parse(usuariosJSON);
    const { username, password } = req.body;

    const usuario = usuarios.find(user => user.username === username && user.password === password);

    if (usuario) {
        usuario.session = "open"
        usuarios.forEach(user => {
            if (user.id != usuario.id) {
                user.session = "close"
            }
        })
        fs.writeFileSync(pathMock, JSON.stringify(usuarios, null, 2), 'utf-8');
        res.status(200).json({ mensaje: "Inicio de sesión exitoso", usuario });
    } else {
        res.status(401).json({ mensaje: "Credenciales incorrectas" });
    }
};

module.exports = {
    login
}