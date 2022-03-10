module.exports = {
  files: [
    "./packages/**/tests/**/*.spec.ts",
    "!node_modules/**/*",
    "!**/node_modules/**/*",
  ],
  verbose: true,
  typescript: {
    rewritePaths: {
      "src/": "lib/",
    },
    compile: false,
  },
  require: ["ts-node/register"],
  nodeArguments: [
    "--loader=esbuild-node-loader",
    "--experimental-specifier-resolution=node",
  ],
};
