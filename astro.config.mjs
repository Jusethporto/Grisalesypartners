import { defineConfig, sessionDrivers } from "astro/config";
import icon from "astro-icon";
import sitemap from "@astrojs/sitemap";
import cloudflare from "@astrojs/cloudflare";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://grisalesandpartners.com",
  integrations: [icon(), sitemap()],
  adapter: cloudflare({
    // This site doesn't use astro:assets image transforms, so skip Cloudflare
    // Images (a paid product) entirely instead of provisioning an unused binding.
    imageService: "passthrough",
  }),
  // Nothing in this site calls Astro.session — set an inert in-memory driver so
  // the Cloudflare adapter doesn't silently provision an unused KV namespace.
  session: {
    driver: sessionDrivers.lruCache(),
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
