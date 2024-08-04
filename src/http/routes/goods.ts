import { FastifyInstance } from "fastify";
import { GoodDeleteController, GoodsCreateController, GoodSearchController, GoodsGetController, GoodUpdateController } from "../controllers/goods.controller";

export async function goods(app: FastifyInstance){
    app.get('/',GoodsGetController )

    app.post('/', GoodsCreateController)

    app.get('/:id', GoodSearchController)

    app.put('/:id', GoodUpdateController)

    app.delete('/:id', GoodDeleteController)
}