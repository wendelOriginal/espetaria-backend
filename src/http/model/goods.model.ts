import { prisma } from "@/lib/prisma";
interface Create{
         name: string,
        description: string,
        value: number,
        amount: number,
        categoryId: string
}
export class GoodModel{
    async get(){
        return await prisma.goods.findMany()
    }

    async create(data: Create){
        return await prisma.goods.create({
            data:{
                name: data.name,
                description: data.description,
                value: data.value,
                amount: data.amount,
                categoryId: data.categoryId
            }
        })
    }


    async updateGood(id: string, data: any){
        return await prisma.goods.update({
            data,
            where:{
                id
            }
        })
    }

    async deleteGood(id: string){
        return await prisma.goods.delete({
            where:{
                id
            }
        })
    }

    async search (id: string){
        return await prisma.goods.findUnique({
            where:{
                id
            }
        })
    }
}