import formatZodError from "../helpers/formatZodError.js"
import { createSchemaUsuarios } from "../helpers/schema.js"
import Usuarios from "../models/usuariosModel.js"
import { getSchema, updateUsuarioSchema } from '../helpers/schema.js'



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
    let imagem
    if(request.file){
        imagem = request.file.filename
    }else{
        imagem = "postagemDefault.png"
    }

    const emailExiste = await Usuarios.findAll({where: { email: email }})
    console.log(emailExiste)

    if(emailExiste.length > 0){
        response.status(409).json({message: "Já existe um usuário com esse email"})
        return
    }

    const novoUsuarios = {
        nome,
        email,
        senha,
        imagem,
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

export const atualizarUsuario = async (request, response) => {
    const paramValidator = getSchema.safeParse(request.params)
    if(!paramValidator.success){
        response.status(400).json({
            message: "Número de identificação está inválido",
            detalhes: formatZodError(paramValidator.error)
    })
    return
    }
    
    const updateValidator = updateUsuarioSchema.safeparse(request.body)
    if(!updateValidator.success){
        response.status(400).json({
            message: "Dados para atualização inválidos",
            details: formatZodError(updateValidator.error)
        })
        return
    }

    const {id} = request.params
    const { nome, email, senha } = request.body
    let imagem
    if(request.file){
        imagem = request.file.filename
    }else{
        imagem = "postagemDefault.png"
    }

    const emailExiste = await Usuarios.findAll({where: { email: email }})
    console.log(emailExiste)

    if(emailExiste.length > 0){
        response.status(409).json({message: "Já existe um usuário com esse email"})
        return
    }

    const usuarioAtualizado = {
        nome, 
        email, 
        senha, 
        imagem
    }

    try {
        const [linhasAfetadas] = await Tarefa.update(usuarioAtualizado, { where: { id } })

        if(linhasAfetadas <= 0){
            response.status(404).json({message: "Postagem não encontrada"})
            return
        }

        response.status(200).json({message: "Postagem atualizada!"})
    } catch (error) {
        response.status(500).json({err: "Erro ao atualizar postagem"})
    }
}