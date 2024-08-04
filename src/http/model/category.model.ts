import { prisma } from "@/lib/prisma";

export class CategoryModel{
    async create(data: any){
        return await prisma.category.create({
            data
        })
    }

    async put(id: string, data: any){
        return await prisma.category.update({
            data,
            where:{
                id
            }
        })
    }


    async get(){
        return await prisma.category.findMany({
            include: {
                Goods: true
            }
        })
    }
}