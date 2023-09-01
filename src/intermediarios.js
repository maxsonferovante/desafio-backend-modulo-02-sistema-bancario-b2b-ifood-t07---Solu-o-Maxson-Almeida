// Objetivo: Arquivo responsável por intermediar as requisições e respostas do servidor.

const { contas, banco } = require('./bancodedados');

const autenticar = (req, res, next) => {
    const { senha_banco } = req.query;
    if (!senha_banco) {
        res.status(401).send({
            "mensagem": "A senha é necessária para acessar o banco!"
        });
    } else if (senha_banco === banco.senha) {
        next();
    } else {
        res.status(401).send({
            "mensagem": "A senha do banco informada não é inválida!"
        });
    }
};

const todosOsCamposPreenchidosConta = (req, res, next) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
        res.status(400).send({
            "mensagem": "Todos os campos são obrigatórios!"
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
    const cpfExiste = contas.find(conta => conta.usuario.cpf === cpf && conta.numero !== numeroConta);
    if (cpfExiste && cpfExiste.numero !== numeroConta) {
        res.status(400).send({
            "mensagem": "O CPF informado já existe cadastrado!"
        });
    } else {
        next();
    }
};

const emailUnico = (req, res, next) => {
    const { numeroConta } = req.params;
    const { email } = req.body;
    const emailExiste = contas.find(conta => conta.usuario.email === email && conta.numero !== numeroConta);
    if (emailExiste) {
        res.status(400).send({
            "mensagem": "O e-mail informado já existe cadastrado!"
        });
    } else {
        next();
    }
};

const contaExiste = (req, res, next) => {
    let numero_conta;

    if (req.query.numero_conta !== undefined) {
        numero_conta = req.query.numero_conta;
    }
    else if (req.body.numero_conta_origem !== undefined) {
        numero_conta = req.body.numero_conta_origem;
    }
    else if (req.params.numeroConta !== undefined) {
        numero_conta = req.params.numeroConta;
    }
    else if (req.body.numero_conta !== undefined) {
        numero_conta = req.body.numero_conta;
    }
    else {
        res.status(400).send({
            "mensagem": "O parâmetro conta não foi informado!"
        });
    }
    const conta = contas.find(conta => conta.numero === numero_conta);
    if (!conta) {
        res.status(404).send({
            "mensagem": "Conta bancária não encontada!"
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

const todosOsDadosParaPreenchidosTransacoes = (req, res, next) => {
    let numero_conta, valor, senha;

    if (req.query.numero_conta !== undefined && req.query.senha !== undefined) {
        numero_conta = req.query.numero_conta;
        senha = req.query.senha;
        next();
    }
    else if (req.body.numero_conta_origem !== undefined && req.body.senha !== undefined) {
        numero_conta = req.body.numero_conta_origem;
        senha = req.body.senha;
        next();
    }
    else if (req.body.numero_conta !== undefined && req.query.senha_banco !== undefined) {
        numero_conta = req.body.numero_conta;
        valor = req.body.valor;
        next();
    }
    else {
        return res.status(400).send({
            "mensagem": "Todos os campos são obrigatórios!"
        });
    }

};

const valorPositivo = (req, res, next) => {
    const { valor } = req.body;
    if (valor < 0) {
        res.status(400).send({
            "mensagem": "O valor não pode ser menor que zero!"
        });
    } else if (valor === 0) {
        res.status(400).send({
            "mensagem": "O valor não pode ser igual a zero!"
        });
    }
    else {
        next();
    }
};

const senhaCorretaDaConta = (req, res, next) => {
    let senha, numero_conta;

    if (req.query.numero_conta !== undefined && req.query.senha !== undefined) {
        senha = req.query.senha;
        numero_conta = req.query.numero_conta;
    }
    else if (req.body.numero_conta_origem !== undefined && req.body.senha !== undefined) {
        senha = req.body.senha;
        numero_conta = req.body.numero_conta_origem
    }
    else if (req.body.numero_conta !== undefined && req.body.senha !== undefined) {
        senha = req.body.senha;
        numero_conta = req.body.numero_conta;
    }
    else {
        res.status(400).send({
            "mensagem": "Os parâmetros de autenticação não foram informados!"
        });
    }

    const conta = contas.find(conta => conta.numero === numero_conta);
    if (conta.usuario.senha !== senha) {
        res.status(400).send({
            "mensagem": "A senha da conta informada está incorreta!"
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
            "mensagem": "O saldo é insuficiente para realizar o saque!"
        });
    } else {
        next();
    }
};

const contasExistemParaTransferencia = (req, res, next) => {
    const { numero_conta_origem, numero_conta_destino } = req.body;
    const contaOrigem = contas.find(conta => conta.numero === numero_conta_origem);
    const contaDestino = contas.find(conta => conta.numero === numero_conta_destino);
    if (!contaOrigem)
        res.status(404).send({
            "mensagem": "A conta de origem informada não existe!"
        });
    else if (!contaDestino)
        res.status(404).send({
            "mensagem": "A conta de destino informada não existe!"
        });
    else {
        next();
    }
};

module.exports = {
    autenticar,
    todosOsCamposPreenchidosConta,
    cpfEEmailUnicos,
    cpfUnico,
    emailUnico,
    contaExiste,
    saldoZerado,
    todosOsDadosParaPreenchidosTransacoes,
    valorPositivo,
    senhaCorretaDaConta,
    saldoSuficienteParaSaque,
    contasExistemParaTransferencia
};