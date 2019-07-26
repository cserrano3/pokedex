const Pokemon = require("../schemas/Pokemon");
const ESClient = require("../config/elasticSearch");

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

const PokemonUseCase = {
  savePokemon
};

module.exports = PokemonUseCase;
