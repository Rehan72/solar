import React, { useState } from "react";
import LandingPage from "./pages/LandingPage";
import Preloader from "./components/ui/Preloader";
import Login from "./auth/Login";
import Register from "./auth/Register";
import ForgotPassword from "./auth/ForgotPassword";
import { AnimatePresence } from "framer-motion";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState("landing"); // 'landing', 'login', 'register', 'forgot-password'

  const navigate = (view) => {
    setCurrentView(view);
  };

  return (
    <div className="bg-deep-navy min-h-screen text-white">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <Preloader key="preloader" onComplete={() => setIsLoading(false)} />
        ) : (
          <>
            {currentView === "landing" && (
              <LandingPage key="landing" onNavigate={navigate} />
            )}
            {currentView === "login" && (
              <Login key="login" onNavigate={navigate} />
            )}
            {currentView === "register" && (
              <Register key="register" onNavigate={navigate} />
            )}
            {currentView === "forgot-password" && (
              <ForgotPassword key="forgot-password" onNavigate={navigate} />
            )}
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
