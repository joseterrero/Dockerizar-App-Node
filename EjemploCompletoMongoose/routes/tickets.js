'use strict'

const express = require('express')
const router = express.Router()
const middleware = require('../middleware/index');
const TicketController = require('../controllers/ticket')


//router.get('/', middleware.ensureAuthenticated, TicketController.getTodos);
router.get('/', TicketController.getTodos);

//router.post('/', middleware.ensureAuthenticated, TicketController.nuevoTicket);
router.post('/', TicketController.nuevoTicket);



module.exports = router