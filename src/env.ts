Bun.env.CODEPARK = Object.assign({
    RUNTIME: "bun",
    DEBUG: "true",
},
    { ...process.env } as Record<string, string>
)