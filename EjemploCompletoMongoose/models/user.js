'use strict'

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    fullname: String,
    roles: [{type: String, enum: [
        "INFORMADOR", "TECNICO", "ADMIN"
    ]}],
    password: String
});


module.exports = mongoose.model('User', userSchema);