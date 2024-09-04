
import { z } from 'zod'

export const getAll = async (request, response) => {
    response.status(200).json({msg: "Funcionou"})
}