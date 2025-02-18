import type { AnyPgColumn } from "drizzle-orm/pg-core"

import { sql, TransactionRollbackError } from "drizzle-orm"

import { db } from "./connect"

export function lower(value: AnyPgColumn) {
  return sql`lower(${value})`
}

type Transaction = Parameters<Parameters<typeof db.transaction>[0]>[0]

export function runTransaction<T>(
  callback: (tx: Transaction) => Promise<T>,
  {
    signal,
    database,
  }: {
    signal: AbortSignal
    database: typeof db
  }
) {
  return database.transaction(tx => {
    return new Promise((resolve, reject) => {
      if (signal.aborted) {
        reject(new TransactionRollbackError())
      }
      signal.addEventListener("abort", () => {
        reject(new TransactionRollbackError())
      })
      return callback(tx).then(resolve).catch(reject)
    })
  })
}
