import { start } from "./http";
import { home } from "./pages/Home";

start({
    port: 3333,
    routes: [{
        acceptsRequest: (req) => req.url === "/",
        handler: ({ res }) => {
            res.writeHead(200, { "Content-Type": "text/html" });
            // res.end("<p>Hello!</p>");
            res.end(home);
        },
    }],
});
