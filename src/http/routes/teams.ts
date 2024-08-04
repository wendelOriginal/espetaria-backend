import { FastifyInstance } from "fastify";
import { TeamsCreateController, TeamsDeleteController, TeamsGetFindController, TeamsGetController, TeamsUpdateController } from "../controllers/teams.controller";

export async function teams(app: FastifyInstance){
    app.post('/', TeamsCreateController)

    app.get('/', TeamsGetController)
    
    app.put('/:id', TeamsUpdateController)
    
    app.get('/:id', TeamsGetFindController)
    
    app.delete('/:id', TeamsDeleteController)
} 