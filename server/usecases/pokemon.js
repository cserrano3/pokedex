const Pokemon = require("../schemas/Pokemon");
const axios = require("axios");

const savePokemon = ({
  name,
  order,
  trainer,
  species,
  moves,
  type,
  secondType,
  nature
}) => {
  return new Promise((resolve, reject) => {
    const pokemon = new Pokemon({
      name,
      order,
      trainer,
      species,
      moves,
      type,
      secondType,
      nature
    });

    pokemon.save((err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

const findPokemon = name =>
  axios
    .get("http://127.0.0.1:9200/pokemon/_search?pretty=true", {
      data: {
        query: {
          match: {
            name: {
              query: name,
              analyzer: "standard"
            }
          }
        }
      }
    })
    .then(({ data }) => data)
    .catch(error => error);

const PokemonUseCase = {
  savePokemon,
  findPokemon
};

module.exports = PokemonUseCase;
