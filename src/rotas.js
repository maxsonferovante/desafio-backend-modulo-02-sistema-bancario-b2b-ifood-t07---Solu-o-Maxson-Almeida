const { Router } = require('express');

const transacoesBancarias = require('./controladores/transacoesBancarias');
const contaBancaria = require('./controladores/contaBancaria');

const { verificarCredenciasDoBanco,
    validarListagemDeContas
} = require('./intermediarios/bancoIntermermediario');

const {
    validarCamposNecessariosParaCriarConta,
    validarCamposNecessariosParaAtualizarConta,
    validarCamposNecessariosParaDeletarConta,
    verificarExistenciaDaConta,
    cpfEEmailUnicos,
    cpfUnico,
    emailUnico
} = require('./intermediarios/contaBancariaIntermediario');

const {
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
} = require('./intermediarios/transacoesBancariasIntermerdiario');

const rotas = Router();

rotas.get('/contas',
    validarListagemDeContas,
    verificarCredenciasDoBanco,
    contaBancaria.listarContas);

rotas.post('/contas',
    validarCamposNecessariosParaCriarConta,
    cpfEEmailUnicos,
    contaBancaria.criarConta);

rotas.put('/contas/:numeroConta/usuario',
    verificarExistenciaDaConta,
    validarCamposNecessariosParaAtualizarConta,
    cpfUnico,
    emailUnico,
    contaBancaria.atualizarUsuario);

rotas.delete('/contas/:numeroConta',
    verificarExistenciaDaConta,
    saldoZerado,
    contaBancaria.excluirConta);

rotas.post('/transacoes/depositar',
    validarCamposNecessariosParaDepositar,
    verificarExistenciaDaContaParaDepositar,
    transacoesBancarias.depositar);

rotas.post('/transacoes/sacar',
    validarCamposNecessariosParaSacar,
    verificarExistenciaDaContaParaSacar,
    validarCredenciaisParaSacar,
    saldoSuficienteParaSaque,
    transacoesBancarias.sacar);

rotas.post('/transacoes/transferir',
    validarCamposNecessariosParaTransferir,
    verificarExistenciaDaContaParaTransferir,
    validarCredenciaisParaTransferir,
    saldoSuficienteParaSaque,
    transacoesBancarias.transferir);

rotas.get('/contas/saldo',
    validarCamposNecessariosParaConsultarSaldo,
    verificarExistenciaDaContaParaConsultarSaldo,
    validarCredenciaisParaConsultarSaldo,
    transacoesBancarias.consultarSaldo);

rotas.get('/contas/extrato',
    validarCamposNecessariosParaEmitirExtrato,
    verificarExistenciaDaContaParaEmitirExtrato,
    validarCredenciaisParaEmitirExtrato,
    transacoesBancarias.emitirExtrato);

module.exports = rotas;