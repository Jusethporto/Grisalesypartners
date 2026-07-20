import { defineConfig } from "astro/config";
import icon from "astro-icon";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://grisalesypartners.com",
  integrations: [icon(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
