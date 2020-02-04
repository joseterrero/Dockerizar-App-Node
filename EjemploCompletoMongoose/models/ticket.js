'use strict'

const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    fecha: {type: Date, default: Date.now},
    lugar: {type: String},
    puesto: {type: String},
    tipo: {type: String, enum: [
        'OTROS', 'SISTEMA_OPERATIVO', 'INTERNET', 'FISICO'
    ]},
    comentario: {type: String}
});

//MODELO SEGUN EL ESUQEMA DE TICKET

module.exports = mongoose.model('Ticket', ticketSchema);