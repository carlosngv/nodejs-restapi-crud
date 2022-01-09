const { validationResult } = require('express-validator');

const validarCampos = ( req, res, next ) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    next(); // Continua con el siguiente middleware. En caso no haya, sigue con el controlador.
}

module.exports = {
    validarCampos
};
