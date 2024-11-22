const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

// Conectar a la base de datos
require("./backEnd/config/database");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "frontEnd/public")));

const indexRouter = require("./backEnd/src/routes/index");
const userRouter = require("./backEnd/src/routes/users");
const moviesRouter = require("./backEnd/src/routes/movies");

app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/movies", moviesRouter);

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log(`Servidor en el puerto ${PORT}`);
});
