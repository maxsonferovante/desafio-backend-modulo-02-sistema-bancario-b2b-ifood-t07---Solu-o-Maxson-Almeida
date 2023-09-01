
# API de Banco Digital - Desafio Módulo 2 - Back-end Cubos Academy

Bem-vindo à API de Banco Digital! Esta é uma aplicação piloto de um banco digital que oferece uma série de funcionalidades para contas bancárias. Esta API permite criar contas, realizar transações, consultar saldos e extratos, entre outras funcionalidades.

## Endpoints

Aqui estão os principais endpoints disponíveis na API:

### Listar Contas Bancárias

`GET /contas?senha_banco={senha}`

Este endpoint lista todas as contas bancárias existentes. É necessário fornecer a senha do banco como query parameter para acessar essa lista.

### Criar Conta Bancária

`POST /contas`

Este endpoint permite criar uma nova conta bancária. Você deve fornecer os seguintes dados no corpo da requisição:

```json
{
  "nome": "Nome do Cliente",
  "cpf": "CPF do Cliente",
  "data_nascimento": "Data de Nascimento do Cliente",
  "telefone": "Telefone do Cliente",
  "email": "Email do Cliente",
  "senha": "Senha do Cliente"
}
```

### Atualizar Usuário da Conta Bancária

`PUT /contas/:numeroConta/usuario`

Este endpoint permite atualizar os dados do usuário de uma conta bancária. Fornecer os novos dados no corpo da requisição:

```json
{
  "nome": "Novo Nome",
  "cpf": "Novo CPF",
  "data_nascimento": "Nova Data de Nascimento",
  "telefone": "Novo Telefone",
  "email": "Novo Email",
  "senha": "Nova Senha"
}
```

### Excluir Conta Bancária

`DELETE /contas/:numeroConta`

Este endpoint permite excluir uma conta bancária existente, desde que o saldo da conta seja zero.

### Depositar

`POST /transacoes/depositar`

Realiza um depósito em uma conta bancária. Forneça o número da conta e o valor do depósito no corpo da requisição.

```json
{
	"numero_conta": "Número da Conta",
	"valor": 1900
}
```

### Sacar

`POST /transacoes/sacar`

Permite sacar dinheiro de uma conta bancária. Fornecer o número da conta, o valor do saque e a senha da conta no corpo da requisição.

```json
{
	"numero_conta": "Número da Conta",
	"valor": 1900,
    "senha": "Senha da Conta"
}
```

### Transferir

`POST /transacoes/transferir`

Realiza uma transferência entre duas contas bancárias. Fornecer o número da conta de origem, o número da conta de destino, o valor da transferência e a senha da conta de origem no corpo da requisição.

```json
{
	"numero_conta_origem": "Número da Conta de Origem",
	"numero_conta_destino": "Número da Conta de Destino",
	"valor": 1900,
	"senha": "Senha da Conta de Origem"
}
```

### Saldo

`GET /contas/saldo?numero_conta={numero}&senha={senha}`

Consulta o saldo de uma conta bancária. É necessário fornecer o número da conta e a senha da conta como query parameters.

### Extrato

`GET /contas/extrato?numero_conta={numero}&senha={senha}`

Retorna o extrato das transações realizadas em uma conta bancária. Fornecer o número da conta e a senha da conta como query parameters.

```json
// HTTP Status 200 / 201 / 204
{
  "depositos": [
    {
      "data": "2023-09-01 06:02:27",
      "numero_conta": "447a56fb-5b8b-4955-ab19-a8c581ac4c09",
      "valor": 1900
    },
    {
      "data": "2023-09-01 06:02:27",
      "numero_conta": "447a56fb-5b8b-4955-ab19-a8c581ac4c09",
      "valor": 1900
    }
  ],
  "saques": [
    {
      "data": "2023-09-01 06:02:31",
      "numero_conta": "447a56fb-5b8b-4955-ab19-a8c581ac4c09",
      "valor": 1900
    }
  ],
  "transferenciasEnviadas": [
    {
      "data": "2023-09-01 06:02:29",
      "numero_conta_origem": "447a56fb-5b8b-4955-ab19-a8c581ac4c09",
      "numero_conta_destino": "bb20d3f2-f22f-44cd-83f8-a40f875f27f1",
      "valor": 1900
    }
  ],
  "transferenciasRecebidas": []
}
```

## Como Usar

1. Faça o fork deste repositório para o seu próprio GitHub.
2. Clone o seu repositório em sua máquina local.
3. Instale as dependências com `npm install`.
4. Inicie o servidor local com `npm run dev`.
5. Acesse os endpoints da API usando ferramentas como Postman ou curl. Indico o Insominia, uma vez que disponibilizo um arquivo com os endpoints para exportação e testes.

** Arquivo para exportação - Insominia**
![Insomnia.json](Insomnia_2023-09-01.json)

Lembre-se de substituir os valores entre chaves (`{}`) pelos valores reais ao fazer as requisições.

---