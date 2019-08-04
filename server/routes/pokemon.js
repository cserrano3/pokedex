const Router = require("express");
const pokemonController = require("../controllers/pokemonController");
const validateToken = require("../utils/validateToken");

const pokemonRouter = new Router();

pokemonRouter.route("/")
    .post(validateToken, pokemonController.savePokemon)
    .get(validateToken, pokemonController.findPokemon);

module.exports = pokemonRouter;
