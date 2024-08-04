import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { AuthModel } from "../model/auth.model";
import { compare } from "bcryptjs";


export async function AuthController(request: FastifyRequest, reply: FastifyReply){
    const validate = z.object({
        phone: z.string(),
        password: z.string()

    })

    const {phone, password} = validate.parse(request.body)

    try{
        const user = await new AuthModel().auth(phone)
        if(user){
            if(await compare(password, user.password_hash)){
            if(user.active === true){

              return reply.jwtSign({},
                {
                    sign: {
                        sub: user.id
                    }
                }
              )
                }
            }
        }
        return reply.status(400).send({message: "Verifique suas credenciais"})
    
    }catch(error){
        return reply.status(400).send({error})
    }

}
