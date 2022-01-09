const { response, request } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');



const getUser = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true }

    // Devolviendo una colección de promesas para trabajarlas simultaneamente.
    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments( query ),
        Usuario.find( query )
            .skip( desde )
            .limit( limite )
    ])

    res.status(200).json({
        total,
        usuarios
    });
}

const putUser = async (req, res = response) => {

    const id = req.params.id;
    const { _id, password, google, correo, ...userBody } = req.body;

    /*
        Si viene el password en el request, significa que está queriendo cambiar
        contraseña
    */
    if( password ) {
        const salt = bcrypt.genSaltSync(10);
        userBody.password = bcrypt.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, userBody );

    res.status(200).json({
        ok: true,
        msg: "Información actualizada exitosamente.",
        usuario
    });
}

const postUser = async (req, res = response) => {

    const { nombre, correo, password, rol } = req.body;

    userBody = {
        nombre, correo, password, rol
    }

    const usuario = new Usuario( userBody );

    // Encriptar contraseña
    const salt = bcrypt.genSaltSync(10);
    usuario.password = bcrypt.hashSync( password, salt );

    // Guardar en db
    await usuario.save();

    res.status(200).json({
        ok: true,
        msg: "¡Usuario creado exitosamente!",
        usuario
    });

}

const deleteUser = async (req, res = response) => {

    const { id } = req.params;

    // Borrado físico
    // const usuario = await Usuario.findByIdAndDelete( id );

    // Borrar referencia indicando su estado a false.
    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false } );


    res.status(200).json({
        ok: true,
        msg: 'Usuario borrado exitosamente.',
        usuario
    });
}

module.exports = {
    getUser,
    putUser,
    postUser,
    deleteUser
}
