const router = require('express').Router();

const { validateCardId, validateCardCreate } = require('../middlewares/validations');

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/', getCards);
router.put('/:cardId/likes', validateCardId, likeCard);
router.delete('/:cardId/likes', validateCardId, dislikeCard);
router.delete('/:cardId', validateCardId, deleteCard);
router.post('/', validateCardCreate, createCard);

router.use('/*', (req, res) => {
  res
    .status(404)
    .send({ message: 'Ресурс не найден. Проверьте URL и метод запроса' });
});

module.exports = router;
