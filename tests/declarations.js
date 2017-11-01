//crear instancia de la base de datos
process.env.NODE_ENV = 'test';
const mongoose = require('../mongoose')();
const mocha = require('mocha');

//crear instancia para generadores
const coMocha = require('co-mocha');
coMocha(mocha);