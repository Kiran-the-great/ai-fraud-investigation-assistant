import React, { useState } from "react";
import NavBar from "./components/NavBar";
import Dashboard from "./pages/Dashboard";
import ChatPage from "./pages/ChatPage";
import UploadPage from "./pages/UploadPage";

function App() {
  const [activePage, setActivePage] = useState("dashboard");

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <Dashboard />;
      case "chat":
        return <ChatPage />;
      case "upload":
        return <UploadPage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    // Force the app container to snap directly to the edges of the device screen
    <div className="fixed inset-0 w-screen h-screen bg-slate-50/50 grid grid-cols-[16rem_1fr] overflow-hidden m-0 p-0">
      
      {/* 1. SIDEBAR (Locked precisely at 16rem wide) */}
      <NavBar activePage={activePage} setActivePage={setActivePage} />

      {/* 2. MAIN WORKSPACE (Guaranteed to fill 100% of the remaining browser screen) */}
      <div className="h-full overflow-y-auto min-w-0 bg-transparent flex flex-col m-0 p-0">
        {renderPage()}
      </div>

    </div>
  );
}

export default App;