import { FastifyInstance } from "fastify";
import { AuthController } from "../controllers/auth.controller";

export async function auth (app: FastifyInstance){
    app.post('/', AuthController)
}