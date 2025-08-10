import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth,AuthProvider } from "./data/AuthContext";
import { useData,DataProvider } from "./data/DataContext";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Login from "./components/Login";
import { HashLoader } from "react-spinners";
// import RegistrationList from "./components/AllReg";
import CompetitionList from "./components/CompetitionList"
const App = () => {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<AuthenticatedRoute Element={Home} />} />
              <Route
                path="/list"
                element={<AuthenticatedRoute Element={CompetitionList} />}
              />
              {/* Other routes */}
            </Route>
          </Routes>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
};
const AuthenticatedRoute = ({Element}) => {
  const { isLoading } = useData();
  const { auth } = useAuth();
  return !auth ? (
    <Login />
  ) : !isLoading ? (
    <Element />
  ) : (
    <div className="min-h-screen flex justify-center items-center bg-slate-700">
      <HashLoader color="#fff" size={100} />
    </div>
  );
};
export default App;
