'use strict'

const TicketService = require('../services/tickets')
const error_types = require('./error_types');

const Ticket = require('../models/ticket');


module.exports = {

    nuevoTicket: (req, res) => {
/*         return res.status(201).json(
            TicketService.insertTicket({
            lugar: req.body.lugar,
            puesto: req.body.puesto,
            tipo: req.body.tipo,
            comentario: req.body.comentario,
            usuario: req.user.id
            })
        );
 */    
        let ticket = new Ticket({
            lugar: req.body.lugar,
            puesto: req.body.puesto,
            tipo: req.body.tipo,
            comentario: req.body.comentario
        });
        
        ticket.save((err, ticket) => {
            if (err) res.send(500, err.message);
            res.status(201).json(ticket);
        })

    },
    getTodos: (req, res) => {
        //return res.status(200).json(TicketService.findAll());
        Ticket.find((err, tickets) => {
            if (err) res.send(500, err.message);
            res.status(200).json(tickets);
        });
    }


}