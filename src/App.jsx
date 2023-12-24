import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import FooterMain from "./Layout/FooterMain";
import Header from "./Layout/Header";
function App() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="font-montserrat">
      <Header />
      <Outlet />
      <FooterMain />
    </div>
  );
}

export default App;
