import { prisma } from "@/lib/prisma";

type Create = {
    name:string;
    phone:string;
    password_hash: string;
    teams_id: string
}
export class FuncionaryModel{
    async get(){
        return await prisma.functionaries.findMany({
            select:{
                id: true,
                name: true,
                phone: true,
                active:true,
                create_at: true
            }
        })
    }

    async create(data: Create){
        const { name, phone, password_hash, teams_id} = data
        return await prisma.functionaries.create({
            data: {
                name,
                phone,
                password_hash,
                teams_id
                }
            
        })
    }

    async put(id: string, data: any){
        
        const verify = await prisma.functionaries.update({
            data,
            where: {
                id
            }
        })
        return verify
    }


    async search(id:string){
        return await prisma.functionaries.findUnique({
            where:{
                id
            }
        })
    }

    async findUnique(data: string){
        return await prisma.functionaries.findUnique({
            where: {
                phone: data
            }
        })
    }

    async Delete(id: string){
        return await prisma.functionaries.delete({
            where: {
                id
            }
        })
    }
}