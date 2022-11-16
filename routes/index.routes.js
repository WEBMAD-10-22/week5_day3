const express = require('express');
const router = express.Router();
const axios = require('axios');
const PokemonAPI = require('../connect/pokemon.connect');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/pokemons', (req, res, next) => {
  const pokeApi = new PokemonAPI();
  pokeApi
    .getPokemons(10, 0)
    .then((pokemons) => {
      // [].map() // return --> array con la misma longitud del array recorrido
      return Promise.all(
        // Promise[] --> then return { name, image } --> Promise[].then()
        pokemons.results.map((pokemon) => {
          return pokeApi.getOnePokemon(pokemon.name).then((pokemonResult) => {
            const image = pokemonResult.sprites.front_default;
            const yoQueSe = {
              name: pokemonResult.name,
              image,
            };
            return yoQueSe;
          });
        })
      );
    })
    .then((quitarGuarrada) => {
      res.render('pokemons', {pokemons: quitarGuarrada });
    });
});
/*
 {
  name: "bulbasaur",
  link: "..."
 }
 ---
 ???
 
  bulbasaur.sprites.front_default
 
 ---
 {
  name: "bulbasaur",
  image: "sprite"
 }
*/

// pokeApi.getOnePokemon('bulbasaur').then((bulbasaur) => {

//   console.log(bulbasaur.sprites.front_default)
//   res.json(bulbasaur.sprites.front_default);
// })
/**
 [
  {
    name: "pokemon",
    sprite: "sprite_porkemon"
  },
  {
    name: "pokemon",
    sprite: "sprite_porkemon"
  },
  {
    name: "pokemon",
    sprite: "sprite_porkemon"
  },
  {
    name: "pokemon",
    sprite: "sprite_porkemon"
  },

 ]
 */

module.exports = router;
