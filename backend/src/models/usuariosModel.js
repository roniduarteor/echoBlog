// `nome`  (obrigatório): Nome completo do usuário.
// `email` (obrigatório e único): Endereço de email do usuário.
// `senha` (obrigatório): Senha de acesso.
// `papel` (opcional): Tipo de usuário (`administrador`, `autor`, `leitor`). O valor padrão é `leitor`.

import conn from "../config/conn.js"
import { DataTypes } from "sequelize"

const Usuarios = conn.define("usuarios", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },

    nome: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },

    senha: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },

    papel: {
        type: DataTypes.ENUM,
        values: ["administrador", "autor", "leitor"]
    }
}, {
    tableName: "usuarios"
})

export default Usuarios;