import { FastifyReply, FastifyRequest } from "fastify";
import { CategoryModel } from "../model/category.model";
import { z } from "zod";

export async function CategoryGetController(request: FastifyRequest, reply: FastifyReply){
    try{
        await request.jwtVerify()
        const category = await new CategoryModel().get()
        return category
    }catch(error){
        return reply.status(404).send({error})
    }
}

export async function CategoryPutController(request: FastifyRequest, reply: FastifyReply){
    const validate = z.object({
        id: z.string()
    })
    
    const { id }  = validate.parse(request.params)
    try{
        await request.jwtVerify()
        const category = await new CategoryModel().put(id, request.body)
        return category
    }catch(error){
        return reply.status(404).send({error})
    }
}

export async function CategoryCreateController(request: FastifyRequest, reply: FastifyReply){
    const validate = z.object({
        name: z.string()
    })
    
    const { name }  = validate.parse(request.body)
    try{
        await request.jwtVerify()
        const category = await new CategoryModel().create(name)
        return category
    }catch(error){
        return reply.status(404).send({error})
    }
}