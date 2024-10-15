import { h } from "../common/h";
import { notFound, start, type Route } from "./http";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { readFile } from "node:fs";

const MIME_TYPES: Record<string, string> = {
  js: "text/javascript",
};

const ASSETS_PREFIX = "/assets/";

const routes: Route[] = [
  {
    acceptsRequest: (req) => {
      const isAssetPath = Boolean(req.url?.startsWith(ASSETS_PREFIX));
      return isAssetPath;
    },
    handler: ({ req, res }) => {
      const lastDot = req.url?.lastIndexOf(".") ?? -1;
      const ext = req.url?.slice(lastDot + 1) ?? "";
      if (!ext) {
        notFound(res);
        return;
      }
      const relativePath = req.url?.slice(ASSETS_PREFIX.length);
      console.log({ ext, relativePath, dir: __dirname });
      const path = __dirname + `/../client/${ext}/${relativePath}`;
      readFile(path, (err, data) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("Error loading file");
          return;
        }
        res.writeHead(200, { "Content-Type": MIME_TYPES[ext] });
        res.end(data);
      });
    },
  },
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

const port = process.env.PORT ? Number(process.env.PORT) : 3333;

start({ port, routes });
