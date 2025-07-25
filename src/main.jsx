import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/index.js";
import "./index.scss";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
