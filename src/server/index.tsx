import { start, type Route } from "./http";
import { Home } from "./pages/Home";
import { h } from "../common/h";

const routes: Route[] = [
  {
    acceptsRequest: (req) => req.url === "/",
    handler: ({ res }) => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(<Home />);
    },
  },
];

const port = 3333;

start({ port, routes });
