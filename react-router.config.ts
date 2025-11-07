import { vercelPreset } from "@vercel/react-router/vite";
import type { Config } from "@react-router/dev/config";

export default {
  // Enable server-side rendering
  ssr: true,

  // Add the Vercel preset for deployment
  presets: [vercelPreset()],
} satisfies Config;
