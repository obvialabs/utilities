<b align="center">

  [![Version](https://img.shields.io/npm/v/@obvia/utilities?style=for-the-badge&logo=npm&labelColor=ff2949&color=e93146&logoColor=white&label=Version)](https://www.npmjs.com/package/@obvia/utilities)
  [![Typescript](https://img.shields.io/static/v1?message=5.9.3&style=for-the-badge&logo=typescript&labelColor=1886c9&color=0A66C2&logoColor=white&label=TypeScript)](https://www.typescriptlang.org/)
  [![Linting](https://img.shields.io/static/v1?message=Eslint&style=for-the-badge&logo=eslint&labelColor=eb6a3b&color=cc5c33&logoColor=white&label=Linting)](https://npmjs.com/package/@obvia/utilities)
  [![License](https://img.shields.io/static/v1?message=MIT&style=for-the-badge&logo=opensourceinitiative&labelColor=25D366&color=20bd5b&logoColor=white&label=License)](https://npmjs.com/package/@obvia/utilities)
  [![CI](https://img.shields.io/github/actions/workflow/status/obvialabs/utilities/publish.yml?style=for-the-badge&logo=githubactions&labelColor=161717&color=0f0f0f&logoColor=white&label=CI)](https://github.com/obvialabs/utilities/actions)

</b>

> Designed to provide consistent rules and configurations across projects with minimal setup.

Welcome to **Obvia Utilities** — a shared toolkit of foundational helpers that streamline everyday development across the Obvia ecosystem.
This package provides lightweight, reliable functions for class composition, variant handling, type‑safe utilities, and other common patterns.
It’s not meant to be a grab‑bag of random helpers, but a curated set of utilities that evolve alongside the ecosystem. If you want predictable,
modern building blocks for UI and logic, this package offers a solid foundation.

- Unified helpers → Consistent utilities for class merging, variant handling, and more
- Always modern → Continuously refined to match latest tailwind, typescript, and framework patterns
- Minimal setup → Drop‑in functions, no need to reinvent helpers
- Ecosystem alignment → Ensures every package and project follows the same conventions
- Onboarding‑friendly → Simplifies developer experience for new contributors

## Installation

All utilities are bundled in a single package — no need to install separate helpers for each project

```bash
pnpm add @obvia/utilities
```

## Quickstart

Choose the utilities package that matches your project and import it

```js
// Core → General utilities, constants, and formatters (minimal export)
import { cn } from "@obvia/utilities"

// React → Includes Core + React‑specific helpers (minimal export)
import { cn } from "@obvia/utilities/react"

// Next.js → Includes Core + React + Next‑specific helpers (minimal export)
import { cn } from "@obvia/utilities/next"

// Vue → Core + Vue‑specific helpers (minimal export)
import { cn } from "@obvia/utilities/vue"

// Nuxt → Core + Vue + Nuxt‑specific helpers (minimal export)
import { cn } from "@obvia/utilities/nuxt"
```

Each package provides minimal exports — only what’s needed for that environment. Framework‑specific packages (like React or Next.js) already include Core utilities internally, so you don’t need to import both.

## Roadmap

The roadmap shows both the **currently available utilities** and the **planned additions**

| Category  | Description                                                                | Path                       | Status      |
|-----------|----------------------------------------------------------------------------|----------------------------|-------------|
| **Core**  | Framework‑agnostic utilities, constants, and formatters                    | ``@obvia/utilities``       | 🔜 Planned  |
| **React** | Helpers tailored for React projects, JSX‑friendly utilities (SSR + client) | ``@obvia/utilities/react`` | 🔜 Planned  |
| **Next**  | Utilities optimized for Next.js applications, consistent in SSR + client   | ``@obvia/utilities/next``  | 🔜 Planned  |
| **Vue**   | Vue‑specific helpers, designed for both SSR and client rendering           | ``@obvia/utilities/vue``   | 🔜 Planned  |
| **Nuxt**  | Nuxt.js utilities, aligned for SSR + client usage                          | ``@obvia/utilities/nuxt``  | 🔜 Planned  |

## Security

If you think there is a security vulnerability in the **Utilities**, you can help resolve the
issue immediately by sending an e-mail to **Selçuk Çukur** at **<hello@selcukcukur.me>**. Please
do not publicly post security vulnerabilities.

## License

**Utilities** project is published as open source. The **[MIT License](License.md)** is used, which
is one of the well-known open source coding licenses. You can get detailed information about the license terms
by visiting the link below.

- **[MIT License](license.md)**
