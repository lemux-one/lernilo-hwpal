export function h(tag: any, props: any, ...children: any[]) {
    console.log("h", { tag, props, children });
    if (typeof tag === "function") {
        return tag({ ...props, children });
    }
    return `<${tag} ${
        Object.entries(props ?? {})
            .map(([key, value]) => `${key}="${value}"`)
            .join(" ")
    }>${(children ?? []).join("\n")}</${tag}>`;
}
