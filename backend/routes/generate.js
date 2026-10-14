const express = require('express');
const router = express.Router();
const {
  generateCode,
  getHistory,
  deleteGeneration
} = require('../controllers/generateController');

router.post('/', generateCode);
router.get('/history', getHistory);
router.delete('/:id', deleteGeneration);

module.exports = router;
