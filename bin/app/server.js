const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const Mongo = require('../utils/database/mongodb/connection');
const checkoutRoute = require('./checkout');

function AppServer(){

    let startDB = new Mongo();
    startDB.initConnection();

    this.server = new express();

    this.server.use(express.json());
    this.server.use(express.urlencoded({extended: true}));
    this.server.use(cookieParser())
    this.server.use(cors());

    this.server.use((req, res, next) => {
       if(req.method === 'OPTIONS'){
           res.send(405);
       }
       return next();
    });

    checkoutRoute.routes(this.server);

}

module.exports = AppServer;