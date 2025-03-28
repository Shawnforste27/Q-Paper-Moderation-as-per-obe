const express = require('express');
const { searchQuestion } = require('../controllers/searchController');

const router = express.Router();

router.post('/search-question', searchQuestion);

module.exports = router;