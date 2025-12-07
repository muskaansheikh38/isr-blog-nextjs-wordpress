import type { CodegenConfig } from "@graphql-codegen/cli";
import { loadEnvConfig } from "@next/env";

const projectDir = process.cwd();
loadEnvConfig(projectDir);

const config: CodegenConfig = {
  overwrite: true,
  schema: {
    // TODO: Set NEXT_PUBLIC_WORDPRESS_API_URL in your .env.local or Vercel environment variables
    // Example: NEXT_PUBLIC_WORDPRESS_API_URL=https://your-wordpress-site.com
    ...(process.env.NEXT_PUBLIC_WORDPRESS_API_URL ? {
      [`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/graphql`]: { headers: {        "User-Agent": "Codegen",
      },
    }, : {})
  },
  generates: {
    "src/gql/": {
      preset: "client",
    },
    "src/gql/schema.gql": {
      plugins: ["schema-ast"],
    },
  },
};

export default config;
