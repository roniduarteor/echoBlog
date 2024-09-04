import Postagem from "../models/postagemModel.js"
import { z } from 'zod'
import formatZodError from '../helpers/formatZodError.js'
import { createSchema } from '../helpers/schema.js'

export const create = async (request, response) => {
        
    //implementar a validação
    const bodyValidation = createSchema.safeParse(request.body)
    
    if(!bodyValidation.success){
        response.status(400).json({
            message: "Os dados recebidos no corpo da requisição são inválidos", 
            detalhes: formatZodError(bodyValidation.error)
        })
        return
    }
    
    
    const { titulo, conteudo, autor, imagem } = request.body
    


    const novaPostagem = { // informações que vão ser inseridas
        titulo,
        conteudo,
        autor,
        imagem
    }

    try { // para fazer uma nova postagem
        await Postagem.create(novaPostagem)
        response.status(201).json({ message: "Postagem feita" })
    } catch (error) {
        console.error(error)
        response.status(500).json({ message: "Erro ao fazer uma nova Postagem" })
    }
}