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