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

// src/http/routes/event.ts
var event_exports = {};
__export(event_exports, {
  event: () => event
});
module.exports = __toCommonJS(event_exports);

// src/http/controllers/event.controller.ts
var import_zod = require("zod");

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: ["query"]
});

// src/http/model/event.model.ts
var EventModel = class {
  async create(data) {
    return await prisma.events.create({
      data: {
        name: data.name,
        start_date: data.date,
        teams_id: data.teams_id,
        address_id: data.address_id,
        box_id: data.box_id,
        goods_id: data.goods_id
      }
    });
  }
  async get() {
    return await prisma.events.findMany({
      where: {
        status: {
          equals: true
        }
      }
    });
  }
  async update(id, data) {
    return await prisma.events.update({
      data,
      where: {
        id
      }
    });
  }
  async search(id) {
    return await prisma.events.findUnique({
      where: {
        id
      }
    });
  }
  async delete(id) {
    return await prisma.events.delete({
      where: {
        id
      }
    });
  }
  async getAll(id) {
    return await prisma.events.findUnique({
      where: {
        id
      },
      include: {
        address: {
          select: {
            address: true
          }
        },
        teams: {
          include: {
            Functionaries: {
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
    });
  }
};

// src/http/controllers/event.controller.ts
async function EventGetController(request, reply) {
  try {
    await request.jwtVerify();
    const events = await new EventModel().get();
    return reply.status(200).send({ events });
  } catch (error) {
    return reply.status(404).send({ error });
  }
}
async function EventUpdateController(request, reply) {
  const validate = import_zod.z.object({
    id: import_zod.z.string()
  });
  const { id } = validate.parse(request.params);
  try {
    await request.jwtVerify();
    const up = await new EventModel().update(id, request.body);
    return reply.status(201).send({ up });
  } catch (error) {
    return reply.status(400).send({ error });
  }
}
async function EventCreateController(request, reply) {
  const validate = import_zod.z.object({
    name: import_zod.z.string(),
    start_date: import_zod.z.string(),
    teams_id: import_zod.z.string(),
    address_id: import_zod.z.string(),
    box_id: import_zod.z.string(),
    goods_id: import_zod.z.string()
  });
  const data = validate.parse(request.body);
  try {
    await request.jwtVerify();
    const create = await new EventModel().create(data);
    return reply.status(201).send({ create });
  } catch (error) {
    return reply.status(400).send({ error });
  }
}
async function EventGetAllController(request, reply) {
  const validate = import_zod.z.object({
    id: import_zod.z.string()
  });
  const { id } = validate.parse(request.params);
  try {
    await request.jwtVerify();
    const search = await new EventModel().getAll(id);
    return reply.status(200).send({ search });
  } catch (error) {
    return reply.status(400).send({ error });
  }
}

// src/http/routes/event.ts
async function event(app) {
  app.get("/", EventGetController);
  app.get("/:id", EventGetAllController);
  app.post("/", EventCreateController);
  app.put("/:id", EventUpdateController);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  event
});
