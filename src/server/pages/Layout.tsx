import { React } from "@/tsxify";

function Layout(props: any) {
  return (
    <html lang="en-US">
      <head>
        <meta charset="utf-8" />
        <title>Lernilo</title>
      </head>

      <body>
        {props.children}
        <script src="/assets/index.bundle.js"></script>
      </body>
    </html>
  );
}

export { Layout };
