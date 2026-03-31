import kleur from "kleur"

/**
 * Log script activity with formatted output
 *
 * **Parameters**
 * - `name` – The name of the script or task
 * - `action` – The action being performed (e.g. "Insert", "Delete", "Seed")
 * - `message` – Optional message to append at the end
 *
 * **Usage**
 * ```ts
 * // Log a seeding operation
 * scriptLog({
 *   name: "SeedUsers",
 *   action: "Insert",
 *   message: "Created 10 users successfully"
 * })
 * ```
 */
export function scriptLog({
  name,
  action,
  message,
}: {
  name: string
  action: string
  message?: string
}) {
  // Timestamp
  const time = new Date().toLocaleString()

  console.log(
    // Timestamp + Tag
    kleur.gray(`[${time}]`) + " " + kleur.cyan().bold("[Script]") + " " +
    // Script name
    kleur.yellow().bold(name) + " → " +
    // Action
    `Action = ${kleur.green().bold(action)} → ` +
    // Message
    `${kleur.gray(message ?? '')}`
  )
}
