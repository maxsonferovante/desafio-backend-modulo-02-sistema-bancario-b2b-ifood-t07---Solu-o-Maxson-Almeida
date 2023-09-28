const { body, param, query } = require('express-validator');
const { validarCamposNecessarios } = require('./validacaoIntermediario');

const { contas } = require('./../bancodedados');

// campos necessários para criar uma conta
const validarCamposNecessariosParaCriarConta = [
    body('nome').notEmpty().withMessage('O nome é obrigatório'),
    body('cpf').notEmpty().withMessage('O cpf é obrigatório'),
    body('data_nascimento').notEmpty().withMessage('A data de nascimento é obrigatória'),
    body('telefone').notEmpty().withMessage('O telefone é obrigatório'),
    body('email').notEmpty().withMessage('O email é obrigatório'),
    body('senha').notEmpty().withMessage('A senha é obrigatória'),
    validarCamposNecessarios,
];

const validarCamposNecessariosParaAtualizarConta = [
    body('nome').notEmpty().withMessage('O nome é obrigatório'),
    body('cpf').notEmpty().withMessage('O cpf é obrigatório'),
    body('data_nascimento').notEmpty().withMessage('A data de nascimento é obrigatória'),
    body('telefone').notEmpty().withMessage('O telefone é obrigatório'),
    body('email').notEmpty().withMessage('O email é obrigatório'),
    body('senha').notEmpty().withMessage('A senha é obrigatória'),
    param('numeroConta').notEmpty().withMessage('O número da conta é obrigatório'),
    validarCamposNecessarios,
];

const validarCamposNecessariosParaDeletarConta = [
    param('numeroConta').notEmpty().withMessage('O número da conta é obrigatório'),
    validarCamposNecessarios,
];


const verificarExistenciaDaConta = (req, res, next) => {
    const { numeroConta } = req.params;
    const conta = contas.find(conta => conta.numero === numeroConta);
    if (!conta) {
        res.status(404).send({
            "mensagem": "A conta informada não existe!"
        });
    } else {
        next();
    }
};



const cpfEEmailUnicos = (req, res, next) => {
    const { cpf, email } = req.body;
    const cpfExiste = contas.find(conta => conta.usuario.cpf === cpf);
    const emailExiste = contas.find(conta => conta.usuario.email === email);
    if (cpfExiste || emailExiste) {
        res.status(400).send({
            "mensagem": "Já existe uma conta com o cpf ou e-mail informado!"
        });
    } else {
        next();
    }
};

const cpfUnico = (req, res, next) => {
    const { numeroConta } = req.params;
    const { cpf } = req.body;
    const cpfExiste = contas.find(conta => conta.usuario.cpf === cpf);
    if (cpfExiste) {
        if (cpfExiste.numero !== numeroConta) {
            res.status(400).send({
                "mensagem": "O cpf informado já existe cadastrado!"
            });
        }
    }
    next();
};

const emailUnico = (req, res, next) => {
    const { numeroConta } = req.params;
    const { email } = req.body;
    const emailExiste = contas.find(conta => conta.usuario.email === email);
    if (emailExiste) {
        if (emailExiste.numero !== numeroConta) {
            res.status(400).send({
                "mensagem": "O e-mail informado já existe cadastrado!"
            });
        }
    }
    next();
};



module.exports = {
    validarCamposNecessariosParaCriarConta,
    validarCamposNecessariosParaAtualizarConta,
    validarCamposNecessariosParaDeletarConta,
    verificarExistenciaDaConta,
    cpfEEmailUnicos,
    cpfUnico,
    emailUnico,
};



