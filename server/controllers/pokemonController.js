const PokemonUseCase = require('../usecases/pokemon');

const savePokemon = (req, res) => {
    const pokemonData = JSON.parse(JSON.stringify(req.body));

    PokemonUseCase.savePokemon(pokemonData)
        .then(result => {
            res.status(200).json(result);
        }).catch(error => {
            res.status(500).json(error);
        });
};

const PokemonController = {
    savePokemon
};

module.exports = PokemonController;
