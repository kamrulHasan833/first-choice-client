import Headroom from "react-headroom";
import { PiShoppingCartThin } from "react-icons/pi";
import { Link, useLocation } from "react-router-dom";
import NavItem from "../Shared/NavItem";
import NavbarEnd from "../Shared/NavbarEnd";
import SectionWrapper from "../Shared/SectionWrapper";

function Navbar() {
  const { pathname } = useLocation();

  const items = (
    <>
      <NavItem path="/">Home</NavItem>
      <NavItem path="/products">products</NavItem>
    </>
  );

  return (
    <div
      className={`bg-transparent  ${
        pathname === "/" ? "md:absolute top-0 left-0 " : "shadow-lg"
      }  z-10 w-full `}
    >
      <Headroom style={{ zIndex: 100 }}>
        <SectionWrapper>
          <div className={`navbar py-0 md:py-2  px-0 bg-transparent`}>
            <div className="navbar-start">
              <div className={`dropdown `}>
                <label tabIndex={0} className="btn btn-ghost md:hidden">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 "
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h8m-8 6h16"
                    />
                  </svg>
                </label>
                <ul
                  tabIndex={0}
                  className={`menu menu-sm dropdown-content mt-3  z-50 shadow bg-base-100 rounded-md w-80 gap-1 p-6`}
                >
                  {items}
                </ul>
              </div>
              <Link
                to="/"
                className="btn btn-ghost normal-case text-xl p-0 hover:bg-transparent"
              >
                <img
                  src="https://i.ibb.co/CvNgDBs/log.png"
                  alt="Logo"
                  className="w-40"
                />
              </Link>
            </div>
            <div className="navbar-center hidden md:flex">
              <ul id="nav-menu" className="menu menu-horizontal px-1 gap-2">
                {items}
              </ul>
            </div>
            <div className="navbar-end">
              <Link
                to="/my-cart"
                className="pr-4 md:pr-10 text-xl md:text-2xl text-title-color hover:text-secondary-color"
              >
                <PiShoppingCartThin />
              </Link>

              <NavbarEnd />
            </div>
          </div>
        </SectionWrapper>
      </Headroom>
    </div>
  );
}

export default Navbar;
