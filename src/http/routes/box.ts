import { FastifyInstance } from "fastify";
import { BoxGetController, BoxPostController, BoxSearchController } from "../controllers/box.controller";

export async function box(app: FastifyInstance){
    app.get('/', BoxGetController)
    
    app.post('/', BoxPostController)

    app.get('/:id', BoxSearchController)
}