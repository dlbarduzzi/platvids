import type { StandardSchemaV1 } from "@t3-oss/env-core"

import { z } from "zod"
import { createEnv } from "@t3-oss/env-nextjs"

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "production"]),
    GITHUB_CLIENT_ID: z.string(),
    GITHUB_CLIENT_SECRET: z.string(),
    DB_HOST: z.string(),
    DB_NAME: z.string(),
    DB_USER: z.string(),
    DB_PASS: z.string(),
    DB_PORT: z.coerce.number(),
    DATABASE_URL: z.string().url(),
    DB_MIGRATING: z
      .string()
      .refine(s => s === "true" || s === "false")
      .transform(s => s === "true")
      .optional(),
  },
  onValidationError: (issues: readonly StandardSchemaV1.Issue[]) => {
    console.error("❌ Invalid server environment variables ❌", issues)
    // eslint-disable-next-line n/no-process-exit
    process.exit(1)
  },
  runtimeEnv: {
    /* eslint-disable n/no-process-env */
    NODE_ENV: process.env.NODE_ENV,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    DATABASE_URL: process.env.DATABASE_URL,
    DB_MIGRATING: process.env.DB_MIGRATING,
    /* eslint-enable n/no-process-env */
  },
  emptyStringAsUndefined: true,
  /* eslint-disable-next-line n/no-process-env */
  skipValidation: process.env.SKIP_ENV_VALIDATIONS === "true",
})
