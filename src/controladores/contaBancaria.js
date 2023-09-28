
const { banco, contas, depositos } = require('../bancodedados');
const { v4: uuidv4 } = require('uuid');

const listarContas = (req, res) => {
    res.status(200).send(contas);
};

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