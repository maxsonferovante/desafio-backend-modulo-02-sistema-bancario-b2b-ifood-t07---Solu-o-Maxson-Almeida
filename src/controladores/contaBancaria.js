
const { banco, contas, depositos } = require('../bancodedados');
const { v4: uuidv4 } = require('uuid');

const listarContas = (req, res) => {
    /**
     * Handles a HTTP GET request and sends a response with a status code of 200 and the `contas` variable as the response body.
     * 
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @returns {void}
     */
    res.status(200).send(contas);
};

/**
 * Creates a new account.
 * 
 * @param {object} req - The request object containing the account details in the `body` property.
 * @param {object} res - The response object used to send the response back to the client.
 * @returns {void}
 */
const criarConta = (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
    const novaConta = {
        numero: uuidv4(),
        saldo: 0,
        usuario: {
            nome,
            cpf,
            data_nascimento,
            telefone,
            email,
            senha
        }
    };
    try {
        contas.push(novaConta);
        res.status(204).json({
            "mensagem": "Conta criada com sucesso!"
        });
    } catch (error) {
        res.status(400).send({ "mensagem": error.message });
    }
};


const atualizarUsuario = (req, res) => {
    /**
     * Updates user information in a bank account.
     * 
     * @param {object} req - The request object containing the parameters and body of the HTTP request.
     * @param {object} res - The response object used to send the HTTP response back to the client.
     * @returns {void}
     */
    const { numeroConta } = req.params;
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
    const contaIndex = contas.findIndex(conta => conta.numero === numeroConta);

    const contaAtualizada = {
        numero: numeroConta,
        saldo: contas[contaIndex].saldo,
        usuario: {
            nome,
            cpf,
            data_nascimento,
            telefone,
            email,
            senha
        }
    };
    try {
        contas[contaIndex] = contaAtualizada;
        res.status(204).json({
            "mensagem": "Conta atualizada com sucesso!"
        });
    } catch (error) {
        res.status(400).send({ "mensagem": error.message });
    }
};

const excluirConta = (req, res) => {
    /**
     * Deletes a bank account from the 'contas' array based on the provided account number.
     * 
     * @param {Object} req - The request object containing the request parameters.
     * @param {Object} res - The response object representing the response to be sent back to the client.
     * @returns {void}
     */
    const { numeroConta } = req.params;
    const contaIndex = contas.findIndex(conta => conta.numero === numeroConta);
    try {
        contas.splice(contaIndex, 1);
        res.status(204).json({
            "mensagem": "Conta excluída com sucesso!"
        });
    } catch (error) {
        res.status(400).send({ "mensagem": error.message });
    }
};


module.exports = {
    listarContas,
    criarConta,
    atualizarUsuario,
    excluirConta
};