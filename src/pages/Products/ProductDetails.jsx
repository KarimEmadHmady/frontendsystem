import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useGetProductDetailsQuery } from "../../redux/api/productApiSlice";
import { useGetCategoryByIdQuery } from "../../redux/api/categoryApiSlice";
import { addToCart } from "../../redux/features/cart/cartSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { FaClock, FaStore, FaBarcode, FaFolder } from "react-icons/fa";
import moment from "moment";

const ProductDetails = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);

  const { data: categoryData, isLoading: categoryLoading } =
    useGetCategoryByIdQuery(product?.category, { skip: !product });

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product }));
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
        <div className="page-single-products flex flex-wrap relative items-start mt-[2rem] mr-[10rem] justify-around">
          <div className="w-full xl:w-[40rem] lg:w-[35rem] md:w-[30rem] sm:w-[20rem]">
            <img
              src={product.image}
              alt={product.name}
              className="w-full rounded-lg shadow-md"
            />
          </div>

          <div className="flex flex-col page-rtl gap-[13px] w-[30rem]">
            <h2 className="text-3xl font-bold">{product.name}</h2>
            <p className="text-4xl font-extrabold text-[#5f2476]">
              L.E {product.price}
            </p>

            <p className="my-2 flex items-center text-[#B0B0B0]">
              <FaBarcode className="ml-2 text-white" /> رقم السيريال:{" "}
              {product.serialnumber}
            </p>

            <p className="my-2 flex items-center text-[#B0B0B0]">
              <FaFolder className="ml-2 text-white" /> الفئة:{" "}
              {categoryLoading ? "تحميل..." : categoryData?.name || "غير معروف"}
            </p>
            <p className="my-2 flex items-center text-[#B0B0B0]">
              <FaStore className="ml-2 text-white" /> البراند: {product.brand}
            </p>
            <p className="my-2 flex items-center text-[#B0B0B0]">
              <FaClock className="ml-2 text-white" /> موعد الإضافة:{" "}
              {moment(product.createdAt).format("YYYY-MM-DD HH:mm:ss")}
            </p>

            <div className="btn-container mt-4">
              <button
                onClick={addToCartHandler}
                className="bg-[#5f2476] text-white py-2 px-6 rounded-lg hover:bg-[#4a1c5d] transition-all"
              >
                عمل طلب
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
