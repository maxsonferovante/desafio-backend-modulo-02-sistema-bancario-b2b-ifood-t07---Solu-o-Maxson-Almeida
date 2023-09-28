const { contas, depositos, saques, transferencias } = require('../bancodedados');


const depositar = (req, res) => {
    const { numero_conta, valor } = req.body;
    const contaIndex = contas.findIndex(conta => conta.numero === numero_conta);

    // "data": "2021-08-10 23:40:35",
    const deposito = {
        "data": dataParaRegistroDeTransacoes(),
        "numero_conta": numero_conta,
        "valor": valor
    };
    try {
        contas[contaIndex].saldo += valor;
        depositos.push(deposito);
        res.status(204).send();
    }
    catch (error) {
        res.status(400).send({ "mensagem": error.message });
    }
};

const sacar = (req, res) => {
    const { numero_conta, valor } = req.body;
    const contaIndex = contas.findIndex(conta => conta.numero === numero_conta);

    const saque = {
        "data": dataParaRegistroDeTransacoes(),
        "numero_conta": numero_conta,
        "valor": valor
    };
    try {
        contas[contaIndex].saldo -= valor;
        saques.push(saque);
        res.status(204).send();
    }
    catch (error) {
        res.status(400).send({ "mensagem": error.message });
    }
};


const transferir = (req, res) => {
    const { numero_conta_origem, numero_conta_destino, valor } = req.body;
    const contaIndexOrigem = contas.findIndex(conta => conta.numero === numero_conta_origem);
    const contaIndexDestino = contas.findIndex(conta => conta.numero === numero_conta_destino);

    const transferencia = {
        "data": dataParaRegistroDeTransacoes(),
        "numero_conta_origem": numero_conta_origem,
        "numero_conta_destino": numero_conta_destino,
        "valor": valor
    };
    try {
        contas[contaIndexOrigem].saldo -= valor;
        contas[contaIndexDestino].saldo += valor;
        transferencias.push(transferencia);
        res.status(204).send();
    }
    catch (error) {
        res.status(400).send({ "mensagem": error.message });
    }
};

const consultarSaldo = (req, res) => {
    const { numero_conta } = req.query;
    const contaIndex = contas.findIndex(conta => conta.numero === numero_conta);
    try {
        res.status(200).send({ "saldo": contas[contaIndex].saldo });
    }
    catch (error) {
        res.status(400).send({ "mensagem": error.message });
    }
};

const emitirExtrato = (req, res) => {
    const { numero_conta } = req.query;
    const depositosFiltrados = depositos.filter(deposito => deposito.numero_conta === numero_conta);
    const saquesFiltrados = saques.filter(saque => saque.numero_conta === numero_conta);
    const transferenciasEnviadasFiltradas = transferencias.filter(transferencia => transferencia.numero_conta_origem === numero_conta);
    const transferenciasRecebidasFiltradas = transferencias.filter(transferencia => transferencia.numero_conta_destino === numero_conta);

    const extrato = {
        "depositos": depositosFiltrados,
        "saques": saquesFiltrados,
        "transferenciasEnviadas": transferenciasEnviadasFiltradas,
        "transferenciasRecebidas": transferenciasRecebidasFiltradas
    };
    try {
        res.status(200).send(extrato);
    }
    catch (error) {
        res.status(400).send({ "mensagem": error.message });
    }
};
const dataParaRegistroDeTransacoes = () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(0, 19).replace("T", " ");
    return formattedDate;
};


module.exports = {
    depositar,
    sacar,
    transferir,
    consultarSaldo,
    emitirExtrato
};