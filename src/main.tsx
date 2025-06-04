import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import Apx from "./Apx.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <Apx />
  </Provider>
);
