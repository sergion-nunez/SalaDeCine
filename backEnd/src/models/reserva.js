const mongoose = require("mongoose");

const reservaSchema = new mongoose.Schema({
  nombrePelicula: {
    type: String,
    required: true,
  },
  fecha: {
    type: String,
    required: true,
  },
  hora: {
    type: String,
    required: true,
  },
  asientos: {
    type: [String], // Almacena los asientos seleccionados como un arreglo de strings (ej. ['A1', 'B2'])
    required: true,
  },
});

const Reserva = mongoose.model("Reserva", reservaSchema);

module.exports = Reserva;
