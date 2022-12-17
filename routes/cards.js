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

module.exports = router;
