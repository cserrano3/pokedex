const PokemonUseCase = require('../usecases/pokemon');

const savePokemon = (req, res) => {
  const {body, decoded: {id}} = req;

  const pokemonData = {...body, trainer: id};

  PokemonUseCase.savePokemon(pokemonData)
      .then((result) => {
        res.status(200).json(result);
      }).catch((error) => {
        if (error.msg || error.fields || error.mongoDriver) {
          res.status(400).json(error);
        } else {
          res.status(500).json(error);
        }
      });
};

const findPokemon = async (req, res) => {
  const {name} = req.query;

  const response = await PokemonUseCase.findPokemon(name);
  if (response) {
    res.status(200).send(response);
  } else {
    res.status(500);
  }
};

const PokemonController = {
  savePokemon,
  findPokemon,
};

module.exports = PokemonController;
