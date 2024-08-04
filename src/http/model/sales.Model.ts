import { prisma } from "@/lib/prisma";

export class SalesModel{
    async create(date: any){
        return await prisma.sales.create({
            data:{         
                client: date.client,
                payment: date.payment,
                total: date.total,
                create_at: date.date,
                Box_has_Sales:{
                    connect:{
                        box_id: date.box_id
                    }
                },
                Sales_has_Goods:{
                    create:{
                        goods_id: date.goods_id
                    }
                },
                functionaries:{
                    connect:{
                        id: date.id
                    }
                }

            }
        })
    }

    async get(){
        return await prisma.sales.findMany({
          select:{
            command: true,
            client: true,
            payment: true,
            total: true,
            create_at: true
          }
        })
    }


    async update(id: string, data: any){
        return await prisma.sales.update({
            data,
            where:{
                id
            }
        })
    }

    async findUnique(id: string){
        return await prisma.sales.findUnique({
          select:{
            command: true,
            client: true,
            payment: true,
            total: true,
            Sales_has_Goods:{
                select:{
                    goods: true
                }
            },
            create_at: true
          },
          where:{
            id
          }
        })
    }

    async delete(id: string){
        return await prisma.sales.delete({
            where: {
                id
            }
        })
    }
 
}