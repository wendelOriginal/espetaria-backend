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

// src/http/model/box.model.ts
var box_model_exports = {};
__export(box_model_exports, {
  BoxModel: () => BoxModel
});
module.exports = __toCommonJS(box_model_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BoxModel
});
