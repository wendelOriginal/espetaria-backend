import { prisma } from "@/lib/prisma";


export class EventModel{
    async create(data: any){
        return await prisma.events.create({
            data: {
                name: data.name,
                start_date: data.date,
                teams_id: data.teams_id,
                address_id: data.address_id,
                box_id: data.box_id,
                goods_id: data.goods_id
            }
           
        })
    }

    async get(){
        return await prisma.events.findMany({
            where:{
                status:{
                    equals: true
                }
            }
        })
    }

    async update(id: string, data: any){
        return await prisma.events.update({
            data,
            where:{
                id
            }
        })
    }

    async search(id: string){
        return await prisma.events.findUnique({
            where:{
                id
            }
        })
    }

    async delete(id: string){
        return await prisma.events.delete({
            where:{
                id
            }
        })
    }

    async getAll(id: string){
        return await prisma.events.findUnique({
            where:{
                id
            },
            include:{
                address: {
                  select:{
                    address: true
                  }
                },
                teams: {
                    include:{
                        Functionaries:{
                            select: {
                                name: true,
                                phone: true
                            }
                        }
                    }
                },
                box: true,
                goods: true
            }
        })
    }
}