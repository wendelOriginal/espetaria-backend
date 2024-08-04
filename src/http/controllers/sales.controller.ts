import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { SalesModel } from "../model/sales.Model";

export async function SalesCreateController(request: FastifyRequest, reply: FastifyReply){
    const validate = z.object({
        client: z.string(),
        payment: z.coerce.number(),
        total: z.coerce.number(),
        create_at: z.string(),
        box_id: z.string(),
        good_id: z.string(),
        functionary_id: z.string() 
    })


    const data = validate.parse(request.body)

    try{
        const command = await new SalesModel().create(data)
        return reply.status(201).send({
            command
        })
    }catch(error){
        return reply.status(400).send({error})
    }


}

export async function SalesPutController(request: FastifyRequest, reply: FastifyReply){
    const validate = z.object({
        id: z.string()
    })


    const {id} = validate.parse(request.params)

    try{
        const command = await new SalesModel().update(id, request.body)
        return reply.status(201).send({
            command
        })
    }catch(error){
        return reply.status(400).send({error})
    }


}


export async function SalesGetController(request: FastifyRequest, reply: FastifyReply){
 

    try{
        const command = await new SalesModel().get()
        return reply.status(200).send({
            command
        })
    }catch(error){
        return reply.status(400).send({error})
    }


}

export async function SalesDeleteController(request: FastifyRequest, reply: FastifyReply){
    const validate = z.object({
        id: z.string()
    })


    const {id} = validate.parse(request.params)

    try{
        const command = await new SalesModel().delete(id)
        return reply.status(201).send({
            command
        })
    }catch(error){
        return reply.status(400).send({error})
    }


}

export async function SalesSearchController(request: FastifyRequest, reply: FastifyReply){
    const validate = z.object({
        id: z.string()
    })


    const {id} = validate.parse(request.params)

    try{
        const command = await new SalesModel().findUnique(id)
        return reply.status(200).send({
            command
        })
    }catch(error){
        return reply.status(400).send({error})
    }


}


