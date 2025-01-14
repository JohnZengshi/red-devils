/*
 * @LastEditors: John
 * @Date: 2024-06-17 17:20:03
 * @LastEditTime: 2024-07-02 11:38:25
 * @Author: John
 */
import "@/i18n/init.ts";
import "antd-mobile/es/global";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
// import "normalize.css";
import "./index.css";
import { HashRouter } from "react-router-dom";
import EventBusProvider from "./context/EventBusContext.tsx";
import { WalletProvider } from "./components/WalletProvider.tsx";
import flexible from "./utils/flexible.ts";
import VConsole from "vconsole";
import { getUrlParameterByName } from "./utils/index.ts";

if (getUrlParameterByName("vconsole") === "1") {
  new VConsole();
}
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
