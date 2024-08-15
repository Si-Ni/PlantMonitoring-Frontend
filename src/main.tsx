import ReactDOM from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import App from "./App";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <NextUIProvider>
    <main className="dark text-foreground">
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
  </BrowserRouter>
    </main>
  </NextUIProvider>
);
