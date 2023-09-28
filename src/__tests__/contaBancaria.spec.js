const app = require('../app');
const request = require('supertest');


describe('Conta Bancária.', () => {
    it('Cadastrar uma conta. Deve retornar sucesso 200', async () => {
        await request(app)
            .post('/contas')
            .send(
                {
                    nome: "Maria",
                    cpf: "12345678900",
                    data_nascimento: "2000-01-01",
                    telefone: "12345678900",
                    email: "exemplo@gmail.com",
                    senha: "123456"
                }
            );
    });
    it('Consultar a listagem de contas com a senha do banco correta. Deve retornar sucesso 200', async () => {
        await request(app)
            .get('/contas')
            .query({ senha_banco: "Cubos123Bank" });
    });

    it('Atualizar uma conta. Deve retornar sucesso 200', async () => {
        await request(app)
            .put('/contas/1/usuario')
            .send(
                {
                    nome: "Maria",
                    cpf: "12345678900",
                    data_nascimento: "",
                    telefone: "12345678900",
                    email: "exemplo12312@gmail.com",
                    senha: "12121212121212"
                }
            );
    });
    it('Deletar uma conta. Deve retornar sucesso 200', async () => {
        await request(app)
            .delete('/contas/1')
            .query({ senha_banco: "Cubos123Bank" });
    });
});
