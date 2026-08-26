import { serve, file } from "bun";
import path from "path";
import index from "./index.html";

const server = serve({
  routes: {
    // 1. Static files explicitly from /sequence
    "/sequence/*": async (req) => {
      const url = new URL(req.url);
      const filePath = path.join(process.cwd(), "public", url.pathname);
      const f = file(filePath);
      if (await f.exists()) {
        return new Response(f);
      }
      return new Response("Not Found", { status: 404 });
    },

    // 2. Generic static files from public/
    "/public/*": async (req) => {
      const url = new URL(req.url);
      const relativePath = url.pathname.replace(/^\/public/, "");
      const filePath = path.join(process.cwd(), "public", relativePath);
      const f = file(filePath);
      if (await f.exists()) {
        return new Response(f);
      }
      return new Response("Not Found", { status: 404 });
    },

    // 3. API Routes
    "/api/hello": {
      async GET() {
        return Response.json({ message: "Hello, world!", method: "GET" });
      },
      async PUT() {
        return Response.json({ message: "Hello, world!", method: "PUT" });
      },
    },

    "/api/hello/:name": async (req) => {
      return Response.json({ message: `Hello, ${req.params.name}!` });
    },

    // 4. Default Bun HTML & JS Module Bundler (HMR Support)
    "/*": index,
  },

  development: process.env.NODE_ENV !== "production" && {
    hmr: true,
    console: true,
  },
});

console.log(`🚀 Server running at ${server.url}`);