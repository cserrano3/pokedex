const Pokemon = require('../schemas/Pokemon');
const ErrorHandler = require('../utils/errorHandling');
const axios = require('axios');

const savePokemon = ({name, order, species, moves, trainer, type, secondType, nature, level}) => {
  return new Promise((resolve, reject) => {
    const pokemon = new Pokemon({
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
      console.log('error............ ', error);
      console.log('result............ ', result);
      if (error.code) {
        reject({msg: error.errmsg, code: error.code});
      }
      if (error && error.errors) {
        reject(ErrorHandler.handleSchemaError(error.errors));
      } else {
        resolve(result);
      }
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
