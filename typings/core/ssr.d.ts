declare namespace SSR {
    interface Runtime {
        key: "bun" | "node" | "deno"
        path: string
        mode: Symbol
        contexts: { ref: Symbol, value: any }[]
    }
    interface Server {
        runner: Runtime
        env: {
            REPL_PORT: string
            PORT: string
            HOSTNAME: CustomHostname
        }
    }
}

