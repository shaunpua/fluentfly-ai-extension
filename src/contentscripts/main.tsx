import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const root = document.createElement("div");
root.id = "fluentfly-content-script-watch";

document.body.appendChild(root);

console.log("CONTENT SCRIPT TEST 1");

ReactDOM.createRoot(
  document.getElementById("fluentfly-content-script-watch")!
).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
