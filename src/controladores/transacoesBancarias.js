const { contas, depositos, saques, transferencias } = require('../bancodedados');


const depositar = (req, res) => {
    /**
     * Handles deposit transactions by updating the account balance and recording the transaction details.
     * 
     * @param {Object} req - The request object containing the deposit details.
     * @param {Object} res - The response object used to send the response back to the client.
     * @returns {void}
     */
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
    /**
     * Process a withdrawal transaction from a bank account.
     * 
     * Retrieves the account number and withdrawal amount from the request body,
     * finds the corresponding account in the `contas` array, subtracts the withdrawal amount
     * from the account balance, and records the transaction in the `saques` array.
     * 
     * If the withdrawal is successful, it sends a response with a status code of 204.
     * If there is an error, it sends a response with a status code of 400 and an error message.
     * 
     * @param {Object} req - The request object containing the withdrawal details in the request body.
     * @param {Object} res - The response object used to send the response back to the client.
     * @returns {void}
     */
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
    /**
     * Transfers money between two bank accounts.
     * 
     * @param {object} req - The request object containing the source and destination account numbers and the transfer amount.
     * @param {object} res - The response object used to send the response back to the client.
     * @returns {void}
     */
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

/**
 * Retrieves the balance of a bank account based on the account number provided in the request query parameter.
 * 
 * @param {object} req - The request object containing the query parameter `numero_conta` which represents the account number.
 * @param {object} res - The response object used to send the balance or error message.
 * @returns {void}
 */
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
    /**
     * Generates an account statement based on the given account number.
     * Filters the deposits, withdrawals, and transfers from the database based on the account number and returns them as an object.
     * 
     * @param {object} req - The request object containing the query parameter `numero_conta` representing the account number.
     * @param {object} res - The response object with a `status` method that returns an object with a `send` method.
     * 
     * @example
     * const req = { query: { numero_conta: '123456789' } };
     * const res = {
     *   status: (code) => ({
     *     send: (data) => console.log(data)
     *   })
     * };
     * 
     * emitirExtrato(req, res);
     * 
     * @returns {void}
     */
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
/**
 * Returns the current date and time in a specific format for recording transactions.
 * @returns {string} The current date and time in the format "YYYY-MM-DD HH:mm:ss".
 */
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