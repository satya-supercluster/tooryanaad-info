import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth,AuthProvider } from "./data/AuthContext";
import { useData,DataProvider } from "./data/DataContext";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Login from "./components/Login";
import { HashLoader } from "react-spinners";
const App = () => {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<AuthenticatedRoute />} />
              {/* Other routes */}
            </Route>
          </Routes>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
};
const AuthenticatedRoute = () => {
  const { isLoading } = useData();
  const { auth } = useAuth();
  return !auth ? (
    <Login />
  ) : !isLoading ? (
    <Home />
  ) : (
    <div className="min-h-screen flex justify-center items-center bg-slate-700">
      <HashLoader color="#fff" size={100} />
    </div>
  );
};
export default App;
