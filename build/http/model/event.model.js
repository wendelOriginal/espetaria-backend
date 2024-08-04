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

// src/http/model/event.model.ts
var event_model_exports = {};
__export(event_model_exports, {
  EventModel: () => EventModel
});
module.exports = __toCommonJS(event_model_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EventModel
});
