const router = require('express').Router();
const IronhackAPI = require('../connect/ironhack.connect');
const ironhackAPI = new IronhackAPI();

// ---- GET ----

router.get('/', (req, res, next) => {
  ironhackAPI
    .getCharacters()
    .then((characters) => {
      res.render('characters', { characters });
    })
    .catch(next);
});
router.get('/:id', (req, res, next) => {
  ironhackAPI
    .getCharacter(req.params.id)
    .then((character) => {
      res.render('character', character);
    })
    .catch(next);
});
router.get('/delete/:id', (req, res, next) => {
  ironhackAPI
    .deleteCharacter(req.params.id)
    .then(() => {
      res.redirect('/character');
    })
    .catch(next);
});

// ---- POST ----

router.post('/', (req, res, next) => {
  const { weapon, occupation, debt, name } = req.body;
  ironhackAPI
    .createCharacter({ weapon, occupation, debt, name })
    .then((character) => {
      res.render('character', character);
    })
    .catch(next);
});
router.post('/:id', (req, res, next) => {
  const { id } = req.params;
  const { weapon, occupation, debt, name } = req.body;
  ironhackAPI
    .editCharacter(id, { weapon, occupation, debt, name })
    .then((character) => {
      res.render('character', character);
    })
    .catch(next);
});

module.exports = router;
