const router = require('express').Router();
const quizController = require('../controllers/quizController');
const auth = require('../middleware/auth');

router.post('/generate', auth, quizController.generateQuestion);
router.post('/submit', auth, quizController.submitAnswer);
router.get('/progress', auth, quizController.getProgress);

module.exports = router;