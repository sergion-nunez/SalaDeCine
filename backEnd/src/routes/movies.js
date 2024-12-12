const express = require("express");
const router = express.Router();
const Reserva = require("../models/reserva"); // Asegúrate de tener el modelo adecuado

// Ruta para crear una nueva reserva
router.post("/reservar", async (req, res) => {
  try {
    const { nombrePelicula, fecha, hora, asientos } = req.body;

    // Verifica que la información esté disponible
    if (!nombrePelicula || !fecha || !hora || !asientos) {
      return res
        .status(400)
        .json({ success: false, message: "Datos incompletos" });
    }

    // Crea una nueva reserva
    const nuevaReserva = new Reserva({
      nombrePelicula,
      fecha,
      hora,
      asientos,
    });

    // Guarda la reserva en la base de datos
    await nuevaReserva.save();

    // Respuesta al frontend
    res
      .status(201)
      .json({ success: true, message: "Reserva realizada con éxito." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error al realizar la reserva." });
  }
});

// Ruta para obtener todas las reservas (para el administrador)
router.get("/reservas", async (req, res) => {
  try {
    const reservas = await Reserva.find(); // Obtiene todas las reservas de la base de datos
    res.status(200).json({ success: true, data: reservas });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error al obtener reservas." });
  }
});

module.exports = router;
