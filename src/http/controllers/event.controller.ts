import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { EventModel } from "../model/event.model";

export async function EventGetController(request: FastifyRequest, reply: FastifyReply){
    try{
        await request.jwtVerify()
        const events = await new EventModel().get()
        return reply.status(200).send({events})
    }catch(error){
        return reply.status(404).send({error})
    }
}

export async function EventUpdateController(request: FastifyRequest, reply: FastifyReply){
    const validate = z.object({
        id: z.string()
    })

    const { id } = validate.parse(request.params)

    try{
        await request.jwtVerify()
        const up = await new EventModel().update(id, request.body)
        return reply.status(201).send({up})
    }catch(error){
        return reply.status(400).send({error})
    }
}

export async function EventCreateController(request: FastifyRequest, reply: FastifyReply){
    const validate = z.object({
        name: z.string(),
        start_date: z.string(),
        teams_id: z.string(),
        address_id: z.string(),
        box_id: z.string(),
        goods_id: z.string()
    })

    const data = validate.parse(request.body)

    try{
        await request.jwtVerify()
        const create = await new EventModel().create(data)
        return reply.status(201).send({create})
    }catch(error){
        return reply.status(400).send({error})
    }
}


export async function EventSearchController(request: FastifyRequest, reply: FastifyReply){
    const validate = z.object({
        id: z.string()
    })

    const { id } = validate.parse(request.params)

    try{
        await request.jwtVerify()
        const search = await new EventModel().search(id)
        return reply.status(201).send({search})
    }catch(error){
        return reply.status(400).send({error})
    }
}

export async function EventGetAllController(request: FastifyRequest, reply: FastifyReply){
    const validate = z.object({
        id: z.string()
    })

    const { id } = validate.parse(request.params)

    try{
        await request.jwtVerify()
        const search = await new EventModel().getAll(id)
        return reply.status(200).send({search})
    }catch(error){
        return reply.status(400).send({error})
    }
}