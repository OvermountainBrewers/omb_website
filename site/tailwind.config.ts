import { fontFamily } from "tailwindcss/defaultTheme";
import type { Config } from "tailwindcss";
const black = "20 14.3% 4.1%";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        paleYellow: {
          DEFAULT: "hsl(50, 100%, 70%)",
          foreground: `hsl(${black})`,
          background: `hsl(${black})`,
        },
        paleGreen: {
          DEFAULT: "hsl(120, 100%, 70%)",
          foreground: `hsl(${black})`,
          background: `hsl(${black})`,
        },
        paleBlue: {
          DEFAULT: "hsl(200, 100%, 70%)",
          foreground: `hsl(${black})`,
          background: `hsl(${black})`,
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: {
          DEFAULT: "hsl(var(--foreground) / 0.9)",
          muted: "hsl(var(--foreground) / 0.6)",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      typography: {
        DEFAULT: {
          css: {
            container: "max-w-3xl",
            "--tw-prose-body": "hsl(var(--foreground) / 0.9)",
            "--tw-prose-headings": "hsl(var(--foreground))",
            "--tw-prose-links": "hsl(var(--primary))",
            "--tw-prose-bold": "hsl(var(--primary))",
            "--tw-prose-code": "hsl(var(--primary))",
            "--tw-prose-em": "hsl(var(--foreground) / 0.9)",
            "h1, h2, h3, h4": {
              scrollMarginTop: "5rem", // scroll-m-20
              fontWeight: "bold",
            },
            h2: { fontSize: "1.875rem" }, // text-3xl
            h3: { fontSize: "1.5rem" }, // text-2xl
            p: { lineHeight: "1.75rem" }, // leading-7
            "li::marker": { color: "hsl(var(--primary))" },
            a: {
              color: "hsl(var(--primary))",
              "&:hover": { color: "hsl(var(--primary) / 0.8)" },
            },
            blockquote: { borderLeftColor: "hsl(var(--primary))" },
            img: { borderRadius: "var(--radius)" },
            pre: {
              backgroundColor: "hsl(var(--muted))",
              border: "1px solid hsl(var(--border))",
            },
            table: { borderCollapse: "collapse" },
            "th, td": {
              border: "1px solid hsl(var(--muted-foreground) / 0.2)",
            },
          },
        },
        // Dark mode
        invert: {
          css: {
            "--tw-prose-invert-body": "hsl(var(--foreground) / 0.9)",
            "--tw-prose-invert-headings": "hsl(var(--foreground))",
            "--tw-prose-invert-links": "hsl(var(--primary))",
            "--tw-prose-invert-bold": "hsl(var(--primary))",
            "--tw-prose-invert-code": "hsl(var(--primary))",
            "--tw-prose-invert-em": "hsl(var(--foreground) / 0.9)",
          },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;

export default config;
