import { isBrowser } from "./utils";

function h(tag: any, props: any, ...children: any[]) {
    if (isBrowser()) {
        throw new Error("Unable to render JSX to DOM");
    }

    if (typeof tag === "function") {
        return tag({ ...props, children });
    }
    return `<${tag} ${
        Object.entries(props ?? {})
            .map(([key, value]) => `${key}="${value}"`)
            .join(" ")
    }>${(children ?? []).join("\n")}</${tag}>`;
}

export { h };
