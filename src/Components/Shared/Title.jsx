import PropTypes from "prop-types";
import { Helmet } from "react-helmet";

const Title = ({ title }) => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>Unity Mates || {title}</title>
    </Helmet>
  );
};

Title.propTypes = {
  title: PropTypes.string,
};

export default Title;
