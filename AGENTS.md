<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# hireloop-client

HireLoop job-portal client (seeker-facing part 1). Part 2 lives in the sibling `../hireloop-client-part2-Recruiter-dashboard`; the shared spec (Seeker/Recruiter/Admin roles, plans, dashboards) is `../Project requirements.md`; UI design source is `hireloop.fig` (Figma). Next.js 16 App Router + TypeScript + Tailwind 4 + shadcn/ui. This folder is **not** a git repo — no commit/PR workflow here.

## Commands

- `npm run dev` / `npm run build` / `npm run lint` / `npm run typecheck` / `npm run format` (prettier, ts/tsx only). No tests exist.
- **`typecheck` and `lint` pass while `build` fails** (see below) — `npm run build` is the only check that catches the missing auth deps. Run it to verify, not just `tsc`.

## Known broken state (as of 2026-11-09)

- `lib/auth.ts` imports `better-auth`, `mongodb`, and `@better-auth/mongo-adapter`, but **none are in `package.json` or `node_modules`** → `npm run build` fails with module-not-found. `tsc --noEmit` does not flag these imports, so don't trust typecheck alone. Installing those three packages is the missing piece for the build error (backend of the install to a real MongoDB not yet verified).
- Auth API route is `app/api/auth/[all]/route.ts` — a single dynamic segment. better-auth endpoints are multi-segment (e.g. `/api/auth/sign-up/email`), which need a catch-all: rename to `[...all]` per the standard better-auth setup. As-is, multi-segment auth requests 404.

## Auth / env gotchas

- MongoDB URI is **hardcoded** in `lib/auth.ts` (`mongodb://localhost:27017`, db `hireloopdb`) — no `MONGO_URI` env support. Requires a local `mongod` on 27017 for auth to work.
- `.env` (gitignored, no `.env.example`) holds only `BETTER_AUTH_SECRET` and `BETTER_AUTH_URL`. `lib/auth.ts` also reads `GOOGLE_CLIENT_ID`/`GOOGLE_CLIENT_SECRET`, which are **absent** — Google OAuth breaks at runtime (the `as string` casts hide it from TypeScript). Never print or commit `.env`.
- `lib/auth-client.ts` exports `signIn`/`signUp`/`useSession` from a bare `createAuthClient()`; the baseURL-configured `authClient` const above it is unused dead code.

## Conventions

- shadcn/ui with `style: "base-nova"` built on **`@base-ui/react` (Base UI), not Radix** — check existing `components/ui/button.tsx` before writing components. Add components with `npx shadcn@latest add <name>` (they land in `components/ui`); paths/aliases in `components.json`.
- Path alias `@/*` maps to the repo root (`@/components/...`, `@/lib/...`).
- Prettier: no semicolons, double quotes, LF; `prettier-plugin-tailwindcss` sorts classes and recognizes `cn`/`cva` as class functions (stylesheet: `app/globals.css`).
