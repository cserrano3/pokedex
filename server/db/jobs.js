const baseUrl = require("../config/pokemonApi");
const axios = require("axios");
const ESClient = require("../config/elasticSearch");

const lazilySavePokemon = id => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseUrl}pokemon/${id}`)
      .then(({ data }) => {
        const { name, id, order } = JSON.parse(JSON.stringify(data));
        const pokemon = {
          name,
          id,
          order
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
