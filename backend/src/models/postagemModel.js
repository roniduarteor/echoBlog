// - `titulo` (obrigatório): Título da postagem.
// - `conteudo` (obrigatório): Texto ou corpo da postagem.
// - `dataPublicacao` (automático): Data e hora da criação da postagem.
// - `autor` (obrigatório): Nome ou identificador do autor da postagem.
// - `imagem` (opcional): URL ou caminho para a imagem associada à postagem.

import conn from "../config/conn.js"
import { DataTypes } from "sequelize"
import Usuarios from "./usuariosModel.js"

const Postagem = conn.define("postagem", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },

    titulo: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },

    conteudo: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },

    autor: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },

    imagem: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    createdAt: "dataPublicacao",
    tableName: "postagem"
})

Usuarios.hasMany(Postagem)
Postagem.belongsTo(Usuarios)

export default Postagem;