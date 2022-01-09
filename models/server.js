const express = require('express');
const cors = require('cors');

const router = require('../routes/users.routes');
const { dbConnection } = require('../db/config.db');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users'

        // DB connection
        this.connectDatabase();

        this.middlewares();
        this.routes();
    }

    async connectDatabase() {
        await dbConnection();
    }

    middlewares() {
        this.app.use( cors() );
        this.app.use(express.json());
        this.app.use( express.static('public') );
    }

    routes() {
        this.app.use(this.usersPath, router);
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }

}

module.exports = Server;
