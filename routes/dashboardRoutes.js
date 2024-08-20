const express = require('express');
const router = express.Router();
const dashboardsController = require('../controllers/dashboardsController');

router.route('/')
    .get(dashboardsController.getData)

module.exports = router;