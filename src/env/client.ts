import { z } from "zod"
import { createEnv } from "@t3-oss/env-nextjs"

export const env = createEnv({
  client: {
    NEXT_PUBLIC_APP_URL: z.string().url(),
    NEXT_PUBLIC_APP_EMAIL_SUPPORT: z.string().email(),
  },
  onValidationError: issues => {
    console.error("❌ Invalid client environment variables ❌", issues)
    // eslint-disable-next-line n/no-process-exit
    process.exit(1)
  },
  runtimeEnv: {
    /* eslint-disable n/no-process-env */
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_APP_EMAIL_SUPPORT: process.env.NEXT_PUBLIC_APP_EMAIL_SUPPORT,
    /* eslint-enable n/no-process-env */
  },
  emptyStringAsUndefined: true,
})
