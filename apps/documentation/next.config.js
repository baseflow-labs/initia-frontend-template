import nextra from 'nextra';
import path from "path";

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
});

export default withNextra({
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.resolve(process.cwd(), "../../node_modules")],
  },
});
