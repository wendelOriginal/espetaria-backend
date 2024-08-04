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

// src/http/controllers/category.controller.ts
var category_controller_exports = {};
__export(category_controller_exports, {
  CategoryCreateController: () => CategoryCreateController,
  CategoryGetController: () => CategoryGetController,
  CategoryPutController: () => CategoryPutController
});
module.exports = __toCommonJS(category_controller_exports);

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: ["query"]
});

// src/http/model/category.model.ts
var CategoryModel = class {
  async create(data) {
    return await prisma.category.create({
      data
    });
  }
  async put(id, data) {
    return await prisma.category.update({
      data,
      where: {
        id
      }
    });
  }
  async get() {
    return await prisma.category.findMany({
      include: {
        Goods: true
      }
    });
  }
};

// src/http/controllers/category.controller.ts
var import_zod = require("zod");
async function CategoryGetController(request, reply) {
  try {
    await request.jwtVerify();
    const category = await new CategoryModel().get();
    return category;
  } catch (error) {
    return reply.status(404).send({ error });
  }
}
async function CategoryPutController(request, reply) {
  const validate = import_zod.z.object({
    id: import_zod.z.string()
  });
  const { id } = validate.parse(request.params);
  try {
    await request.jwtVerify();
    const category = await new CategoryModel().put(id, request.body);
    return category;
  } catch (error) {
    return reply.status(404).send({ error });
  }
}
async function CategoryCreateController(request, reply) {
  const validate = import_zod.z.object({
    name: import_zod.z.string()
  });
  const { name } = validate.parse(request.body);
  try {
    await request.jwtVerify();
    const category = await new CategoryModel().create(name);
    return category;
  } catch (error) {
    return reply.status(404).send({ error });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CategoryCreateController,
  CategoryGetController,
  CategoryPutController
});
