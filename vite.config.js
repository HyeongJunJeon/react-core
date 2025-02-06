import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [],
        presets: [
          [
            "@babel/preset-react",
            {
              //jsx에서 수동으로 import 안해도 됨
              runtime: "automatic",
              //createElement 함수를 가져올 경로
              importSource: "/src/create-element",
            },
          ],
        ],
      },
    }),
  ],
});
