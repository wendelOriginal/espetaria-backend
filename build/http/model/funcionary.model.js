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

// src/http/model/funcionary.model.ts
var funcionary_model_exports = {};
__export(funcionary_model_exports, {
  FuncionaryModel: () => FuncionaryModel
});
module.exports = __toCommonJS(funcionary_model_exports);

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: ["query"]
});

// src/http/model/funcionary.model.ts
var FuncionaryModel = class {
  async get() {
    return await prisma.functionaries.findMany({
      select: {
        id: true,
        name: true,
        phone: true,
        active: true,
        create_at: true
      }
    });
  }
  async create(data) {
    const { name, phone, password_hash, teams_id } = data;
    return await prisma.functionaries.create({
      data: {
        name,
        phone,
        password_hash,
        teams_id
      }
    });
  }
  async put(id, data) {
    const verify = await prisma.functionaries.update({
      data,
      where: {
        id
      }
    });
    return verify;
  }
  async search(id) {
    return await prisma.functionaries.findUnique({
      where: {
        id
      }
    });
  }
  async findUnique(data) {
    return await prisma.functionaries.findUnique({
      where: {
        phone: data
      }
    });
  }
  async Delete(id) {
    return await prisma.functionaries.delete({
      where: {
        id
      }
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FuncionaryModel
});
