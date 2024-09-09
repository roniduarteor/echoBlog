import { z } from "zod";


export const createSchema = z.object({
    titulo: z
    .string()
    .min(3, {message: "O Título da postagem deve ter pelo menos 3 caracteres"})
    .transform((txt)=> txt.toLowerCase()),
    
    conteudo: z
    .string()
    .min(5, { message: "O conteúdo deve ter pelo menos 5 caracteres"}),

    autor: z
    .string()
    .min(3, { message: "O nome do autor deve ter pelo menos 3 caracteres"}),
})


export const getSchema = z.object({
    id: z.string().uuid({message: "Id da tarefa está inválido!"})
})


export const createSchemaUsuarios = z.object({
    nome: z
    .string()
    .min(3, {message: "O Título da postagem deve ter pelo menos 3 caracteres"})
    .transform((txt)=> txt.toLowerCase()),
    
    email: z
    .string()
    .min(5, { message: "O conteúdo deve ter pelo menos 5 caracteres"}),

    senha: z
    .string()
    .min(8)
    .regex(/[A-Za-z]/, "A senha deve conter pelo menos uma letra")
    .regex(/\d/, "A senha deve conter pelo menos um número")
})