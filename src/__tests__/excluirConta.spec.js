// Generated by CodiumAI



const {
    excluirConta
} = require('../controladores/contaBancaria');

const { contas } = require('../bancodedados');

describe('excluirConta', () => {

    // Successfully delete an existing account
    it('should successfully delete an existing account', () => {
        const req = { params: { numeroConta: '123456' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn()
        };
        const contaIndex = 0;
        contas.findIndex = jest.fn().mockReturnValue(contaIndex);
        contas.splice = jest.fn();

        excluirConta(req, res);

        expect(contas.findIndex).toHaveBeenCalledWith(expect.any(Function));
        expect(contas.splice).toHaveBeenCalledWith(contaIndex, 1);
        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.json).toHaveBeenCalledWith({ "mensagem": "Conta excluída com sucesso!" });
        expect(res.send).not.toHaveBeenCalled();
    });

    // Return a 204 status code
    it('should return a 204 status code', () => {
        const req = { params: { numeroConta: '123456' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn()
        };
        const contaIndex = 0;
        contas.findIndex = jest.fn().mockReturnValue(contaIndex);
        contas.splice = jest.fn();

        excluirConta(req, res);

        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.json).toHaveBeenCalledWith({ "mensagem": "Conta excluída com sucesso!" });
        expect(res.send).not.toHaveBeenCalled();
    });

    // Return a success message
    it('should return a success message', () => {
        const req = { params: { numeroConta: '123456' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn()
        };
        const contaIndex = 0;
        contas.findIndex = jest.fn().mockReturnValue(contaIndex);
        contas.splice = jest.fn();

        excluirConta(req, res);

        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.json).toHaveBeenCalledWith({ "mensagem": "Conta excluída com sucesso!" });
        expect(res.send).not.toHaveBeenCalled();
    });

    // Return a 400 status code for invalid requests
    it('should return a 400 status code for invalid requests', () => {
        const req = { params: { numeroConta: '123456' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn()
        };
        const contaIndex = 0;
        contas.findIndex = jest.fn().mockReturnValue(contaIndex);
        contas.splice = jest.fn().mockImplementation(() => {
            throw new Error('Invalid request');
        });

        excluirConta(req, res);

        expect(contas.findIndex).toHaveBeenCalledWith(expect.any(Function));
        expect(contas.splice).toHaveBeenCalledWith(contaIndex, 1);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith({ "mensagem": "Invalid request" });
        expect(res.json).not.toHaveBeenCalled();
    });

    // Verify that the correct account is being deleted
    it('should verify that the correct account is being deleted', () => {
        const req = { params: { numeroConta: '123456' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn()
        };
        const contaIndex = 0;
        contas.findIndex = jest.fn().mockImplementation((callback) => {
            if (callback({ numero: req.params.numeroConta })) {
                return contaIndex;
            }
            return -1;
        });
        contas.splice = jest.fn();

        excluirConta(req, res);

        expect(contas.findIndex).toHaveBeenCalledWith(expect.any(Function));
        expect(contas.splice).toHaveBeenCalledWith(contaIndex, 1);
        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.json).toHaveBeenCalledWith({ "mensagem": "Conta excluída com sucesso!" });
        expect(res.send).not.toHaveBeenCalled();
    });
});