const { validationResult } = require('express-validator');

const validarCamposNecessarios = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ mensagem: errors.array() });
    }
    next();
};



module.exports = {
    validarCamposNecessarios
};