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

// src/http/routes/goods.ts
var goods_exports = {};
__export(goods_exports, {
  goods: () => goods
});
module.exports = __toCommonJS(goods_exports);

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: ["query"]
});

// src/http/model/goods.model.ts
var GoodModel = class {
  async get() {
    return await prisma.goods.findMany();
  }
  async create(data) {
    return await prisma.goods.create({
      data: {
        name: data.name,
        description: data.description,
        value: data.value,
        amount: data.amount,
        categoryId: data.categoryId
      }
    });
  }
  async updateGood(id, data) {
    return await prisma.goods.update({
      data,
      where: {
        id
      }
    });
  }
  async deleteGood(id) {
    return await prisma.goods.delete({
      where: {
        id
      }
    });
  }
  async search(id) {
    return await prisma.goods.findUnique({
      where: {
        id
      }
    });
  }
};

// src/http/controllers/goods.controller.ts
var import_zod = require("zod");
async function GoodsGetController(request, reply) {
  try {
    await request.jwtVerify();
    const data = await new GoodModel().get();
    if (data) {
      return reply.status(200).send({ data });
    }
  } catch (error) {
    return reply.status(404).send({
      error
    });
  }
}
async function GoodsCreateController(request, reply) {
  const validate = import_zod.z.object({
    name: import_zod.z.string(),
    description: import_zod.z.string(),
    value: import_zod.z.number(),
    amount: import_zod.z.number(),
    categoryId: import_zod.z.string()
  });
  const data = validate.parse(request.body);
  try {
    await request.jwtVerify();
    const created = await new GoodModel().create(data);
    if (created) {
      return reply.status(200).send({ created });
    }
  } catch (error) {
    return reply.status(400).send({
      error
    });
  }
}
async function GoodUpdateController(request, reply) {
  const validate = import_zod.z.object({
    id: import_zod.z.string()
  });
  const { id } = validate.parse(request.body);
  try {
    await request.jwtVerify();
    const up = await new GoodModel().updateGood(id, request.body);
    if (up) {
      return reply.status(200).send({
        up
      });
    }
  } catch (error) {
    return reply.status(400).send({ error });
  }
}
async function GoodDeleteController(request, reply) {
  const validate = import_zod.z.object({
    id: import_zod.z.string()
  });
  const { id } = validate.parse(request.params);
  try {
    await request.jwtVerify();
    const deleteReply = await new GoodModel().deleteGood(id);
    if (deleteReply) {
      return reply.status(200).send({ deleteReply });
    }
  } catch (error) {
    return reply.status(400).send({ error });
  }
}
async function GoodSearchController(request, reply) {
  const validate = import_zod.z.object({
    id: import_zod.z.string()
  });
  const { id } = validate.parse(request.params);
  try {
    await request.jwtVerify();
    const search = await new GoodModel().search(id);
    if (search) {
      return reply.status(200).send({ search });
    }
  } catch (error) {
    return reply.status(400).send({ error });
  }
}

// src/http/routes/goods.ts
async function goods(app) {
  app.get("/", GoodsGetController);
  app.post("/", GoodsCreateController);
  app.get("/:id", GoodSearchController);
  app.put("/:id", GoodUpdateController);
  app.delete("/:id", GoodDeleteController);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  goods
});
