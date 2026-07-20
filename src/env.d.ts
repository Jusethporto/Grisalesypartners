/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

// Set as a Cloudflare secret (dashboard → Settings → Variables and secrets),
// not declared in wrangler.jsonc, so it never lands in the repo.
// `import { env } from "cloudflare:workers"` types against `Cloudflare.Env`, not the bare global `Env`.
declare namespace Cloudflare {
  interface Env {
    CONTACT_TO_EMAIL?: string;
  }
}
