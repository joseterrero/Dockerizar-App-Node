'use strict'

const UserService = require('../services/user')
const bcrypt    = require('bcryptjs');
const passport  = require('passport');
const jwt       = require('jsonwebtoken');
const error_types = require('./error_types');
const User = require('../models/user');

let controller = {
    
    register: (req, res, next) => {
        //let resultado = UserService.findUser({username : req.username});
        User.find({username: req.body.username}, (err, result) => {
           if (result.length > 0) { 
                next(new error_types.InfoError("user already exists"));
            } else {
                let hash = bcrypt.hashSync(req.body.password, parseInt(process.env.BCRYPT_ROUNDS));
                let user = new User({
                    email: req.body.email,
                    username: req.body.username,
                    fullname: req.body.fullname,
                    roles: ['INFORMADOR'],
                    password: hash
                });

                user.save((err, user) => {
                    if (err) next(new error_types.Error400(err.message));
                    res.status(201).json(user);
                });
            }
        })
/*         if (resultado != undefined) {
            next(new error_types.InfoError("user already exists"));
        } else {
            let hash = bcrypt.hashSync(req.body.password, parseInt(process.env.BCRYPT_ROUNDS));
            let inserted = UserService.insertUser({
                email: req.body.email,
                username: req.body.username,
                password: hash
            })
            res.json(inserted)
         }*/
    }
    ,
    login: (req, res, next) => {
        passport.authenticate("local", {session: false}, (error, user) => {
            if (error || !user) {
                next(new error_types.Error404("username or password not correct."))
            } else {
                const payload = {
                    sub: user.id,
                    exp: Date.now() + parseInt(process.env.JWT_LIFETIME),
                    username: user.username
                };
                const token = jwt.sign(JSON.stringify(payload), process.env.JWT_SECRET, {algorithm: process.env.JWT_ALGORITHM});
                res.json({ 
                    username: user.username,
                    token: token
                });

            }

        })(req, res)
    }


}

module.exports = controller;