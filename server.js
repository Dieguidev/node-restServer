const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.paths = {
      auth: '/api/auth',
      categories: '/api/categories',
      users: '/api/users',
    };

    //conectar a DB
    this.conectDB();

    //Middlewares
    this.middlewares();

    //Rutas de mi app
    this.routes();
  }

  async conectDB() {
    await dbConnection();
  }

  middlewares() {
    //CORS
    this.app.use(cors());

    //parseo y lectura del body
    this.app.use(express.json());

    //directorio publico(para servir archivos estaticos de la careta public)
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.paths.users, require('./routes/user.routes'));
    this.app.use(this.paths.auth, require('./routes/auth.routes'));
    this.app.use(this.paths.categories, require('./routes/categories.routes'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Example app listening at http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;
