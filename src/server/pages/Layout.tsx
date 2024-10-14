import { h } from "../../common/h";

function Layout(props: any) {
  return (
    <html lang="en-US">
      <head>
        <meta charset="utf-8" />
        <title>Lernilo</title>
      </head>

      <body>{props.children}</body>
    </html>
  );
}

export { Layout };