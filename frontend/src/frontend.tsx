import { createRoot, type Root } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const container = document.getElementById("root")!;

// Global store taaki HMR reload hone par duplicate root create na ho
declare global {
  var __reactRoot: Root | undefined;
}

const root = globalThis.__reactRoot ?? createRoot(container);
globalThis.__reactRoot = root;

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);