const { Router } = require('express');
const { check } = require('express-validator');
const { getUser, deleteUser, postUser, putUser } = require('../controllers/users.controller');

const { validarRol, validarEmail, validarIdUsuario } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();


router.get('/', getUser);

router.put('/:id', [
    check('id', 'No es un ID válido.').isMongoId(),
    check('id').custom(validarIdUsuario),
    check('rol').custom( validarRol ),
    validarCampos
], putUser);

router.post('/', [
    check('nombre', 'El nombre es obligatorio.').not().isEmpty(), // Prepara los errores para ser utilizados
    check('password', 'El password debe de ser más de 6 letras.').isLength( { min: 6 } ), // Prepara los errores para ser utilizados
    check('correo', 'El correo no es válido.').isEmail(), // Prepara los errores para ser utilizados
    check('correo').custom( validarEmail ),
    check('rol').custom( validarRol ),
    validarCampos
] ,postUser);

router.delete('/:id', [
    check('id', 'No es un ID válido.').isMongoId(),
    check('id').custom(validarIdUsuario),
    validarCampos
], deleteUser);


module.exports = router;
