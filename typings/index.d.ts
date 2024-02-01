/// <reference path="./core/env.d.ts"/>
/// <reference path="./core/ssr.d.ts"/>

declare module "bun" {
    interface Env {
        CODEPARK: Record<string, string>
    }
}