import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import LoadingSpiner from "../Shared/LoadingSpiner";
import Nodata from "../Shared/Nodata";
import Product from "../Shared/Product";
import SectionHeader from "../Shared/SectionHeader";
import SectionWrapper from "../Shared/SectionWrapper";

const BestSellerProducts = () => {
  const axiosPublic = useAxiosPublic();
  const { data, isLoading } = useQuery({
    queryKey: ["best-seller-products"],
    queryFn: async () => {
      const res = await axiosPublic.get(
        "/first-choice/v1/products/best-seller"
      );
      return res.data;
    },
  });

  return (
    <section>
      <SectionWrapper>
        <SectionHeader title="Best Seller" />
        {isLoading ? (
          <LoadingSpiner />
        ) : !isLoading && !data?.length ? (
          <Nodata />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3   gap-10">
            {data?.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        )}
      </SectionWrapper>
    </section>
  );
};

export default BestSellerProducts;
