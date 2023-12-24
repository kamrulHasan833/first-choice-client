import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import LoadingSpiner from "../Shared/LoadingSpiner";
import Nodata from "../Shared/Nodata";
import Product from "../Shared/Product";
import SectionHeader from "../Shared/SectionHeader";
import SectionWrapper from "../Shared/SectionWrapper";
const AllProducts = () => {
  const axiosPublic = useAxiosPublic();
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosPublic.get("/first-choice/v1/products");
      return res.data;
    },
  });

  return (
    <section>
      <SectionWrapper>
        <SectionHeader title="all product" />
        {isLoading ? (
          <LoadingSpiner />
        ) : !isLoading && !data?.length ? (
          <Nodata />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {data?.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        )}
      </SectionWrapper>
    </section>
  );
};

export default AllProducts;
