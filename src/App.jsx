import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import Header from "./components/Header/header";
import LeftNavigation from "./components/LeftNavigation/LeftNavigation";
import Dashboard from "./pages/Dashboard";
import { Outlet } from "react-router-dom";

function App() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const toggleMobileNav = () => setIsMobileNavOpen(!isMobileNavOpen);
  const closeMobileNav = () => setIsMobileNavOpen(false);

  return (
    <div className="h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-white shadow py-3">
        <Header onMenuClick={toggleMobileNav} />
      </header>

      <div className="flex flex-1 relative overflow-hidden">
        {!isMobile && (
          <aside className="w-64 bg-white border-r shadow h-full">
            <LeftNavigation />
          </aside>
        )}

        <main className="flex-1 bg-gray-100 overflow-y-auto p-6">
          <Outlet/>
        </main>

        {isMobile && (
          <>
            <div
              className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
                isMobileNavOpen ? 'translate-x-0' : '-translate-x-full'
              }`}
            >
              <LeftNavigation />
            </div>

            {isMobileNavOpen && (
              <div
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                onClick={closeMobileNav}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}


export default App;
