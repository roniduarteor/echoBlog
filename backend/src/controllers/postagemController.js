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

// postagens?page1&limit=3
export const getAll = async (request, response) => {
    const page = parseInt(request.query.page) || 1;
    const limit = parseInt(request.query.limit) || 3;
    const offset = (page - 1) * limit

    try {
        const postagens = await Postagem.findAndCountAll({
            limit,
            offset
        })
        // console.log(page, limit, offset)
        const totalPaginas = Math.ceil(postagens.count / limit)
        response.status(200).json({
            totalPostagens: postagens.count,
            totalPaginas,
            paginaAtual: page,
            itemsPorPagina: limit,
            proximaPagina: totalPaginas === 0 ? null: `http://localhost:3333/postagens?page=${page + 1}`,
            tarefas: postagens.rows
        })
    } catch (error) {
        response.status(500).json({ message: "Erro ao buscar as postagens" })
    }
}

export const getPostagemById = async (request, response) => {
    const {id} = request.params
    try {
        // const tarefa = await Tarefa.findOne({where: {id}})
        const postagem = await Postagem.findByPk(id)

        if(postagem === null){
            response.status(404).json({message: "Postagem não encontrada"})
            return
        }

        response.status(200).json(postagem)
    } catch (error) {
        response.status(500).json({message: "Erro ao buscar postgem"})
    }
}