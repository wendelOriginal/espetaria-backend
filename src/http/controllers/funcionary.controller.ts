import { FastifyReply, FastifyRequest } from "fastify";
import { z } from 'zod'
import { FuncionaryModel } from "../model/funcionary.model";
import { hash } from "bcryptjs";


export async function CreateFuncionaryController(request: FastifyRequest, reply: FastifyReply){
    const validate = z.object({
        name: z.string(),
        phone: z.string(),
        password: z.string(),
        teams_id: z.string()
    })

    const { name, phone, password, teams_id } = validate.parse(request.body)
    const password_hash = await hash(password, 6)
    try{

        const checkPhone = await new FuncionaryModel().findUnique(phone)
        if(checkPhone){
            return reply.status(409).send({error: "Telefone já cadastrado!"})
        }

        const register = await new FuncionaryModel().create({
            name,
            phone,
            password_hash,
            teams_id
        })
            console.log(register)
            return reply.status(201).send({register})
        
    }catch(error){
        return 
    }


    

}

export async function UpdateInformationFuncionary(request: FastifyRequest, reply: FastifyReply){

    const validate = z.object({
        id: z.string()
    })

    const { id } = validate.parse(request.params)
    const data = request.body
    
   try{
         await request.jwtVerify()
        const up = await new FuncionaryModel().put(id, data)
        if(up){
            return reply.status(201).send({up})
        }
   }catch(error){
    return reply.status(404).send({error: "Funcionário não encontrado!"})
   }
}

export async function GetFuncionaries(request: FastifyRequest, reply: FastifyReply){
    try{
        await request.jwtVerify()
        
        const getFuncionary = await new FuncionaryModel().get()
        if(getFuncionary){
            return reply.status(201).send({getFuncionary})
        }
    }catch(error){
        return reply.status(404).send({error: "Não ah funcionários na plataforma"}) 
    }

}

export async function DeleteFuncionary(request: FastifyRequest, reply: FastifyReply){
    const validate = z.object({
        id: z.string()
    })

    const { id } = validate.parse(request.params)

    try{
        await request.jwtVerify()
        const FuncionaryDelete =  await new FuncionaryModel().Delete(id)
        if(FuncionaryDelete){
            return reply.status(201).send({FuncionaryDelete})
        }
    }catch(error){
        return reply.status(404).send({message: 'Funcionario não encontrado !'})
    }
}

export async function SearchFuncionary(request: FastifyRequest, reply: FastifyReply){
    const validate = z.object({
        id: z.string()
    })

    const { id } = validate.parse(request.params)

    try{
        await request.jwtVerify()
        const search = await new FuncionaryModel().search(id)
        if(search){
            return reply.status(201).send({search})
        }
    }catch(error){
        return reply.status(404).send({error: error})
    }
}
