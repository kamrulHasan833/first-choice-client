import PropTypes from "prop-types";

const SectionWrapper = ({ children }) => {
  return (
    <div className="max-w-standard mx-6 md:mx-10 2xl:mx-auto ">{children}</div>
  );
};

SectionWrapper.propTypes = {
  children: PropTypes.node,
};

export default SectionWrapper;
