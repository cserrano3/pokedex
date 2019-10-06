const Model = require('../schemas/Pokemon');
const ErrorHandler = require('../utils/errorHandling');
const axios = require('axios');
const User = require('../schemas/User');

const savePokemon = ({name, order, species, moves, trainer, type, secondType, nature, level}) => {
  return new Promise((resolve, reject) => {
    const pokemon = new Model.Pokemon({
      name,
      order,
      species,
      moves,
      trainer,
      type,
      secondType,
      nature,
      level,
    });

    pokemon.save((error, result) => {
      if (error && error.message) {
        reject({mongoDriver: error.message});
      }

      if (error && error.errors) {
        reject(ErrorHandler.handleSchemaError(error.errors));
      }

      User.findByIdAndUpdate(
          trainer,
          {$push: {pokemons: pokemon}},
          {new: true},
          (userError, userResult) => {
            if (userError) reject(userError);
            resolve({savedPokemon: result, user: userResult});
          }
      );
    });
  });
};

const findPokemon = name =>
  axios
      .get(`${process.env.ELASTIC_HOST}/pokemon/_search?pretty=true`, {
        data: {
          query: {
            match: {
              name: {
                query: name,
                analyzer: 'standard',
              },
            },
          },
        },
      })
      .then(({data}) => data)
      .catch(error => error);

const PokemonUseCase = {
  savePokemon,
  findPokemon,
};

module.exports = PokemonUseCase;
