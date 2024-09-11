import formatZodError from "../helpers/formatZodError.js"
import { createSchemaUsuarios } from "../helpers/schema.js"
import Usuarios from "../models/usuariosModel.js"


export const create = async (request, response) => {
    const bodyValidation = createSchemaUsuarios.safeParse(request.body)

    if(!bodyValidation.success){
        response.status(400).json({
            message: "Os dados recebidos no corpo da requisição são inválidos",
            detalhes: formatZodError(bodyValidation.error)
        })
        return
    }

    const { nome, email, senha, papel } = request.body

    const novoUsuarios = {
        nome,
        email,
        senha,
        papel: papel || "leitor"
    }

    try {
        await Usuarios.create(novoUsuarios)
        response.status(201).json({ message: "Usuário cadastrado" })
    } catch (error) {
        console.error(error)
        response.status(500).json({ message: "Erro ao cadastrar novo usuário" })
    }
}