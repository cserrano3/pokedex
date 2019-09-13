const PokemonUseCase = require('../usecases/pokemon');

const savePokemon = (req, res) => {
  const pokemonData = JSON.parse(JSON.stringify(req.body));

  PokemonUseCase.savePokemon(pokemonData)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(500).json(error);
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
