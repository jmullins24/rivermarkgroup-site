export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Manrope", "system-ui", "sans-serif"],
        serif: ["Source Serif 4", "ui-serif", "serif"]
      },
      colors: {
        ink: {
          900: "#0b1c1a",
          800: "#142927",
          700: "#223a37",
          600: "#3b514f",
          500: "#4a6461"
        },
        river: {
          700: "#0f766e",
          600: "#0d9488",
          500: "#14b8a6"
        },
        sand: {
          100: "#f6f4ef",
          200: "#efeae0"
        }
      },
      boxShadow: {
        lift: "0 14px 40px -26px rgba(15, 23, 42, 0.45)"
      }
    }
  },
  plugins: []
};
