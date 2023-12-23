import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const NavItem = ({ name, path }) => {
  return (
    <li>
      <NavLink
        to={path}
        className={({ isActive }) =>
          `rounded-none ${
            isActive
              ? "text-primary-color border-b border-primary-color"
              : " text-title-color "
          }`
        }
      >
        {name}
      </NavLink>
    </li>
  );
};

NavItem.propTypes = {
  name: PropTypes.string,
  path: PropTypes.string,
};

export default NavItem;
