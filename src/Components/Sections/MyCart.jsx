import { useQuery } from "@tanstack/react-query";
import { Table } from "flowbite-react";
import { RiDeleteBin6Line } from "react-icons/ri";
import useAlert from "../../Hooks/useAlert";
import useAuth from "../../Hooks/useAuth";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import LoadingSpiner from "../Shared/LoadingSpiner";
import Nodata from "../Shared/Nodata";
import SectionHeader from "../Shared/SectionHeader";
import SectionWrapper from "../Shared/SectionWrapper";

const MyCart = () => {
  const alert = useAlert();
  const axiosPrivate = useAxiosPrivate();
  const { user } = useAuth();
  const { data, isLoading, refetch } = useQuery({
    enabled: !user?.email ? false : true,
    queryKey: ["my-cart"],
    queryFn: async () => {
      const res = await axiosPrivate.get(
        `/first-choice/v1/carts?email=${user?.email}`
      );
      return res.data;
    },
  });

  const totalPrice = data?.reduce(
    (acc, { price, quantity }) => price * quantity + acc,
    0
  );
  const handleDelete = async (id) => {
    try {
      const res = await axiosPrivate.delete(`/first-choice/v1/carts/${id}`);

      const isDeleted = res?.data?.deletedCount > 0 ? true : false;

      if (isDeleted) {
        refetch();
        alert("Deleted cart item  successfully!", "success");
      } else {
        alert("Deleted  cart item falid!", "error");
      }
    } catch (err) {
      if (err) {
        alert("Deleted  cart item falid!", "error");
      }
    }
  };
  return (
    <section className="min-h-[700px]">
      <SectionWrapper>
        <SectionHeader title="My Cart" />
        {isLoading ? (
          <LoadingSpiner />
        ) : !isLoading && !data?.length ? (
          <Nodata />
        ) : (
          <div className="overflow-x-auto">
            <Table hoverable>
              <Table.Head className="md:text-base">
                <Table.HeadCell className="p-4"></Table.HeadCell>
                <Table.HeadCell>Image</Table.HeadCell>
                <Table.HeadCell>Title</Table.HeadCell>
                <Table.HeadCell>Color</Table.HeadCell>
                <Table.HeadCell>Size</Table.HeadCell>
                <Table.HeadCell>Quantity</Table.HeadCell>
                <Table.HeadCell>Price </Table.HeadCell>
                <Table.HeadCell>Action</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y md:text-base ">
                {data?.map(
                  ({ title, image, size, color, quantity, price, _id }, id) => (
                    <Table.Row
                      className="bg-white dark:border-gray-700 dark:bg-gray-800 capitalize"
                      key={_id}
                    >
                      <Table.Cell className="p-4">{id + 1}</Table.Cell>
                      <Table.Cell className=" shadow-md">
                        <div className="flex justify-center">
                          <img
                            src={image}
                            alt=""
                            className=" max-w-16 md:max-w-20 w-full"
                          />
                        </div>
                      </Table.Cell>
                      <Table.Cell className="font-semibold">{title}</Table.Cell>
                      <Table.Cell>{color}</Table.Cell>
                      <Table.Cell>{size}</Table.Cell>
                      <Table.Cell>{quantity}</Table.Cell>
                      <Table.Cell>${price}</Table.Cell>
                      <Table.Cell>
                        <div>
                          <button
                            className="text-xl md:text-2xl text-secondary-color hover:text-primary-color"
                            onClick={() => handleDelete(_id)}
                          >
                            <RiDeleteBin6Line />
                          </button>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  )
                )}

                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="p-4">{}</Table.Cell>
                  <Table.Cell></Table.Cell>
                  <Table.Cell></Table.Cell>
                  <Table.Cell></Table.Cell>
                  <Table.Cell></Table.Cell>
                  <Table.Cell className="text-base font-medium ">
                    Total Price
                  </Table.Cell>
                  <Table.Cell className="text-base font-medium">
                    <p className="flex gap-1">
                      <span> =</span> ${totalPrice}
                    </p>
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex gap-3">
                      <button className="text-white bg-primary-color hover:bg-secondary-color  px-4 py-1 rounded-md">
                        Checkout
                      </button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>
        )}
      </SectionWrapper>
    </section>
  );
};

export default MyCart;
