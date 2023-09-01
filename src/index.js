const express = require('express');
const rotas = require('./rotas');

const { autenticar } = require('./intermediarios');

const app = express();

app.use(express.json());

app.use(autenticar);

app.use(rotas);



app.listen(3000, () => {
    console.log('App listening on port 3000!');
}); // localhost:3000