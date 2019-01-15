const express = require('express');
const router = express.Router();

router.get('/add', (req, res) => res.render('tasks/add'));

module.exports = router;
