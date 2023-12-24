import PropTypes from "prop-types";

import { Link } from "react-router-dom";

const HeroSlide = ({ slide }) => {
  const { image, title, moto, path, btn_text } = slide;

  return (
    <div className="relative max-h-[800px]">
      <img
        src={image}
        alt=""
        className="w-full"
        data-aos="zoom-out"
        data-aos-duration="2000"
      />
      <div className="absolute top-0 left-0 flex w-full  h-full justify-center items-center bg-black bg-opacity-30 z-10">
        <div className="text-center">
          {" "}
          <h3
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-white pb-3"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            {title}
          </h3>
          <p
            className=" text-white text-lg  md:text-xl mb-10"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            {moto}
          </p>
          <div
            className="flex gap-6 items-center"
            data-aos="fade-up"
            data-aos-duration="1200"
          >
            <div className="flex justify-center w-full">
              <Link
                className="text-white text-xs uppercase hover:bg-secondary-color md:text-sm bg-primary-color px-6 md:px-10 py-1 md:py-2 rounded-full"
                to={path}
              >
                {btn_text}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

HeroSlide.propTypes = {
  slide: PropTypes.object,
};

export default HeroSlide;
