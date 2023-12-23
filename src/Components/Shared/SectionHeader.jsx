import PropTypes from "prop-types";

const SectionHeader = ({ title, subtitle, children }) => {
  return (
    <div className="pt-14 md:pt-20 pb-6 md:pb-8">
      <h3 className="text-2xl md:text-3xl pb-1 md:pb-2 lg:text-4xl font-semibold capitalize">
        <span className="flex items-center gap-1">
          {" "}
          {children && children} {title}
        </span>
      </h3>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
};

SectionHeader.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  children: PropTypes.node,
};

export default SectionHeader;
