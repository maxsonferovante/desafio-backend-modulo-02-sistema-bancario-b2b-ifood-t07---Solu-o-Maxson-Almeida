const { body, param, query } = require('express-validator');
const { validarCamposNecessarios } = require('./validacaoIntermediario');

const { contas } = require('../bancodedados');

const validarCamposNecessariosParaDepositar = [
    body('valor').notEmpty().withMessage('O valor é obrigatório'),
    body('valor').isFloat({ min: 1 }).withMessage('O valor deve ser maior que zero'),
    body('numero_conta').notEmpty().withMessage('O número da conta é obrigatório'),
    validarCamposNecessarios,
];

const validarCamposNecessariosParaSacar = [
    body('numero_conta').notEmpty().withMessage('O número da conta é obrigatório'),
    body('valor').notEmpty().withMessage('O valor é obrigatório'),
    body('valor').isFloat({ min: 1 }).withMessage('O valor deve ser maior que zero'),
    body('senha').notEmpty().withMessage('A senha é obrigatória'),
    validarCamposNecessarios,
];

const validarCamposNecessariosParaTransferir = [
    body('numero_conta_origem').notEmpty().withMessage('O número da conta de origem é obrigatório'),
    body('numero_conta_destino').notEmpty().withMessage('O número da conta de destino é obrigatório'),
    body('valor').notEmpty().withMessage('O valor é obrigatório'),
    body('valor').isFloat({ min: 1 }).withMessage('O valor deve ser maior que zero'),
    body('senha').notEmpty().withMessage('A senha é obrigatória'),
    validarCamposNecessarios,
];

const validarCamposNecessariosParaConsultarSaldo = [
    query('numero_conta').notEmpty().withMessage('O número da conta é obrigatório'),
    query('senha').notEmpty().withMessage('A senha é obrigatória'),
    validarCamposNecessarios,
];

const verificarExistenciaDaContaParaConsultarSaldo = (req, res, next) => {
    const { numero_conta } = req.query;
    const conta = contas.find(conta => conta.numero === numero_conta);
    if (!conta) {
        res.status(404).send({
            "mensagem": "A conta informada não existe!"
        });
    } else {
        next();
    }
};

const validarCredenciaisParaConsultarSaldo = (req, res, next) => {
    const { numero_conta, senha } = req.query;
    const conta = contas.find(conta => conta.numero === numero_conta);

    if (conta.usuario.senha !== senha) {
        res.status(401).send({
            "mensagem": "A senha informada está incorreta!",
        });
    } else {
        next();
    }
};

const validarCamposNecessariosParaEmitirExtrato = [
    query('numero_conta').notEmpty().withMessage('O número da conta é obrigatório'),
    query('senha').notEmpty().withMessage('A senha é obrigatória'),
    validarCamposNecessarios,
];



const validarCredenciaisParaEmitirExtrato = (req, res, next) => {
    const { numero_conta, senha } = req.query;
    const conta = contas.find(conta => conta.numero === numero_conta);
    if (conta.usuario.senha !== senha) {
        res.status(401).send({
            "mensagem": "A senha informada está incorreta!"
        });
    } else {
        next();
    }
};

const verificarExistenciaDaContaParaEmitirExtrato = (req, res, next) => {
    const { numero_conta } = req.query;
    const conta = contas.find(conta => conta.numero === numero_conta);
    if (!conta) {
        res.status(404).send({
            "mensagem": "A conta informada não existe!"
        });
    } else {
        next();
    }
};


const validarCredenciaisParaSacar = (req, res, next) => {
    const { numero_conta, senha } = req.body;
    const conta = contas.find(conta => conta.numero === numero_conta);
    if (conta.usuario.senha !== senha) {
        res.status(401).send({
            "mensagem": "A senha informada está incorreta!"
        });
    } else {
        next();
    }
};

const verificarExistenciaDaContaParaSacar = (req, res, next) => {
    const { numero_conta } = req.body;
    const conta = contas.find(conta => conta.numero === numero_conta);
    if (!conta) {
        res.status(404).send({
            "mensagem": "A conta informada não existe!"
        });
    } else {
        next();
    }

};

const validarCredenciaisParaTransferir = (req, res, next) => {
    const { numero_conta_origem, senha } = req.body;
    const conta = contas.find(conta => conta.numero === numero_conta_origem);
    if (conta.usuario.senha !== senha) {
        res.status(401).send({
            "mensagem": "A senha informada está incorreta!"
        });
    } else {
        next();
    }
};

const verificarExistenciaDaContaParaTransferir = (req, res, next) => {
    const { numero_conta_origem, numero_conta_destino } = req.body;
    const contaOrigem = contas.find(conta => conta.numero === numero_conta_origem);
    const contaDestino = contas.find(conta => conta.numero === numero_conta_destino);
    if (!contaOrigem)
        res.status(404).send({
            "mensagem": "A conta de origem informada não existe ou não foi informada!"
        });
    else if (!contaDestino)
        res.status(404).send({
            "mensagem": "A conta de destino informada não existe ou não foi informada!"
        });
    else if (contaOrigem.numero === contaDestino.numero)
        res.status(400).send({
            "mensagem": "A conta de origem e destino devem ser diferentes!"
        });
    else
        next();
};

const verificarExistenciaDaContaParaDepositar = (req, res, next) => {
    const { numero_conta } = req.body;
    const conta = contas.find(conta => conta.numero === numero_conta);
    if (!conta) {
        res.status(404).send({
            "mensagem": "A conta informada não existe!"
        });
    } else {
        next();
    }
};





const saldoZerado = (req, res, next) => {
    const { numeroConta } = req.params;
    const conta = contas.find(conta => conta.numero === numeroConta);
    if (conta.saldo !== 0) {
        res.status(400).send({
            "mensagem": "A conta só pode ser removida se o saldo for zero!"
        });
    } else {
        next();
    }
};


const saldoSuficienteParaSaque = (req, res, next) => {
    const valor = req.body.valor;
    const numero_conta = req.body.numero_conta_origem ? req.body.numero_conta_origem : req.body.numero_conta;
    const conta = contas.find(conta => conta.numero === numero_conta);
    if (conta.saldo < valor) {
        res.status(400).send({
            "mensagem": "O saldo é insuficiente para realizar a operação!"
        });
    } else {
        next();
    }
};

module.exports = {
    validarCamposNecessariosParaDepositar,
    validarCamposNecessariosParaSacar,
    validarCamposNecessariosParaTransferir,
    validarCamposNecessariosParaConsultarSaldo,
    validarCamposNecessariosParaEmitirExtrato,
    verificarExistenciaDaContaParaConsultarSaldo,
    validarCredenciaisParaConsultarSaldo,
    validarCredenciaisParaSacar,
    verificarExistenciaDaContaParaSacar,
    validarCredenciaisParaTransferir,
    verificarExistenciaDaContaParaTransferir,
    verificarExistenciaDaContaParaDepositar,
    saldoZerado,
    saldoSuficienteParaSaque,
    validarCredenciaisParaEmitirExtrato,
    verificarExistenciaDaContaParaEmitirExtrato
};