const Booking = require("../models/Booking");

const getBookings = (req, res) => {
    let response = {
        response: "Devolver agendamientos"
    }
    res.status(200).json(response);
};

const createBooking = (req, res) => {
    try {
        const now = new Date();
        // Generar una fecha aleatoria posterior al día de hoy entre las 8 a.m. y las 4 p.m.
        const year = now.getFullYear();
        const month = now.getMonth();
        const today = now.getDate();
        const day = today + Math.floor(Math.random() * (31 - today)); // Día aleatorio entre today y el final del mes
        const hour = Math.floor(Math.random() * 9) + 8; // Hora aleatoria entre 8 y 16
        const minute = 0
        const second = 0
        const randomDate = new Date(year, month, day, hour, minute, second);
        const nuevoAgendamiento = new Booking({
            date: randomDate,
            user: req.body.user,
        });
        res.status(201).json(nuevoAgendamiento);
    } catch (error) {
        res.status(500).send(error);
    }
}
module.exports = {
    getBookings,
    createBooking
};