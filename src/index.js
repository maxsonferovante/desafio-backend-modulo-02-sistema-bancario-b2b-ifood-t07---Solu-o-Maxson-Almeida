const express = require('express');
const rotas = require('./rotas');

const app = express();

app.use(express.json());

app.use(rotas);

app.listen(3000, () => {
    console.log('App listening on port 3000!');
}); // localhost:3000