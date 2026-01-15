import type { Config } from "tailwindcss";

const config: Config = {
  // In Tailwind v4, content can be specified in config OR via @source in CSS
  // Using config file for better reliability
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
