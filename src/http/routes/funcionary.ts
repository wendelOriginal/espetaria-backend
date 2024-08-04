import { FastifyInstance } from "fastify";
import { CreateFuncionaryController, DeleteFuncionary, GetFuncionaries, SearchFuncionary, UpdateInformationFuncionary } from "../controllers/funcionary.controller";

export async function funcionary ( app: FastifyInstance ){
    
    app.post('/', CreateFuncionaryController)

    app.put('/:id', UpdateInformationFuncionary)

    app.get('/', GetFuncionaries)

    app.get('/:id', SearchFuncionary)

    app.delete('/:id', DeleteFuncionary)
}