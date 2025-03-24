import { Link } from "react-router-dom";
import moment from "moment";
import { useAllProductsQuery } from "../../redux/api/productApiSlice";
import AdminMenu from "./AdminMenu";
import { CSVLink } from "react-csv";

const AllProducts = () => {
  const { data: products, isLoading, isError } = useAllProductsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading products</div>;
  }

  return (
    <>
      <div className="container mx-[9rem] cargorylist-page page-ltr margine-btn-phone">
        <div className="flex flex-col md:flex-row">
          <div className="p-3">
            <div className="ml-[2rem] text-xl font-bold h-12 text-center">
              All Products ({products.length})
            </div>

            <CSVLink
              data={products.map((product) => ({
                "Product Name": product.name,
                "Serial Number": product.serialnumber,
                Brand: product?.brand || "N/A",
                "Date of Creation": moment(product.createdAt).format(
                  "MMMM Do YYYY"
                ),
                Price: `L.E ${product.price}`,
              }))}
              filename="all_products.csv"
              className="mb-4 inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-green-500 rounded-lg hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-500"
            >
              تحميل المنتجات كـ Excel
            </CSVLink>

            <div className="flex flex-wrap justify-around items-center flex-col">
              {products.map((product) => (
                <Link
                  key={product._id}
                  to={`/admin/product/update/${product._id}`}
                  className="block mb-4 overflow-hidden"
                >
                  <div className="flex line-borderr items-center ">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-[10rem] object-cover image-allproduct-page"
                    />
                    <div className="p-4 flex flex-col justify-around">
                      <div className="flex justify-between flex-col">
                        <h5 className="text-xl font-semibold mb-2 font-allproduct-page">
                          {product?.name}
                        </h5>

                        <p className="text-gray-400 text-xs mb-4">
                          Date of creation:{" "}
                          {moment(product.createdAt).format("MMMM Do YYYY")}
                        </p>
                      </div>

                      <p className="text-gray-400 xl:w-[30rem] lg:w-[30rem] md:w-[20rem] sm:w-[10rem] text-sm mb-4">
                        Serial Number:{" "}
                        {product?.serialnumber?.substring(0, 160)}
                      </p>

                      <div className="flex justify-between align-center">
                        <Link
                          to={`/admin/product/update/${product._id}`}
                          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#5f2476] rounded-lg hover:bg-[#5f2476] focus:ring-4 focus:outline-none focus:ring-[#5f2476] dark:bg-[#5f2476] dark:hover:bg-[#5f2476] dark:focus:ring-[#5f2476]"
                        >
                          Update Product
                          <svg
                            className="w-3.5 h-3.5 ml-2"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M1 5h12m0 0L9 1m4 4L9 9"
                            />
                          </svg>
                        </Link>
                        <p className="ml-[5px]">L.E {product?.price}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="md:w-1/4 p-3 mt-2">
            <AdminMenu />
          </div>
        </div>
      </div>
    </>
  );
};

export default AllProducts;
