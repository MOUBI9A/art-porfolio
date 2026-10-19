import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

export default defineConfig([
  ...nextVitals,
  {
    files: [
      "components/dashboard/ProjectFormClient.tsx",
      "components/public/CustomCursor.tsx",
    ],
    // React 19's set-state-in-effect rule is new in the Next 16 lint stack.
    // These two legacy React 18 components intentionally preserve their
    // existing effect-driven behavior during this dependency-only security PR.
    rules: {
      "react-hooks/set-state-in-effect": "off",
    },
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);
