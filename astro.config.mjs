import { defineConfig } from "astro/config";
import icon from "astro-icon";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://grisalesypartners.com",
  integrations: [icon()],
  vite: {
    plugins: [tailwindcss()],
  },
});
