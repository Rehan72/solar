import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">

      {/* Header (Fixed height, not letting content go inside) */}
      <header className="">
        <Header setSidebarOpen={setSidebarOpen} />
      </header>

      {/* Body Section */}
      <div className="flex flex-1">

        {/* Sidebar */}
        <aside className="relative z-10">
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        </aside>

        {/* Main Content */}
        <main className="flex-1  w-full">
          {children}
        </main>
      </div>

      {/* Footer */}
      <footer className="">
        <Footer />
      </footer>
    </div>
  );
}

export default Layout;
