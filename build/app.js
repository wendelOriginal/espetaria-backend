"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/app.ts
var app_exports = {};
__export(app_exports, {
  app: () => app
});
module.exports = __toCommonJS(app_exports);
var import_fastify = __toESM(require("fastify"));
var import_zod8 = require("zod");

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
async function funcionary(app2) {
  app2.post("/", CreateFuncionaryController);
  app2.put("/:id", UpdateInformationFuncionary);
  app2.get("/", GetFuncionaries);
  app2.get("/:id", SearchFuncionary);
  app2.delete("/:id", DeleteFuncionary);
}

// src/http/controllers/teams.controller.ts
var import_zod2 = require("zod");

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
  const validate = import_zod2.z.object({
    name: import_zod2.z.string()
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
  const validate = import_zod2.z.object({
    id: import_zod2.z.string()
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
  const validate = import_zod2.z.object({
    id: import_zod2.z.string()
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
  const validate = import_zod2.z.object({
    id: import_zod2.z.string()
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
async function teams(app2) {
  app2.post("/", TeamsCreateController);
  app2.get("/", TeamsGetController);
  app2.put("/:id", TeamsUpdateController);
  app2.get("/:id", TeamsGetFindController);
  app2.delete("/:id", TeamsDeleteController);
}

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

// src/http/controllers/goods.controller.ts
var import_zod3 = require("zod");
async function GoodsGetController(request, reply) {
  try {
    await request.jwtVerify();
    const data = await new GoodModel().get();
    if (data) {
      return reply.status(200).send({ data });
    }
  } catch (error) {
    return reply.status(404).send({
      error
    });
  }
}
async function GoodsCreateController(request, reply) {
  const validate = import_zod3.z.object({
    name: import_zod3.z.string(),
    description: import_zod3.z.string(),
    value: import_zod3.z.number(),
    amount: import_zod3.z.number(),
    categoryId: import_zod3.z.string()
  });
  const data = validate.parse(request.body);
  try {
    await request.jwtVerify();
    const created = await new GoodModel().create(data);
    if (created) {
      return reply.status(200).send({ created });
    }
  } catch (error) {
    return reply.status(400).send({
      error
    });
  }
}
async function GoodUpdateController(request, reply) {
  const validate = import_zod3.z.object({
    id: import_zod3.z.string()
  });
  const { id } = validate.parse(request.body);
  try {
    await request.jwtVerify();
    const up = await new GoodModel().updateGood(id, request.body);
    if (up) {
      return reply.status(200).send({
        up
      });
    }
  } catch (error) {
    return reply.status(400).send({ error });
  }
}
async function GoodDeleteController(request, reply) {
  const validate = import_zod3.z.object({
    id: import_zod3.z.string()
  });
  const { id } = validate.parse(request.params);
  try {
    await request.jwtVerify();
    const deleteReply = await new GoodModel().deleteGood(id);
    if (deleteReply) {
      return reply.status(200).send({ deleteReply });
    }
  } catch (error) {
    return reply.status(400).send({ error });
  }
}
async function GoodSearchController(request, reply) {
  const validate = import_zod3.z.object({
    id: import_zod3.z.string()
  });
  const { id } = validate.parse(request.params);
  try {
    await request.jwtVerify();
    const search = await new GoodModel().search(id);
    if (search) {
      return reply.status(200).send({ search });
    }
  } catch (error) {
    return reply.status(400).send({ error });
  }
}

// src/http/routes/goods.ts
async function goods(app2) {
  app2.get("/", GoodsGetController);
  app2.post("/", GoodsCreateController);
  app2.get("/:id", GoodSearchController);
  app2.put("/:id", GoodUpdateController);
  app2.delete("/:id", GoodDeleteController);
}

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
var import_zod4 = require("zod");
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
  const validate = import_zod4.z.object({
    type: import_zod4.z.string(),
    total: import_zod4.z.number()
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
async function BoxSearchController(request, reply) {
  const validate = import_zod4.z.object({
    id: import_zod4.z.string()
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

// src/http/routes/box.ts
async function box(app2) {
  app2.get("/", BoxGetController);
  app2.post("/", BoxPostController);
  app2.get("/:id", BoxSearchController);
}

// src/http/controllers/event.controller.ts
var import_zod5 = require("zod");

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
  const validate = import_zod5.z.object({
    id: import_zod5.z.string()
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
  const validate = import_zod5.z.object({
    name: import_zod5.z.string(),
    start_date: import_zod5.z.string(),
    teams_id: import_zod5.z.string(),
    address_id: import_zod5.z.string(),
    box_id: import_zod5.z.string(),
    goods_id: import_zod5.z.string()
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
  const validate = import_zod5.z.object({
    id: import_zod5.z.string()
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
async function event(app2) {
  app2.get("/", EventGetController);
  app2.get("/:id", EventGetAllController);
  app2.post("/", EventCreateController);
  app2.put("/:id", EventUpdateController);
}

// src/http/controllers/auth.controller.ts
var import_zod6 = require("zod");

// src/http/model/auth.model.ts
var AuthModel = class {
  async auth(phone) {
    return await prisma.functionaries.findUnique({
      where: {
        phone
      },
      select: {
        id: true,
        active: true,
        password_hash: true
      }
    });
  }
};

// src/http/controllers/auth.controller.ts
var import_bcryptjs2 = require("bcryptjs");
async function AuthController(request, reply) {
  const validate = import_zod6.z.object({
    phone: import_zod6.z.string(),
    password: import_zod6.z.string()
  });
  const { phone, password } = validate.parse(request.body);
  try {
    const user = await new AuthModel().auth(phone);
    if (user) {
      if (await (0, import_bcryptjs2.compare)(password, user.password_hash)) {
        if (user.active === true) {
          return reply.jwtSign(
            {},
            {
              sign: {
                sub: user.id
              }
            }
          );
        }
      }
    }
    return reply.status(400).send({ message: "Verifique suas credenciais" });
  } catch (error) {
    return reply.status(400).send({ error });
  }
}

// src/http/routes/auth.ts
async function auth(app2) {
  app2.post("/", AuthController);
}

// src/app.ts
var import_jwt = __toESM(require("@fastify/jwt"));

// src/env/index.ts
var import_config = require("dotenv/config");
var import_zod7 = require("zod");
var envSchema = import_zod7.z.object({
  NODE_ENV: import_zod7.z.string(),
  PORT: import_zod7.z.coerce.number().default(3333),
  HOST: import_zod7.z.coerce.string(),
  SECRET: import_zod7.z.string()
});
var _env = envSchema.parse(process.env);
var env = _env;

// src/app.ts
var app = (0, import_fastify.default)();
app.register(import_jwt.default, {
  secret: env.SECRET
});
app.register(funcionary, {
  prefix: "funcionary"
});
app.register(auth, {
  prefix: "auth"
});
app.register(
  teams,
  {
    prefix: "teams"
  }
);
app.register(goods, {
  prefix: "goods"
});
app.register(box, {
  prefix: "box"
});
app.register(event, {
  prefix: "event"
});
app.setErrorHandler((error, _, reply) => {
  if (error instanceof import_zod8.ZodError) {
    return reply.status(400).send({ issues: error.format() });
  }
  return reply.status(500).send(error);
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  app
});
