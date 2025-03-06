import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetProductDetailsQuery,
} from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStore,
} from "react-icons/fa";
import moment from "moment";


import { addToCart } from "../../redux/features/cart/cartSlice";

const ProductDetails = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);


  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  return (
    <div className="page-ltr">
      <div>
        <Link
          to="/shop"
          className="text-white font-semibold hover:underline ml-[10rem] text-center"
        >
          جميع المنتجات 
        </Link>
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <>
          <div className="page-single-products flex flex-wrap relative items-between mt-[2rem] mr-[10rem] justify-around">
            <div>
              <img
                src={product.image}
                alt={product.name}
                className="w-full xl:w-[50rem] lg:w-[45rem] md:w-[30rem] sm:w-[20rem] mr-[2rem]"
              />
            </div>

            <div className="flex flex-col page-rtl gap-[13px]  ">
              <h2 className="text-2xl font-semibold">{product.name}</h2>
              <p className="my-4  text-[#B0B0B0]">
                  رقم السيريال:   {product.serialnumber} 
              </p>


              <p className="text-5xl my-4 font-extrabold">L.E {product.price}</p>

              <div className="page-product-propertes flex  w-[20rem]">
                <div className="page-product-propertes-one one">
                  <h1 className="flex items-center mb-6 ">
                    <FaStore className="ml-2 text-white" /> البراند:{" "}
                    {product.brand}
                  </h1>
                  <h1 className="flex items-center mb-6 w-[20rem]">
                    <FaClock className="ml-2 text-white" /> موعد اضافة المنتج:{" "}
                    {moment(product.createdAt).format("YYYY-MM-DD HH:mm:ss")}
                  </h1>
                </div>

                <div className="two">
                  <h1 className="flex items-center mb-6">
                    <FaShoppingCart className="ml-2 text-white" /> الكمية:{" "}
                    {product.quantity}
                  </h1>
                  <h1 className="flex items-center mb-6 w-[10rem]">
                    <FaBox className="ml-2 text-white" /> فى المخزن:{" "}
                    {product.countInStock}
                  </h1>
                </div>
              </div>

              <div className="flex justify-between flex-wrap">

                {product.countInStock > 0 && (
                  <div>
                    <select
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                      className="p-2 w-[6rem] rounded-lg text-black"
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div className="btn-container">
                <button
                  onClick={addToCartHandler}
                  disabled={product.countInStock === 0}
                  className="bg-[#5f2476] text-white py-2 px-4 rounded-lg mt-4 md:mt-0"
                >
                  عمل طلب
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetails;
