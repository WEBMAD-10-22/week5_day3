const axios = require('axios');

class PokemonAPI {
  constructor() {
   this.axios = axios.create({
    baseURL: 'https://pokeapi.co/api/v2'
   })
  }

  getPokemons(limit, page) {
    return this.axios.get(`/pokemon?limit=${limit}&offset=${page}`).then((response) => {
      return response.data;
    })
  }

  getOnePokemon(name) {
    return this.axios.get(`/pokemon/${name}`).then((response) => {
      return response.data;
    })
  }
}

module.exports = PokemonAPI;