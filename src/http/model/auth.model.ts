import { prisma } from "@/lib/prisma";

export class AuthModel{
    async auth(phone: string){
        return await prisma.functionaries.findUnique({
            where: {
                phone
            },
            select:{
                id: true,
                active:true,
                password_hash:true
            }
        })
    }
}