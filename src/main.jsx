import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import CribWorld from "./components/CribWorld";
import ErrorBoundary from "./components/ErrorBoundary";
import { MoodProvider } from "./context/MoodContext";
import { WorldProvider } from "./context/WorldContext";

import "./index.css";
import "./styles/cribWorld.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ErrorBoundary>
    <React.StrictMode>
      <BrowserRouter>
        <MoodProvider>
          <WorldProvider>
            <CribWorld>
              <App />
            </CribWorld>
          </WorldProvider>
        </MoodProvider>
      </BrowserRouter>
    </React.StrictMode>
  </ErrorBoundary>
);
