import {
  createServer,
  STATUS_CODES,
  type IncomingMessage,
  type ServerResponse,
} from "node:http";
import { isBlank } from "../common/utils";

function statusResponse(res: ServerResponse, code = 500) {
  res.writeHead(404, {
    "Content-Type": "text/plain",
  });
  res.end(STATUS_CODES[404]);
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
}

function start({ port, routes }: ServerParams) {
  if (isBlank(routes)) {
    console.log("No routes given...");
  }
  const server = createServer((req, res) => {
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
  server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

export { start, Route, notFound };
