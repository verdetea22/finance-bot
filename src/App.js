import "./App.css";
import React from "react";
import { Header } from "./components/common";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./components/pages/home";
import SignUp from "./components/pages/signUp";
import Login from "./components/pages/login";
import InputData from "./components/pages/inputData";
import Settings from "./components/pages/settings";
import ViewAccount from "./components/pages/viewAccount";
import { FirebaseAuthProvider } from "./contexts";

function App() {
  return (
    <div className="App">
      <FirebaseAuthProvider>
        <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />{" "}
          <Route path="/sign-up" element={<SignUp />} />{" "}
          <Route path="/login" element={<Login />} />{" "}
          <Route path="/input-data" element={<InputData />} />{" "}
          <Route path="/settings" element={<Settings />} />{" "}
          <Route path="/view-account" element={<ViewAccount />} />{" "}
        </Routes>{" "}
      </Router>{" "}
      </FirebaseAuthProvider>
    </div>
  );
}

export default App;
