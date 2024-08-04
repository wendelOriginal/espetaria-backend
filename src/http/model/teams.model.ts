import { prisma } from "@/lib/prisma";
type Create = {
    name:string;
}

export class TeamsModel{
    async get(){
        return await prisma.teams.findMany()
    }

    async findUnique(name: string){
        return prisma.teams.findUnique({
            where: {
                name,
                Functionaries:{

                }
            }
        })
    }

    async findRelation(id: string){
        return prisma.teams.findMany({
            where:{
                id
            },
            include:{
                Functionaries:{
                    select:{
                        name: true,
                        phone: true
                    }
                }
            }
          
        })
        
    }

    async create(data:Create){
        return await prisma.teams.create({data})
    }

    async delete(id: string){
        return await prisma.teams.delete({
          where:{
            id
          }
        })
        
    }

    async update(id: string, data: any){
        return await prisma.teams.update({
            data,
            where:{
                id
            }
        })
    }



}