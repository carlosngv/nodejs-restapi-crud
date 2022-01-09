const Role = require('../models/role');
const Usuario = require('../models/usuario');

const validarRol = async (rol = '') => {
    const existeRol = await Role.findOne( { rol } );
    if(!existeRol) {
        throw new Error(`El rol '${rol}' no existe en la base de datos.`)
    }
}

const validarEmail = async (correo = '') => {
    const existeEmail = await Usuario.findOne({ correo });
    if( existeEmail ) {
        throw new Error(`El correo '${correo}' ya se encuentra registrado.`)
    }
}

const validarIdUsuario = async (id = '') => {
    const existeUsuario = await Usuario.findById( id );
    if(!existeUsuario) {
        throw new Error(`El usuario con el ID '${ id }' no existe.`)
    }
}

module.exports = {
    validarRol,
    validarEmail,
    validarIdUsuario
}
