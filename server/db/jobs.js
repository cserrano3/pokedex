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

const createAnalyzer = _ =>
  axios
    .put("http://127.0.0.1:9200/pokemon", {
      data: {
        settings: {
          analysis: {
            filter: {
              autocomplete_filter: {
                type: "edge_ngram",
                min_gram: 1,
                max_gram: 5
              }
            },
            analyzer: {
              autocomplete: {
                type: "custom",
                tokenizer: "standard",
                filter: ["lowercase", "autocomplete_filter"]
              }
            }
          }
        }
      }
    })
    .then(({ data: { acknowledged } }) => acknowledged)
    .catch(error => error);

const createMapping = _ =>
  axios
    .put("http://127.0.0.1:9200/pokemon/_mapping", {
      data: {
        properties: {
          name: {
            analyzer: "autocomplete",
            type: "text"
          }
        }
      }
    })
    .then(({ data: { acknowledged } }) => acknowledged)
    .catch(error => error);

const Jobs = {
  lazilySavePokemon,
  createAnalyzer,
  createMapping
};

module.exports = Jobs;
