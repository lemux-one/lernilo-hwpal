import { h } from "../common/h";
import { start, type Route } from "./http";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";

const routes: Route[] = [
  {
    acceptsRequest: (req) => req.url === "/",
    handler: ({ res }) => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(
        <Layout>
          <Home />
        </Layout>
      );
    },
  },
];

const port = 3333;

start({ port, routes });
