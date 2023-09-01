const { Router } = require('express');

const contaBancaria = require('./controladores/contaBancaria');
const transacoesBancarias = require('./controladores/transacoesBancarias');
const intermediarios = require('./intermediarios');

const rotas = Router();

rotas.get('/contas', contaBancaria.listarContas);

rotas.post('/contas',
    intermediarios.todosOsCamposPreenchidosConta,
    intermediarios.cpfEEmailUnicos,
    contaBancaria.criarConta);

rotas.put('/contas/:numeroConta/usuario',
    intermediarios.contaExiste,
    intermediarios.todosOsCamposPreenchidosConta,
    intermediarios.cpfUnico,
    intermediarios.emailUnico,
    contaBancaria.atualizarUsuario);

rotas.delete('/contas/:numeroConta',
    intermediarios.contaExiste,
    intermediarios.saldoZerado,
    contaBancaria.excluirConta);

rotas.post('/transacoes/depositar',
    intermediarios.todosOsDadosParaPreenchidosTransacoes,
    intermediarios.contaExiste,
    intermediarios.valorPositivo,
    transacoesBancarias.depositar);

rotas.post('/transacoes/sacar',
    intermediarios.todosOsDadosParaPreenchidosTransacoes,
    intermediarios.contaExiste,
    intermediarios.senhaCorretaDaConta,
    intermediarios.valorPositivo,
    intermediarios.saldoSuficienteParaSaque,
    transacoesBancarias.sacar);

rotas.post('/transacoes/transferir',
    intermediarios.todosOsDadosParaPreenchidosTransacoes,
    intermediarios.contasExistemParaTransferencia,
    intermediarios.senhaCorretaDaConta,
    intermediarios.valorPositivo,
    intermediarios.saldoSuficienteParaSaque,
    transacoesBancarias.transferir);

rotas.get('/contas/saldo',
    intermediarios.todosOsDadosParaPreenchidosTransacoes,
    intermediarios.contaExiste,
    intermediarios.senhaCorretaDaConta,
    transacoesBancarias.consultarSaldo);

rotas.get('/contas/extrato',
    intermediarios.todosOsDadosParaPreenchidosTransacoes,
    intermediarios.contaExiste,
    intermediarios.senhaCorretaDaConta,
    transacoesBancarias.emitirExtrato);

module.exports = rotas;