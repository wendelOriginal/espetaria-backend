import fastify from "fastify";
import { ZodError } from "zod";
import { funcionary } from "./http/routes/funcionary";
import { teams } from "./http/routes/teams";
import { goods } from "./http/routes/goods";
import { box } from "./http/routes/box";
import { event } from "./http/routes/event";
import { auth } from "./http/routes/auth";
import fastifyJwt from "@fastify/jwt";
import { env } from "./env";


export const app = fastify()

app.register(fastifyJwt,{
    secret: env.SECRET
})

app.register(funcionary, {
    prefix: "funcionary",
})

app.register(auth, {
    prefix: "auth"
})

app.register(teams,
    {
        prefix: "teams"
    }
)

app.register(goods, {
    prefix: "goods"
})

app.register(box, {
    prefix: "box"
})

app.register(event, {
    prefix: "event"
})

app.setErrorHandler((error, _, reply) =>{
    if(error instanceof ZodError){
        return reply.status(400).send({issues: error.format()})
    }

    return reply.status(500).send(error)
})