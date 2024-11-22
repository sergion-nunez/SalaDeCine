const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const movieReservationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: String, // Mantenemos String por compatibilidad
    required: true,
  },
  seats: {
    type: [String],
    required: true,
    validate: {
      validator: function (seats) {
        return seats && seats.length > 0;
      },
      message: "Debe seleccionar al menos un asiento",
    },
  },
  reservedAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["active", "cancelled", "completed"],
    default: "active",
  },
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "El nombre de usuario es requerido"],
    unique: true,
    trim: true,
    minlength: [3, "El nombre de usuario debe tener al menos 3 caracteres"],
  },
  email: {
    type: String,
    required: [true, "El email es requerido"],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Por favor ingrese un email válido"],
  },
  password: {
    type: String,
    required: [true, "La contraseña es requerida"],
    minlength: [6, "La contraseña debe tener al menos 6 caracteres"],
  },
  movies: [movieReservationSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastLogin: {
    type: Date,
  },
});

// Encriptar la contraseña antes de guardar
userSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    next();
  } catch (error) {
    next(error);
  }
});

// Método para verificar contraseña
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw error;
  }
};

// Método para obtener reservas activas
userSchema.methods.getActiveReservations = function () {
  return this.movies.filter((movie) => movie.status === "active");
};

module.exports = mongoose.model("User", userSchema);
