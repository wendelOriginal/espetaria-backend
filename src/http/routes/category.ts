import { FastifyInstance } from "fastify";
import { CategoryCreateController, CategoryGetController, CategoryPutController } from "../controllers/category.controller";

export async function category(app: FastifyInstance){
    app.get('/', CategoryGetController)

    app.post('/', CategoryCreateController)

    app.put('/:id', CategoryPutController)
}