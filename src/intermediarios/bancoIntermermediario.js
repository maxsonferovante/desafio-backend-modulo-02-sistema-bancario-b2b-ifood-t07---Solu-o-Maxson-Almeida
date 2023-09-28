const { body, param, query } = require('express-validator');
const { validarCamposNecessarios } = require('./validacaoIntermediario');
const { banco } = require('../bancodedados');

const validarListagemDeContas = [
    query('senha_banco').notEmpty().withMessage('A senha do banco é obrigatória'),
    validarCamposNecessarios,
];


const verificarCredenciasDoBanco = (req, res, next) => {
    const { senha_banco } = req.query;
    if (senha_banco !== banco.senha) {
        return res.status(401).json({ erro: 'Senha do banco incorreta' });
    }
    return next();
};


module.exports = {
    validarListagemDeContas,
    verificarCredenciasDoBanco,
};
