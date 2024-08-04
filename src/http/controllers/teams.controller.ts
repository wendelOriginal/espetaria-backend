import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { TeamsModel } from "../model/teams.model";

export async function TeamsCreateController (request: FastifyRequest, reply: FastifyReply){
    const validate = z.object({
        name:z.string()
    })

    const { name } = validate.parse(request.body)

    const verifyTeam = await new TeamsModel().findUnique(name)
    if(verifyTeam){
        return reply.status(409).send({error: "Nome do time já existe"})
    }
    try{
        
        const createTeam = await new TeamsModel().create({name})
        if(createTeam){
            return reply.status(201).send({createTeam})
        }
        return reply.status(500).send()
    }catch(error){
        return reply.status(404).send()
    }
}

export async function TeamsGetController(request: FastifyRequest, reply: FastifyReply){
    try{
        await request.jwtVerify()
        const teams = await new TeamsModel().get()
        return reply.status(201).send({teams})
    }catch(error){
        return reply.status(404).send({error: error})
    }
}

export async function TeamsUpdateController(request: FastifyRequest, reply: FastifyReply){
    
    const validate = z.object({
        id: z.string()
    })
    const { id } = validate.parse(request.params)
    try{
        await request.jwtVerify()
        const update = await new TeamsModel().update(id, request.body)
        if(update){
            return reply.status(201).send({update})
        }
    }catch(error){
        return reply.status(404).send({error: "Time não encontrado!"})
    }
}

export async function TeamsGetFindController(request:FastifyRequest, reply: FastifyReply){
 
    const validate = z.object({
        id: z.string()
    })

    const { id } = validate.parse(request.params)
    try{
        await request.jwtVerify()
        const find = await new TeamsModel().findRelation(id)
       
        if(find){
            return reply.status(201).send({find})
        }
    }catch(error){
        return reply.status(404).send({error})
    }
}

export async function TeamsDeleteController(request:FastifyRequest, reply: FastifyReply){
    const validate = z.object({
        id: z.string()
    })

    const { id } = validate.parse(request.params)

    try{
        await request.jwtVerify()
        const deleteTeams = await new TeamsModel().delete(id)
        if(deleteTeams){
            return reply.status(201).send({deleteTeams})
        }
    }catch(error){
        return reply.status(404).send({error})
    }

}