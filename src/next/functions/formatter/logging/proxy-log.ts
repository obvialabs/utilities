import type { NextRequest } from "next/server"
import kleur from "kleur"

/**
 * Format a proxy log message with timestamp and request details
 *
 * **Parameters**
 * - `name` – Proxy name
 * - `request` – Incoming next.js request object
 * - `context` – Parsed request metadata (e.g. domain, path)
 *
 * **Usage**
 * ```ts
 * import { proxyLog } from "@obvia/utilities"
 *
 * // Log a proxy request with domain and path
 * proxyLog({
 *   name: "my-middleware",
 *   request,
 *   context: { domain: "example.com", path: "/api" }
 * })
 * ```
 */
export function proxyLog({
  name,
  request,
  context,
}: {
  name: string
  request: NextRequest
  context?: any
}) {
  // Timestamp
  const time = new Date().toLocaleString()

  // Domain
  const domain = context.domain || context.headers.get('x-middleware-request-host')

  console.log(
    // Timestamp + Tag
    kleur.gray(`[${time}]`) + " " + kleur.cyan().bold("[Proxy]") + " " +
    // Middleware
    kleur.yellow().bold(name) + " → " +
    // Method
    `Method = ${kleur.green().bold(request.method)} | ` +
    // Domain
    `Domain = ${kleur.magenta(domain)} | ` +
    // Path
    `Path = ${kleur.blue().bold(request.nextUrl?.pathname ?? "")} ` +
    // Rewrite
    `→ (${kleur.gray(`${context.domain || ""}${context.path == "/" ? "" : context.path || "-"}`)})`
  )
}
