const express = require('express');
const io = express();
const stuffRoutes = require('./Route/stuff');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize("mydb", "root", "[mettre mots de passe]", {
  dialect: "mysql",
  host: "localhost"
});

try {
  sequelize.authenticate();
  console.log('Connecté à la base de données MySQL!');
  sequelize.query("SELECT * FROM user").then(([results, metadata]) => {
      console.log(results);
    })
} catch (error) {
  console.error('Impossible de se connecter, erreur suivante :', error);
}


//bug cors
io.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

const bodyParser = require('body-parser');

io.use(bodyParser.json());
io.use('/api/stuff', stuffRoutes);

module.exports = io;