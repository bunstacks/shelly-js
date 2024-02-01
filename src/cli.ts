#!/usr/bin/env bun
/// <reference path="../typings/index.d.ts"/>
import "./env";
import { serialize } from "bun:jsc"

function main(args: string[], context: typeof globalThis) {
    const proc = context.Bun.$`${args.toString()}`.cwd(context.process.cwd() + "/.codepark").env({
        ...Bun.env as Record<string, string>
    });

    return {
        writer: (data: string | ArrayBuffer | Uint16Array | TemplateStringsArray | string[]) => proc.stdin.getWriter().write(((payload) => {
            return Buffer.from(serialize(data)).toString("utf-8")
        })(data)), response: function (data: string) {
            return new Response(data, {
                headers: {
                    'Content-Type': 'text/plain'
                }
            })
        }
    }
};

const sessionContext = main(Bun.argv.slice(2), globalThis);

await sessionContext.response(await Bun.file(process.cwd() + "/" + (import.meta.env?.APP_DIR ?? ".codepark") + "/" + (Bun.env.APP_SLUG ?? "repl") + ".ts").text()).text().then(response => {
    const repl = new ShadowRealm();
    const lines = response.split(";")
    repl.evaluate(`Bun.env.CODEPARK = ${JSON.stringify({ DEBUG: true, PATH: import.meta.env.PATH, env: import.meta.env.NODE_ENV })};` + lines.join(";process.env.DEBUG === 'true' && (() => { console.log('new line')})();1;"))
})