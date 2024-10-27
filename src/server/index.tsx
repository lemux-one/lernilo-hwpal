import { React, html } from "@/tsxify";
import { notFound, internalError, start, type Route } from "@/server/http";
import { Layout } from "@/server/pages/Layout";
import { Home } from "@/server/pages/Home";
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
        notFound(res, `${req.url ?? ""} is not a static resource`);
        return;
      }
      const relativePath = req.url?.slice(ASSETS_PREFIX.length);
      console.log({ ext, relativePath, dir: __dirname });
      const path = __dirname + `/../client/${ext}/${relativePath}`;
      readFile(path, (err, data) => {
        if (err) {
          internalError(res, `Error loading file ${path}`);
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
        html(
          <Layout>
            <Home />
          </Layout>
        )
      );
    },
  },
];

const port = process.env.PORT ? Number(process.env.PORT) : 3333;

start({ port, routes });
