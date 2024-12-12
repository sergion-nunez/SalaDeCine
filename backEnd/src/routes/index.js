const express = require("express");
const path = require("path");
const router = express.Router();

router.get("/", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../../../frontEnd/public/views/index.html")
  ); // Ruta correcta al archivo HTML
});

router.get("/salas", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../../../frontEnd/public/views/salas.html")
  );
});

router.get("/movieKim", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../../../frontEnd/public/views/movieKim.html")
  );
});

router.get("/movieVen", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../../../frontEnd/public/views/movieVen.html")
  );
});

router.get("/nosotros", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../../../frontEnd/public/views/nosotros.html")
  );
});

router.get("/contacto", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../../../frontEnd/public/views/contacto.html")
  );
});

router.get("/registro", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../../../frontEnd/public/views/registro.html")
  );
});

router.get("/login", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../../../frontEnd/public/views/login.html")
  );
});

// Ruta para servir la página de administración
router.get("/admin", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../../../frontend/public/views/admin.html")
  );
});

module.exports = router;
