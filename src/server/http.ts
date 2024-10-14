import {
    createServer,
    type IncomingMessage,
    type ServerResponse,
} from "node:http";
import { isBlank } from "../common/utils";

function notFound(res: ServerResponse) {
    res.writeHead(404, {
        "Content-Type": "text/plain",
    });
    res.end("Not Found");
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

export function start({ port, routes }: ServerParams) {
    if (isBlank(routes)) {
        console.log("No routes given...");
    }
    const server = createServer((req, res) => {
        for (const route of routes) {
            if (route.acceptsRequest(req)) {
                route.handler({ req, res });
                return;
            }
        }
        notFound(res);
    });
    server.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
}
