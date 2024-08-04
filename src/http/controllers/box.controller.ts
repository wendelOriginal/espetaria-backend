import { FastifyReply, FastifyRequest } from "fastify";
import { BoxModel } from "../model/box.model";
import { z } from "zod";

export async function BoxGetController(request: FastifyRequest, reply: FastifyReply){

    try{
        await request.jwtVerify()
        const boxReply = await new BoxModel().get();
        if(boxReply){
            reply.status(200).send({boxReply})
        }
    }catch(error){
        return reply.status(404).send({error})
    }
}


export async function BoxPostController(request: FastifyRequest, reply: FastifyReply){
    
    const validate = z.object({
        type: z.string(),
        total: z.number()
    })

    const data = validate.parse(request.body)
    
    try{
        await request.jwtVerify()
        const boxReply = await new BoxModel().post(data);
        if(boxReply){
            reply.status(200).send({boxReply})
        }
    }catch(error){
        return reply.status(404).send({error})
    }
}


export async function BoxUpdateController(request: FastifyRequest, reply: FastifyReply){
    const validate = z.object({
        id: z.string()
    })

    const { id } = validate.parse(request.params)
    
    try{
        await request.jwtVerify()
        const up = await new BoxModel().update(id, request.body)
        return reply.status(201).send({})
    }catch(error){
        return reply.status(404).send({error})
    }
}


export async function BoxSearchController(request: FastifyRequest, reply: FastifyReply){
    const validate = z.object({
        id: z.string()
    })

    const { id } = validate.parse(request.params)

    try{
        await request.jwtVerify()
        const boxSearch = await new BoxModel().search(id);
        if(boxSearch){
            reply.status(200).send({boxSearch})
        }
    }catch(error){
        return reply.status(404).send({error})
    }
}