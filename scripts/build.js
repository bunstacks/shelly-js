const targets = new Bun.FileSystemRouter({
  dir: "src",
  style: "nextjs",
  fileExtensions: [".ts", ".toml", ".wasm", ".json"],
});

const outputs = (async () =>
  Bun.build({
    entrypoints: Object.values(targets.routes),
    outdir: process.env.APP_DIR ?? ".codepark" + "/out",
    format: "esm",
    target: "bun",
    external: ["bun", "@swc/core"],
    naming: "[dir]/[name].[ext]",
    sourcemap: "external",
    define: {
      "process.env.NODE_ENV": "production",
      "process.env.BUN_INSTALL": ".codepark/packages",
    },
  }))();
