const express = require("express");
const UserRoutes = express.Router();

const { registerLargo } = require("../controllers/user.controllers");

//!------------------------------------------------------------------------
//?--------------------------------RUTAS SIN REDIRECT----------------------
//!------------------------------------------------------------------------

UserRoutes.post(
  "/registerLargo",
  /*middleware de subida de fichero */ registerLargo
);

module.exports = UserRoutes;
