import "dotenv/config"
import { z } from 'zod'

const envSchema = z.object({
    NODE_ENV: z.string(),
    PORT: z.coerce.number().default(3333),
    HOST: z.coerce.string(),
    SECRET: z.string()
})
const _env = envSchema.parse(process.env)
 export const env = _env
