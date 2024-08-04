import { FastifyReply, FastifyRequest } from "fastify";
import { GoodModel } from "../model/goods.model";
import { z } from "zod";

export async function GoodsGetController(request: FastifyRequest, reply: FastifyReply){
    try{
        await request.jwtVerify()
        const data = await new GoodModel().get()
        if(data){
             return reply.status(200).send({data})   
        }
    }catch(error){
        return reply.status(404).send({
            error
        })
    }
}

export async function GoodsCreateController(request: FastifyRequest, reply: FastifyReply){
    const validate = z.object({
        name: z.string(),
        description: z.string(),
        value: z.number(),
        amount: z.number(),
        categoryId: z.string()

    })
 
    const data = validate.parse(request.body)
    try{
        await request.jwtVerify()
        const created = await new GoodModel().create(data)
        if(created){
             return reply.status(200).send({created})   
        }
    }catch(error){
        return reply.status(400).send({
            error
        })
    }
}

export async function GoodUpdateController(request: FastifyRequest, reply: FastifyReply){
    const validate = z.object({
        id: z.string()
    })

    const { id } = validate.parse(request.body)

    try{
        await request.jwtVerify()
        const up = await new GoodModel().updateGood(id, request.body)
        if(up){
            return reply.status(200).send({
                up
            })
        }
    }catch(error){
        return reply.status(400).send({error})
    }
}

export async function GoodDeleteController(request: FastifyRequest, reply: FastifyReply){
    const validate = z.object({
        id: z.string()
    })

    const { id } = validate.parse(request.params)

    try{
        await request.jwtVerify()
        const deleteReply = await new GoodModel().deleteGood(id)
        if(deleteReply){
            return reply.status(200).send({deleteReply})
        }
    }catch(error){
        return reply.status(400).send({error})
    }


}

export async function GoodSearchController(request: FastifyRequest, reply: FastifyReply){
    const validate = z.object({
        id: z.string()
    })

    const { id } = validate.parse(request.params)

    try{
        await request.jwtVerify()
        const search = await new GoodModel().search(id)

        if(search){
            return reply.status(200).send({search})
        }
    }catch(error){
        return reply.status(400).send({error})
    }
}