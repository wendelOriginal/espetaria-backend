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

// src/http/model/sales.Model.ts
var sales_Model_exports = {};
__export(sales_Model_exports, {
  SalesModel: () => SalesModel
});
module.exports = __toCommonJS(sales_Model_exports);

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: ["query"]
});

// src/http/model/sales.Model.ts
var SalesModel = class {
  async create(date) {
    return await prisma.sales.create({
      data: {
        client: date.client,
        payment: date.payment,
        total: date.total,
        create_at: date.date,
        Box_has_Sales: {
          connect: {
            box_id: date.box_id
          }
        },
        Sales_has_Goods: {
          create: {
            goods_id: date.goods_id
          }
        },
        functionaries: {
          connect: {
            id: date.id
          }
        }
      }
    });
  }
  async get() {
    return await prisma.sales.findMany({
      select: {
        command: true,
        client: true,
        payment: true,
        total: true,
        create_at: true
      }
    });
  }
  async update(id, data) {
    return await prisma.sales.update({
      data,
      where: {
        id
      }
    });
  }
  async findUnique(id) {
    return await prisma.sales.findUnique({
      select: {
        command: true,
        client: true,
        payment: true,
        total: true,
        Sales_has_Goods: {
          select: {
            goods: true
          }
        },
        create_at: true
      },
      where: {
        id
      }
    });
  }
  async delete(id) {
    return await prisma.sales.delete({
      where: {
        id
      }
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SalesModel
});
