import { FastifyInstance } from "fastify";
import { EventCreateController, EventGetAllController, EventGetController, EventUpdateController } from "../controllers/event.controller";

export async function event(app: FastifyInstance){
    app.get('/', EventGetController)

    app.get('/:id', EventGetAllController)

    app.post('/', EventCreateController)

    app.put('/:id', EventUpdateController)


}