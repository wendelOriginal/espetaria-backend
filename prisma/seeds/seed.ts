import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()
 async function main (){
        
        await prisma.functionaries.createMany({
            data:[
                {
                    name: "valentinna",
                    phone: "61427854",
                    password_hash: "61427856",
                    teams_id:"bd8d82f7-cd99-491b-9b95-821b3ceec6e9"
                },
                {
                    name: "mateo",
                    phone: "61427855",
                    password_hash: "61427858",
                    teams_id:"bd8d82f7-cd99-491b-9b95-821b3ceec6e9"
                },
                {
                    name: "fernanda",
                    phone: "61427857",
                    password_hash: "61427858",
                    teams_id:"bd8d82f7-cd99-491b-9b95-821b3ceec6e9"
                },
                {
                    name: "vwendel",
                    phone: "61427858",
                    password_hash: "61427858",
                    teams_id:"bd8d82f7-cd99-491b-9b95-821b3ceec6e9"
                }
            ]
        })


        await prisma.goods.createMany({
            data: [
                {
                    name: "carne",
                    description: "Espetos deliciosos feitos na hora.",
                    amount: 0,
                    value: 12,
                    categoryId: "61f291a5-c083-4d5a-b926-516809fc8e14"
                },
                {
                    name: "frango",
                    description: "Espetos deliciosos feitos na hora.",
                    amount: 0,
                    value: 12,
                    categoryId: "61f291a5-c083-4d5a-b926-516809fc8e14"
                },
                {
                    name: "linguiça",
                    description: "Espetos deliciosos feitos na hora.",
                    amount: 0,
                    value: 12,
                    categoryId: "61f291a5-c083-4d5a-b926-516809fc8e14"
                },
                {
                    name: "queijo qualio",
                    description: "Espetos deliciosos feitos na hora.",
                    amount: 0,
                    value: 12,
                    categoryId: "61f291a5-c083-4d5a-b926-516809fc8e14"
                },
                {
                    name: "kafta",
                    description: "Espetos deliciosos feitos na hora.",
                    amount: 0,
                    value: 12,
                    categoryId: "61f291a5-c083-4d5a-b926-516809fc8e14"
                },
                {
                    name: "coração de galinha",
                    description: "Espetos deliciosos feitos na hora.",
                    amount: 0,
                    value: 12,
                    categoryId: "61f291a5-c083-4d5a-b926-516809fc8e14"
                },
                {
                    name: "medalhão bolvino",
                    description: "Espetos deliciosos feitos na hora.",
                    amount: 0,
                    value: 12,
                    categoryId: "61f291a5-c083-4d5a-b926-516809fc8e14"
                },
                {
                    name: "medalhão de frango",
                    description: "Espetos deliciosos feitos na hora.",
                    amount: 0,
                    value: 12,
                    categoryId: "61f291a5-c083-4d5a-b926-516809fc8e14"
                },
                {
                    name: "pão de alho",
                    description: "Espetos deliciosos feitos na hora.",
                    amount: 0,
                    value: 12,
                    categoryId: "61f291a5-c083-4d5a-b926-516809fc8e14"
                },
            ]
        })

        await prisma.box.create({
            data:{
                type: "dinheiro",
                total: 50
            }
        })
 }

 main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })