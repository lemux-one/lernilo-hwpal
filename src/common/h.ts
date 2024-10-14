import { isBrowser } from "./utils";

function h(tag: any, props: any, ...children: any[]) {
  if (isBrowser()) {
    throw new Error("Unable to render JSX to DOM");
  }

  if (typeof tag === "function") {
    return tag({ ...props, children });
  }
  const attrs = props
    ? ` ${Object.entries(props ?? {})
        .map(([key, value]) => `${key}="${value}"`)
        .join(" ")}`
    : "";
  const asStr = `<${tag}${attrs}>${(children ?? []).join("\n")}</${tag}>`;
  if (tag === "html") {
    return `<!doctype html>${asStr}`;
  }
  return asStr;
}

export { h };
