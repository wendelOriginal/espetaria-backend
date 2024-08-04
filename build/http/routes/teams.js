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

// src/http/routes/teams.ts
var teams_exports = {};
__export(teams_exports, {
  teams: () => teams
});
module.exports = __toCommonJS(teams_exports);

// src/http/controllers/teams.controller.ts
var import_zod = require("zod");

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: ["query"]
});

// src/http/model/teams.model.ts
var TeamsModel = class {
  async get() {
    return await prisma.teams.findMany();
  }
  async findUnique(name) {
    return prisma.teams.findUnique({
      where: {
        name,
        Functionaries: {}
      }
    });
  }
  async findRelation(id) {
    return prisma.teams.findMany({
      where: {
        id
      },
      include: {
        Functionaries: {
          select: {
            name: true,
            phone: true
          }
        }
      }
    });
  }
  async create(data) {
    return await prisma.teams.create({ data });
  }
  async delete(id) {
    return await prisma.teams.delete({
      where: {
        id
      }
    });
  }
  async update(id, data) {
    return await prisma.teams.update({
      data,
      where: {
        id
      }
    });
  }
};

// src/http/controllers/teams.controller.ts
async function TeamsCreateController(request, reply) {
  const validate = import_zod.z.object({
    name: import_zod.z.string()
  });
  const { name } = validate.parse(request.body);
  const verifyTeam = await new TeamsModel().findUnique(name);
  if (verifyTeam) {
    return reply.status(409).send({ error: "Nome do time j\xE1 existe" });
  }
  try {
    const createTeam = await new TeamsModel().create({ name });
    if (createTeam) {
      return reply.status(201).send({ createTeam });
    }
    return reply.status(500).send();
  } catch (error) {
    return reply.status(404).send();
  }
}
async function TeamsGetController(request, reply) {
  try {
    await request.jwtVerify();
    const teams2 = await new TeamsModel().get();
    return reply.status(201).send({ teams: teams2 });
  } catch (error) {
    return reply.status(404).send({ error });
  }
}
async function TeamsUpdateController(request, reply) {
  const validate = import_zod.z.object({
    id: import_zod.z.string()
  });
  const { id } = validate.parse(request.params);
  try {
    await request.jwtVerify();
    const update = await new TeamsModel().update(id, request.body);
    if (update) {
      return reply.status(201).send({ update });
    }
  } catch (error) {
    return reply.status(404).send({ error: "Time n\xE3o encontrado!" });
  }
}
async function TeamsGetFindController(request, reply) {
  const validate = import_zod.z.object({
    id: import_zod.z.string()
  });
  const { id } = validate.parse(request.params);
  try {
    await request.jwtVerify();
    const find = await new TeamsModel().findRelation(id);
    if (find) {
      return reply.status(201).send({ find });
    }
  } catch (error) {
    return reply.status(404).send({ error });
  }
}
async function TeamsDeleteController(request, reply) {
  const validate = import_zod.z.object({
    id: import_zod.z.string()
  });
  const { id } = validate.parse(request.params);
  try {
    await request.jwtVerify();
    const deleteTeams = await new TeamsModel().delete(id);
    if (deleteTeams) {
      return reply.status(201).send({ deleteTeams });
    }
  } catch (error) {
    return reply.status(404).send({ error });
  }
}

// src/http/routes/teams.ts
async function teams(app) {
  app.post("/", TeamsCreateController);
  app.get("/", TeamsGetController);
  app.put("/:id", TeamsUpdateController);
  app.get("/:id", TeamsGetFindController);
  app.delete("/:id", TeamsDeleteController);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  teams
});
