/*
 * @LastEditors: John
 * @Date: 2024-06-17 17:20:03
 * @LastEditTime: 2024-06-18 10:46:11
 * @Author: John
 */
import "@/i18n/init.ts";
import "antd-mobile/es/global";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "normalize.css";
import "./index.css";
import { HashRouter } from "react-router-dom";
import EventBusProvider from "./context/EventBusContext.tsx";
import { WalletProvider } from "./components/WalletProvider.tsx";
import flexible from "./utils/flexible.ts";

flexible(window, document);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <WalletProvider>
      <EventBusProvider>
        <HashRouter>
          <App />
        </HashRouter>
      </EventBusProvider>
    </WalletProvider>
  </>
);
