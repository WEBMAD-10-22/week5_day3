const axios = require('axios');

class IronhackAPI {
  constructor() {
    this.axios = axios.create({
      baseURL: 'https://ih-crud-api.herokuapp.com',
    });
  }

  getCharacters() {
    return this.axios.get('/characters').then((response) => response.data);
  }

  getCharacter(id) {
    return this.axios.get(`/characters/${id}`).then((response) => response.data);
  }

  createCharacter(body) {
    return this.axios.post('/characters', body).then((response) => response.data);
  }

  editCharacter(id, body) {
    return this.axios.put(`/characters/${id}`, body).then((response) => response.data);
  }

  deleteCharacter(id) {
    return this.axios.delete(`/characters/${id}`).then((response) => response.data);
  }
}

module.exports = IronhackAPI;
