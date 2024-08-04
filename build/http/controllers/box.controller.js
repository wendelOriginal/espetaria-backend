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

// src/http/controllers/box.controller.ts
var box_controller_exports = {};
__export(box_controller_exports, {
  BoxGetController: () => BoxGetController,
  BoxPostController: () => BoxPostController,
  BoxSearchController: () => BoxSearchController,
  BoxUpdateController: () => BoxUpdateController
});
module.exports = __toCommonJS(box_controller_exports);

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: ["query"]
});

// src/http/model/box.model.ts
var BoxModel = class {
  async get() {
    return await prisma.box.findMany();
  }
  async post(data) {
    return await prisma.box.create({
      data
    });
  }
  async search(id) {
    return await prisma.box.findUnique({
      where: {
        id
      }
    });
  }
  async update(id, data) {
    return await prisma.box.update({
      data,
      where: {
        id
      }
    });
  }
};

// src/http/controllers/box.controller.ts
var import_zod = require("zod");
async function BoxGetController(request, reply) {
  try {
    await request.jwtVerify();
    const boxReply = await new BoxModel().get();
    if (boxReply) {
      reply.status(200).send({ boxReply });
    }
  } catch (error) {
    return reply.status(404).send({ error });
  }
}
async function BoxPostController(request, reply) {
  const validate = import_zod.z.object({
    type: import_zod.z.string(),
    total: import_zod.z.number()
  });
  const data = validate.parse(request.body);
  try {
    await request.jwtVerify();
    const boxReply = await new BoxModel().post(data);
    if (boxReply) {
      reply.status(200).send({ boxReply });
    }
  } catch (error) {
    return reply.status(404).send({ error });
  }
}
async function BoxUpdateController(request, reply) {
  const validate = import_zod.z.object({
    id: import_zod.z.string()
  });
  const { id } = validate.parse(request.params);
  try {
    await request.jwtVerify();
    const up = await new BoxModel().update(id, request.body);
    return reply.status(201).send({});
  } catch (error) {
    return reply.status(404).send({ error });
  }
}
async function BoxSearchController(request, reply) {
  const validate = import_zod.z.object({
    id: import_zod.z.string()
  });
  const { id } = validate.parse(request.params);
  try {
    await request.jwtVerify();
    const boxSearch = await new BoxModel().search(id);
    if (boxSearch) {
      reply.status(200).send({ boxSearch });
    }
  } catch (error) {
    return reply.status(404).send({ error });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BoxGetController,
  BoxPostController,
  BoxSearchController,
  BoxUpdateController
});
