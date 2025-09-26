import { useState } from "react";
import { Login } from "@/components/Login";
import { Dashboard } from "@/components/Dashboard";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const handleLogin = (role: string, email: string) => {
    setUserRole(role);
    setUserEmail(email);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole("");
    setUserEmail("");
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Dashboard 
      role={userRole} 
      email={userEmail} 
      onLogout={handleLogout} 
    />
  );
};

export default Index;
