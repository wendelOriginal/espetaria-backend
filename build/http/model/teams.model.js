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

// src/http/model/teams.model.ts
var teams_model_exports = {};
__export(teams_model_exports, {
  TeamsModel: () => TeamsModel
});
module.exports = __toCommonJS(teams_model_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TeamsModel
});
