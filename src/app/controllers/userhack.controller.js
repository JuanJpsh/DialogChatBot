

const getActiveUser = (req, res) => {
    const fs = require('fs');
    const path = require('path');
    const pathMock = path.join(__dirname, '../libs/mocksUsers.json')
    const usuariosJSON = fs.readFileSync(pathMock, 'utf-8');
    const usuarios = JSON.parse(usuariosJSON);
    const usuario = usuarios.find(user => user.session === "open");
    console.log(usuario);
    /* if (usuario) {
        res.status(200).json({ mensaje: "Usuario activo encontrado", usuario });
    } else {
        res.status(401).json({ mensaje: "Usuario activo no encontrado" });
    } */
}

module.exports = {
    getActiveUser
}