# API do Cubos Bank

## Descrição

A API do Cubos Bank é uma aplicação RESTful que permite a gestão de contas bancárias e transações financeiras. Com esta API, você pode criar, listar, atualizar, excluir contas bancárias, bem como realizar depósitos, saques, transferências, consultar saldo e emitir extratos.

## Endpoints

### Listar Contas Bancárias

- **Método:** GET
- **URL:** `/contas`
- **Parâmetros de Consulta:** `senha_banco` (Senha do banco)

Este endpoint permite listar todas as contas bancárias existentes.

**Exemplo de Requisição:**

```
GET /contas?senha_banco=Cubos123Bank
```

**Exemplo de Resposta:**

```json
[
    {
        "numero": "1",
        "saldo": 0,
        "usuario": {
            "nome": "Foo Bar",
            "cpf": "00011122233",
            "data_nascimento": "2021-03-15",
            "telefone": "71999998888",
            "email": "foo@bar.com",
            "senha": "1234"
        }
    },
    {
        "numero": "2",
        "saldo": 1000,
        "usuario": {
            "nome": "Foo Bar 2",
            "cpf": "00011122234",
            "data_nascimento": "2021-03-15",
            "telefone": "71999998888",
            "email": "foo@bar2.com",
            "senha": "12345"
        }
    }
]
```

### Criar Conta Bancária

- **Método:** POST
- **URL:** `/contas`

Este endpoint permite criar uma nova conta bancária.

**Exemplo de Requisição:**

```json
POST /contas

{
    "nome": "Foo Bar 2",
    "cpf": "00011122234",
    "data_nascimento": "2021-03-15",
    "telefone": "71999998888",
    "email": "foo@bar2.com",
    "senha": "12345"
}
```

### Atualizar Dados do Usuário

- **Método:** PUT
- **URL:** `/contas/:numeroConta/usuario`

Este endpoint permite atualizar os dados do usuário de uma conta bancária.

**Exemplo de Requisição:**

```json
PUT /contas/1/usuario

{
    "nome": "Foo Bar 3",
    "cpf": "99911122234",
    "data_nascimento": "2021-03-15",
    "telefone": "71999998888",
    "email": "foo@bar3.com",
    "senha": "12345"
}
```

### Excluir Conta

- **Método:** DELETE
- **URL:** `/contas/:numeroConta`

Este endpoint permite excluir uma conta bancária.

**Exemplo de Requisição:**

```
DELETE /contas/1
```

### Depositar

- **Método:** POST
- **URL:** `/transacoes/depositar`

Este endpoint permite realizar um depósito em uma conta bancária.

**Exemplo de Requisição:**

```json
POST /transacoes/depositar

{
    "numero_conta": "1",
    "valor": 1900
}
```

### Sacar

- **Método:** POST
- **URL:** `/transacoes/sacar`

Este endpoint permite realizar um saque em uma conta bancária.

**Exemplo de Requisição:**

```json
POST /transacoes/sacar

{
    "numero_conta": "1",
    "valor": 1900,
    "senha": "123456"
}
```

### Transferir

- **Método:** POST
- **URL:** `/transacoes/transferir`

Este endpoint permite realizar uma transferência entre contas bancárias.

**Exemplo de Requisição:**

```json
POST /transacoes/transferir

{
    "numero_conta_origem": "1",
    "numero_conta_destino": "2",
    "valor": 200,
    "senha": "123456"
}
```

### Saldo

- **Método:** GET
- **URL:** `/contas/saldo`
- **Parâmetros de Consulta:** `numero_conta` (Número da conta), `senha` (Senha da conta)

Este endpoint permite consultar o saldo de uma conta bancária.

**Exemplo de Requisição:**

```
GET /contas/saldo?numero_conta=1&senha=123456
```

**Exemplo de Resposta:**

```json
{
    "saldo": 13000
}
```

### Extrato

- **Método:** GET
- **URL:** `/contas/extrato`
- **Parâmetros de Consulta:** `numero_conta` (Número da conta), `senha` (Senha da conta)

Este endpoint permite emitir o extrato de transações de uma conta bancária.

**Exemplo de Requisição:**

```
GET /contas/extrato?numero_conta=1&senha=123456
```

**Exemplo de Resposta:**

```json
{
  "depositos": [
    {
      "data": "2021-08-18 20:46:03",
      "numero_conta": "1",
      "valor": 10000
    },
    {
      "data": "2021-08-18 20:46:06",
      "numero_conta": "1",
      "valor": 10000
    }
  ],
  "saques": [
    {
      "data": "2021-08-18 20:46:18",
      "numero_conta": "1",
      "valor": 1000
    }
  ],
  "transferenciasEnviadas": [
    {
      "data": "2021-08-18 20:47:10",
      "numero_conta_origem": "1",
      "numero_conta_destino": "2",
      "valor": 5000
    }
  ],
  "transferenciasRecebidas": [
    {
      "data": "2021-08-18 20:47:24",
      "numero_conta_origem": "2",
      "numero_conta_destino": "1",
      "valor": 2000
    },
    {
      "data": "2021-08-18 20:47:26",
      "numero_conta_origem": "2",
      "numero_conta_destino": "1",
      "valor": 2000
    }
  }
}
```

## Status Codes

- 200 (OK): Requisição bem sucedida.
- 201 (Created): Requisição bem sucedida e algo foi criado.
- 204 (No Content): Requisição bem sucedida, sem conteúdo no corpo da resposta.
- 400 (Bad Request):
