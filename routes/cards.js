const router = require('express').Router();

const { validateCardId } = require('../middlewares/validations');

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
router.post('/', createCard);

module.exports = router;
