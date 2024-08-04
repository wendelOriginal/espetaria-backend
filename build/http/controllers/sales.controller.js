"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/http/controllers/sales.controller.ts
var sales_controller_exports = {};
__export(sales_controller_exports, {
  SalesCreateController: () => SalesCreateController,
  SalesDeleteController: () => SalesDeleteController,
  SalesGetController: () => SalesGetController,
  SalesPutController: () => SalesPutController,
  SalesSearchController: () => SalesSearchController
});
module.exports = __toCommonJS(sales_controller_exports);
var import_zod = require("zod");

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: ["query"]
});

// src/http/model/sales.Model.ts
var SalesModel = class {
  async create(date) {
    return await prisma.sales.create({
      data: {
        client: date.client,
        payment: date.payment,
        total: date.total,
        create_at: date.date,
        Box_has_Sales: {
          connect: {
            box_id: date.box_id
          }
        },
        Sales_has_Goods: {
          create: {
            goods_id: date.goods_id
          }
        },
        functionaries: {
          connect: {
            id: date.id
          }
        }
      }
    });
  }
  async get() {
    return await prisma.sales.findMany({
      select: {
        command: true,
        client: true,
        payment: true,
        total: true,
        create_at: true
      }
    });
  }
  async update(id, data) {
    return await prisma.sales.update({
      data,
      where: {
        id
      }
    });
  }
  async findUnique(id) {
    return await prisma.sales.findUnique({
      select: {
        command: true,
        client: true,
        payment: true,
        total: true,
        Sales_has_Goods: {
          select: {
            goods: true
          }
        },
        create_at: true
      },
      where: {
        id
      }
    });
  }
  async delete(id) {
    return await prisma.sales.delete({
      where: {
        id
      }
    });
  }
};

// src/http/controllers/sales.controller.ts
async function SalesCreateController(request, reply) {
  const validate = import_zod.z.object({
    client: import_zod.z.string(),
    payment: import_zod.z.coerce.number(),
    total: import_zod.z.coerce.number(),
    create_at: import_zod.z.string(),
    box_id: import_zod.z.string(),
    good_id: import_zod.z.string(),
    functionary_id: import_zod.z.string()
  });
  const data = validate.parse(request.body);
  try {
    const command = await new SalesModel().create(data);
    return reply.status(201).send({
      command
    });
  } catch (error) {
    return reply.status(400).send({ error });
  }
}
async function SalesPutController(request, reply) {
  const validate = import_zod.z.object({
    id: import_zod.z.string()
  });
  const { id } = validate.parse(request.params);
  try {
    const command = await new SalesModel().update(id, request.body);
    return reply.status(201).send({
      command
    });
  } catch (error) {
    return reply.status(400).send({ error });
  }
}
async function SalesGetController(request, reply) {
  try {
    const command = await new SalesModel().get();
    return reply.status(200).send({
      command
    });
  } catch (error) {
    return reply.status(400).send({ error });
  }
}
async function SalesDeleteController(request, reply) {
  const validate = import_zod.z.object({
    id: import_zod.z.string()
  });
  const { id } = validate.parse(request.params);
  try {
    const command = await new SalesModel().delete(id);
    return reply.status(201).send({
      command
    });
  } catch (error) {
    return reply.status(400).send({ error });
  }
}
async function SalesSearchController(request, reply) {
  const validate = import_zod.z.object({
    id: import_zod.z.string()
  });
  const { id } = validate.parse(request.params);
  try {
    const command = await new SalesModel().findUnique(id);
    return reply.status(200).send({
      command
    });
  } catch (error) {
    return reply.status(400).send({ error });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SalesCreateController,
  SalesDeleteController,
  SalesGetController,
  SalesPutController,
  SalesSearchController
});
