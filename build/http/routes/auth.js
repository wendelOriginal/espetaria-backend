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

// src/http/routes/auth.ts
var auth_exports = {};
__export(auth_exports, {
  auth: () => auth
});
module.exports = __toCommonJS(auth_exports);

// src/http/controllers/auth.controller.ts
var import_zod = require("zod");

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: ["query"]
});

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
var import_bcryptjs = require("bcryptjs");
async function AuthController(request, reply) {
  const validate = import_zod.z.object({
    phone: import_zod.z.string(),
    password: import_zod.z.string()
  });
  const { phone, password } = validate.parse(request.body);
  try {
    const user = await new AuthModel().auth(phone);
    if (user) {
      if (await (0, import_bcryptjs.compare)(password, user.password_hash)) {
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
async function auth(app) {
  app.post("/", AuthController);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  auth
});
