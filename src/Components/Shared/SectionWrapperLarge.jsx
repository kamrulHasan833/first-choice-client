import PropTypes from "prop-types";

const SectionWrapperLarge = ({ children }) => {
  return <div className="max-w-large  mx-auto ">{children}</div>;
};

SectionWrapperLarge.propTypes = {
  children: PropTypes.node,
};

export default SectionWrapperLarge;
