import React from "react";

import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
        <div className="site-wrapper">
        <main>
            <Outlet />
        </main>
        <footer class="footer">COPYRIGHT © 2023 BY AVITAL & RUT</footer>
        </div>
  )
};

export default Layout;