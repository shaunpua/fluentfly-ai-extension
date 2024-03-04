import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = document.createElement("div");
root.id = "fluentfly-content-script-watch";

document.body.appendChild(root);

ReactDOM.createRoot(
  document.getElementById("fluentfly-content-script-watch")!
).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
