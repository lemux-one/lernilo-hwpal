import {
  createServer,
  STATUS_CODES,
  type IncomingMessage,
  type ServerResponse,
} from "node:http";
import { isBlank } from "@/common/utils";
import { AddressInfo } from "node:net";

function statusResponse(res: ServerResponse, code = 500) {
  res.writeHead(code, {
    "Content-Type": "text/plain",
  });
  res.end(STATUS_CODES[code]);
}

function notFound(res: ServerResponse, details = "") {
  console.warn(`Resource not found: ${details}`);
  statusResponse(res, 404);
}

function internalError(res: ServerResponse, details = "") {
  console.warn(`Unexpected internal error: ${details}`);
  statusResponse(res, 500);
}

interface Context {
  req: IncomingMessage;
  res: ServerResponse;
}

interface Route {
  handler: (ctx: Context) => void;
  acceptsRequest: (req: IncomingMessage) => boolean;
}

interface ServerParams {
  port: number;
  routes: Route[];
  host: string;
}

function start({ port, routes, host }: ServerParams) {
  if (isBlank(routes)) {
    console.log("No routes given...");
  }
  const server = createServer((req, res) => {
    console.info(`Requesting: ${req.method} ${req.url}`);
    for (const route of routes) {
      if (route.acceptsRequest(req)) {
        try {
          route.handler({ req, res });
        } catch (err) {
          const details = err instanceof Error ? err.message : String(err);
          internalError(res, details);
        } finally {
          return;
        }
      }
    }
    notFound(res);
  });
  server.listen(port, host, () => {
    const info = server.address() as AddressInfo;
    console.log(`Server listening on ${info.address}:${info.port}`);
  });
}

export { start, Route, notFound, internalError };
