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

// src/http/model/goods.model.ts
var goods_model_exports = {};
__export(goods_model_exports, {
  GoodModel: () => GoodModel
});
module.exports = __toCommonJS(goods_model_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GoodModel
});
