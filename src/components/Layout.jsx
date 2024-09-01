import React from "react";
import { Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <div className="min-h-screen bg-slate-300">
      <div>
        <Outlet />
      </div>
    </div>
  );
};
export default Layout;