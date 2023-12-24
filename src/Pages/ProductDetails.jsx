import { Rating } from "@smastrom/react-rating";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSpiner from "../Components/Shared/LoadingSpiner";
import Nodata from "../Components/Shared/Nodata";
import SectionHeader from "../Components/Shared/SectionHeader";
import SectionWrapper from "../Components/Shared/SectionWrapper";
import useAlert from "../Hooks/useAlert";
import useAuth from "../Hooks/useAuth";
import useAxiosPrivate from "../Hooks/useAxiosPrivate";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import modifyPrice from "../utils/modifyPrice";
const ProductDetails = () => {
  const { id } = useParams();
  const alert = useAlert();
  const { user } = useAuth();
  const { email } = user ? user : {};
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const { data = {}, isLoading } = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/first-choice/v1/products/${id}`);
      return res?.data;
    },
  });
  const {
    image,
    _id,
    title,
    size,
    status,
    rating: reviews,
    features,
    price,
  } = data;
  const [currentImage, setCurrentImage] = useState(null);

  const [currentColor, setCurrentColor] = useState(null);
  const [currentSize, setCurrentSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const [rating, setRating] = useState(null);
  useEffect(() => {
    if (image) {
      setCurrentImage(image[0]?.url);
      setCurrentColor(image[0]?.color);
    }
    if (size) {
      setCurrentSize(size[0]);
    }
    if (reviews) {
      setRating(reviews);
    }
  }, [image, size, reviews]);
  const handleCurrentImage = (img, col) => {
    setCurrentImage(img);
    setCurrentColor(col);
  };
  const handleCurrentSize = (cs) => {
    setCurrentSize(cs);
  };
  const handleQuantity = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  // handle add to cart
  const handleAddToCart = async () => {
    const payload = {
      title,
      email,
      product_id: _id,
      image: currentImage,
      price: price,
      quantity,
      color: currentColor,
      size: currentSize,
    };

    try {
      if (user) {
        const res = await axiosPrivate.post("/first-choice/v1/carts", payload);

        const isAdded = res?.data?.title ? true : false;

        if (isAdded) {
          alert("Added to cart successfully!", "success");
          navigate("/my-cart");
        } else {
          alert("Added to cart falid!", "error");
        }
      } else {
        navigate("/signin", {
          state: `/product-details/${_id}`,
        });
      }
    } catch (err) {
      if (err) {
        alert("Added to cart falid!", "error");
      }
    }
  };
  return (
    <section>
      <SectionWrapper>
        <SectionHeader title="Product Details" />
        {isLoading ? (
          <LoadingSpiner />
        ) : !isLoading && !title ? (
          <Nodata />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="flex gap-5 items-center sm:items-start flex-col-reverse sm:flex-row">
              <div>
                <div className="flex flex-row sm:flex-col   gap-3">
                  {image.map(({ url, color }, id) => (
                    <button
                      className={`border ${
                        currentImage === url ? "border-title-color" : ""
                      }`}
                      key={id}
                      onMouseEnter={() => handleCurrentImage(url, color)}
                    >
                      <img src={url} alt="" className="w-8 sm:w-14" />
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex-grow shadow-lg flex justify-center">
                <div className="min-h-[370px] lg:min-h-[500px] overflow-hidden">
                  <img
                    src={currentImage}
                    alt=""
                    className="max-h-[370px] lg:max-h-[500px]"
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between m-b2">
                <h3 className=" text-title-color font-medium text-lg md:text-xl">
                  {title}{" "}
                  <span className="text-sm md:text-base font-normal capitalize">
                    {status === "best seller" && `(${status})`}
                  </span>
                </h3>{" "}
                <p>${modifyPrice(price)}</p>
              </div>
              <h3 className="flex gap-2 mb-3">
                <Rating
                  style={{ maxWidth: 100 }}
                  value={rating}
                  isRequired
                  onChange={setRating}
                />
                <span className="text-sm text-title-color">
                  ({rating} reviews)
                </span>
              </h3>
              <div className="flex gap-4 mb-2">
                {" "}
                <p className="font-medium">Sizes</p>{" "}
                <div className="flex gap-2 ">
                  {size.map((size, id) => (
                    <div key={id}>
                      <span
                        onMouseEnter={() => handleCurrentSize(size)}
                        className={`capitalize text-sm  text-title-color border ${
                          currentSize === size ? "border-title-color" : ""
                        } p-1 bg-white bg-opacity-85`}
                      >
                        {size}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex gap-4 items-center">
                  <p className="font-medium">Colors </p>
                  <div className="flex gap-2 justify-center pt-3">
                    {image.map(({ color, url }, id) => (
                      <div key={id} className="flex flex-col items-center">
                        <button
                          onMouseEnter={() => handleCurrentImage(url, color)}
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
                </div>
              </div>

              <div className="flex items-center gap-4 pt-4 ">
                <p className="font-medium">Quantity </p>
                <div className="form-control ">
                  <input
                    type="number"
                    value={quantity}
                    className="input input-bordered rounded-none w-14 text-center p-0 h-8 text-sm"
                    onChange={handleQuantity}
                  />
                </div>
              </div>

              <div>
                <p className="font-medium mt-4">Features:</p>
                <div className="flex flex-col ">
                  {features?.map((feature, id) => (
                    <span key={id}>
                      {id + 1}. {feature}
                    </span>
                  ))}
                </div>
              </div>
              <div className="pt-6">
                <button
                  className="text-white bg-primary-color hover:bg-secondary-color px-7 md:px-10 py-2 rounded-full"
                  onClick={handleAddToCart}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </SectionWrapper>
    </section>
  );
};

export default ProductDetails;
