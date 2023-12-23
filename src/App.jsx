import AOS from "aos";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Layout/Header";

function App() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="font-montserrat">
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
