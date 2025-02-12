import postgres from "postgres"
import { drizzle } from "drizzle-orm/postgres-js"

import { env } from "@/env/server"
import * as schema from "./schemas"

const client = postgres(env.DATABASE_URL, {
  max: env.DB_MIGRATING ? 1 : undefined,
})

export const db = drizzle({ client, schema })
