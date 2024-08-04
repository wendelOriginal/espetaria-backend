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

// src/http/routes/funcionary.ts
var funcionary_exports = {};
__export(funcionary_exports, {
  funcionary: () => funcionary
});
module.exports = __toCommonJS(funcionary_exports);

// src/http/controllers/funcionary.controller.ts
var import_zod = require("zod");

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

// src/http/controllers/funcionary.controller.ts
var import_bcryptjs = require("bcryptjs");
async function CreateFuncionaryController(request, reply) {
  const validate = import_zod.z.object({
    name: import_zod.z.string(),
    phone: import_zod.z.string(),
    password: import_zod.z.string(),
    teams_id: import_zod.z.string()
  });
  const { name, phone, password, teams_id } = validate.parse(request.body);
  const password_hash = await (0, import_bcryptjs.hash)(password, 6);
  try {
    const checkPhone = await new FuncionaryModel().findUnique(phone);
    if (checkPhone) {
      return reply.status(409).send({ error: "Telefone j\xE1 cadastrado!" });
    }
    const register = await new FuncionaryModel().create({
      name,
      phone,
      password_hash,
      teams_id
    });
    console.log(register);
    return reply.status(201).send({ register });
  } catch (error) {
    return;
  }
}
async function UpdateInformationFuncionary(request, reply) {
  const validate = import_zod.z.object({
    id: import_zod.z.string()
  });
  const { id } = validate.parse(request.params);
  const data = request.body;
  try {
    await request.jwtVerify();
    const up = await new FuncionaryModel().put(id, data);
    if (up) {
      return reply.status(201).send({ up });
    }
  } catch (error) {
    return reply.status(404).send({ error: "Funcion\xE1rio n\xE3o encontrado!" });
  }
}
async function GetFuncionaries(request, reply) {
  try {
    await request.jwtVerify();
    const getFuncionary = await new FuncionaryModel().get();
    if (getFuncionary) {
      return reply.status(201).send({ getFuncionary });
    }
  } catch (error) {
    return reply.status(404).send({ error: "N\xE3o ah funcion\xE1rios na plataforma" });
  }
}
async function DeleteFuncionary(request, reply) {
  const validate = import_zod.z.object({
    id: import_zod.z.string()
  });
  const { id } = validate.parse(request.params);
  try {
    await request.jwtVerify();
    const FuncionaryDelete = await new FuncionaryModel().Delete(id);
    if (FuncionaryDelete) {
      return reply.status(201).send({ FuncionaryDelete });
    }
  } catch (error) {
    return reply.status(404).send({ message: "Funcionario n\xE3o encontrado !" });
  }
}
async function SearchFuncionary(request, reply) {
  const validate = import_zod.z.object({
    id: import_zod.z.string()
  });
  const { id } = validate.parse(request.params);
  try {
    await request.jwtVerify();
    const search = await new FuncionaryModel().search(id);
    if (search) {
      return reply.status(201).send({ search });
    }
  } catch (error) {
    return reply.status(404).send({ error });
  }
}

// src/http/routes/funcionary.ts
async function funcionary(app) {
  app.post("/", CreateFuncionaryController);
  app.put("/:id", UpdateInformationFuncionary);
  app.get("/", GetFuncionaries);
  app.get("/:id", SearchFuncionary);
  app.delete("/:id", DeleteFuncionary);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  funcionary
});
