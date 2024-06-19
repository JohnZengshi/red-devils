/*
 * @LastEditors: John
 * @Date: 2024-06-17 17:20:03
 * @LastEditTime: 2024-06-19 16:59:21
 * @Author: John
 */
import { Route, Router, Routes } from "react-router-dom";
import "./style/ant-cover-m.css";
import "./style/react-data-table-component-cover-m.css";
import "./App.css";
import Home from "./pages/Home";
import Header from "./components/Header";
import Mint from "./pages/Mint";
import RouterLogProvider from "./context/RouterContext";
import LevelUp from "./pages/LevelUp";
import AssetRecord from "./pages/AssetRecord";
import AirDropRecord from "./pages/AirDropRecord";
import InvitationList from "./pages/InvitationList";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import useUserStore from "./store/User";
function App() {
  const { i18n } = useTranslation();
  const { Lang: currantLang } = useUserStore();
  useEffect(() => {
    i18n.changeLanguage(currantLang);
    return () => {};
  }, []);

  return (
    <>
      <RouterLogProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mint" element={<Mint />} />
          <Route path="/levelup" element={<LevelUp />} />
          <Route path="/assetrecord" element={<AssetRecord />} />
          <Route path="/airdroprecord" element={<AirDropRecord />} />
          <Route path="/invitationlist" element={<InvitationList />}></Route>
        </Routes>
      </RouterLogProvider>
    </>
  );
}

export default App;
