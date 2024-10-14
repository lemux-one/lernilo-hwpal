import { start } from "./http";

start({
    port: 3333,
    routes: [{
        acceptsRequest: (req) => req.url === "/",
        handler: ({ res }) => {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end("<p>Hello!</p>");
        },
    }],
});
