import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

function NavItem({ children, path }) {
  return (
    <li>
      <NavLink
        className={({ isActive }) => {
          return isActive
            ? `text-base  border-b  border-secondary-color rounded-sm text-secondary-color hover:text-secondary-color capitalize`
            : `text-base text-title-color border-b border-transparent hover:border-secondary-color rounded-sm hover:text-secondary-color capitalize`;
        }}
        to={path}
      >
        {children}
      </NavLink>
    </li>
  );
}
NavItem.propTypes = {
  children: PropTypes.node,
  path: PropTypes.node,
};
export default NavItem;
