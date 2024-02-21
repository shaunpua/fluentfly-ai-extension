import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = document.createElement("div");
root.id = "fluentfly-content-script-watch";

document.body.appendChild(root);

console.log("CONTENT SCRIPT TEST 1");

let hoverTimeout: number | undefined;

function isChineseCharacter(text: string | null) {
  return /[\u4e00-\u9fa5]/.test(text);
}

document.addEventListener("mousemove", function (e) {
  if (hoverTimeout) {
    clearTimeout(hoverTimeout);
  }

  hoverTimeout = setTimeout(() => {
    const element = document.elementFromPoint(e.clientX, e.clientY);
    if (element && isChineseCharacter(element.textContent)) {
      // Show translation (how to display this will depend on your approach, e.g., using React or direct DOM manipulation)
      console.log("character is chinese");
    } else {
      console.log("character is not chinese");
    }
  }, 200); // Delay of 200ms before checking the character
});

// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

ReactDOM.createRoot(
  document.getElementById("fluentfly-content-script-watch")!
).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
