import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App/App";
import NiceModal from "@ebay/nice-modal-react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <NiceModal.Provider>
      <App />
    </NiceModal.Provider>
  </React.StrictMode>
);
