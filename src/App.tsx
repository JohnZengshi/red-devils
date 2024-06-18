/*
 * @LastEditors: John
 * @Date: 2024-06-17 17:20:03
 * @LastEditTime: 2024-06-17 17:36:20
 * @Author: John
 */
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
