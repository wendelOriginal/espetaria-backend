import { prisma } from "@/lib/prisma";

interface Create{
    type: string,
    total: number
}


export class BoxModel{
    async get(){
        return await prisma.box.findMany()
    }

    async post(data: Create){
        return await prisma.box.create({
            data
        })
    }

    async search(id: string){
        return await prisma.box.findUnique({
            where:{

                id
            }
        })
    }

    async update(id: string, data: any){
        return await prisma.box.update({
            data,
            where:{
                id
            }
        })
    }
}