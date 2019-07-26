const Router = require("express");
const pokemonController = require("../controllers/pokemonController");
const validateToken = require("../utils/validateToken");

const pokemonRouter = new Router();

pokemonRouter.route("/").post(validateToken, pokemonController.savePokemon);

module.exports = pokemonRouter;
