const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

// Ruta para registro de usuario
router.post("/registro", async (req, res) => {
  console.log("Datos recibidos en /registro:", req.body);
  const newUser = new User(req.body);
  try {
    await newUser.save();
    console.log("Usuario registrado con éxito:", newUser);
    res.status(200).json({ message: "Usuario registrado con éxito" });
  } catch (err) {
    console.error("Error al registrar usuario:", err);
    res
      .status(500)
      .json({ error: "Hubo un error al registrar al usuario", details: err });
  }
});

// Ruta para login de usuario
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).send("Usuario o contraseña incorrectos");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send("Usuario o contraseña incorrectos");
    }
    res.send("Inicio de sesión exitoso");
  } catch (err) {
    console.error("Error en /login:", err);
    res.status(500).send("Error en el servidor");
  }
});

module.exports = router;
