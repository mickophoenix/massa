import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import Icons from "unplugin-icons/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    solidPlugin(),
    Icons({
      autoInstall: true,
      compiler: "solid",
      defaultStyle: "vertical-align: middle; transform: translateY(-5%);",
    }),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Body Mass Index Calculator",
        short_name: "BMI Calculator",
        description:
          "Calculate your body mass index (BMI) with this easy-to-use calculator",
        theme_color: "#e7c5fd",
        icons: [
          {
            src: "android-chrome-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "android-chrome-512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
  },
});
