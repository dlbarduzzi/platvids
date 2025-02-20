import { encodeBase32LowerCaseNoPadding } from "@oslojs/encoding"

export function generateRandomString() {
  const bytes = new Uint8Array(20)
  crypto.getRandomValues(bytes)
  return encodeBase32LowerCaseNoPadding(bytes)
}
