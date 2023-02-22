import React from "react";
import "./App.css";
import "./styles/styles.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WalletContextProvider from "./components/walletContextProvider";
import LandingPage from "./pages/Landing/LandingPage";
import SignUp from "./pages/Signup/SignUp";
import CreateGroup from "./pages/Group/CreateGroup";
import Create from "./pages/Create/Create";
function App() {
  return (
    <WalletContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/admin' element={<CreateGroup />} />
          <Route path='/create' element={<Create />} />
        </Routes>
      </BrowserRouter>
    </WalletContextProvider>
  );
}

export default App;
