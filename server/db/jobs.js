const baseUrl = require("../config/pokemonApi");
const axios = require("axios");
const ESClient = require("../config/elasticSearch");

const lazilySavePokemon = id => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseUrl}pokemon/${id}`)
      .then(({ data: { height, name, id, weight, order, sprites, types } }) => {

        const pokemon = {
          height,
          name,
          id,
          weight,
          order,
          sprites: [
            {
              default: sprites.front_default,
              shiny: sprites.front_shiny
            }
          ],
          types
        };

        const pokemonData = {
          index: "pokemon",
          body: pokemon
        };
        resolve(ESClient.index(pokemonData));
      })
      .catch(error => reject(error));
  });
};

const Jobs = {
  lazilySavePokemon
};

module.exports = Jobs;
