import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import PropTypes from "prop-types";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import modifyPrice from "../../utils/modifyPrice";
const Product = ({ product }) => {
  const { pathname } = useLocation();
  const { image, title, rating: reviews, size, _id, price, status } = product;
  const [currentImage, setCurrentImage] = useState(image[0].url);
  const [rating, setRating] = useState(reviews);
  const handleCurrentImage = (img) => {
    setCurrentImage(img);
  };
  const navigate = useNavigate();
  return (
    <div
      className="flex flex-col cursor-pointer"
      onClick={() => navigate(`/product-details/${_id}`)}
    >
      <div className="flex-grow">
        <div className=" shadow-md max-h-[425px] overflow-hidden flex-grow relative ">
          <img
            style={{ transition: "3s" }}
            src={currentImage}
            alt=""
            className="min-h-[425px] hover:scale-125  "
          />
          <div className="absolute w-full bottom-2 right-3 ">
            <div className="flex gap-2 justify-end">
              {pathname !== "/" ? (
                size.map((size, id) => (
                  <div key={id}>
                    <span className="capitalize text-xs text-title-color border p-1 bg-white bg-opacity-85 font-medium">
                      {size}
                    </span>
                  </div>
                ))
              ) : (
                <p className="bg-primary-color text-white px-3 py-1  capitalize text-xs">
                  {status}
                </p>
              )}
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-center text-title-color pt-3">
            {title?.length > 30 ? title.slice(0, 31) : title}
          </h3>

          <h3 className="flex gap-2 justify-center">
            <Rating
              style={{ maxWidth: 100 }}
              value={rating}
              isRequired
              onChange={setRating}
            />
            <span className="text-sm text-title-color">({rating} reviews)</span>
          </h3>

          {pathname !== "/" && (
            <div className="flex gap-2 justify-center pt-3">
              {image.map(({ color, url }, id) => (
                <div key={id} className="flex flex-col items-center">
                  <button
                    onMouseEnter={() => handleCurrentImage(url)}
                    className={`max-h-[32px] overflow-hidden border hover:border-title-color  ${
                      currentImage === url ? "border-title-color" : ""
                    } `}
                  >
                    <img src={url} alt="" className="w-8" />
                  </button>
                  <span className="capitalize text-xs text-title-color">
                    {color}
                  </span>
                </div>
              ))}
            </div>
          )}
          <p className="text-center pt-1 text-sm md:text-base">
            ${modifyPrice(price)}
          </p>
        </div>
      </div>
      {pathname !== "/" && (
        <div className="flex justify-center mt-3">
          <Link
            to={`/product-details/${_id}`}
            className=" text-xs bg-primary-color hover:bg-secondary-color px-4 py-[3px] text-white rounded-full"
          >
            Details
          </Link>
        </div>
      )}
    </div>
  );
};

Product.propTypes = {
  product: PropTypes.object,
};

export default Product;
