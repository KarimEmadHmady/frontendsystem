import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import HeartIcon from "./HeartIcon";

const ProductCard = ({ p }) => {
  const dispatch = useDispatch();

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
    toast.success("تمت إضافة المنتج بنجاح", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  };

  return (
    <div className="max-w-sm relative bg-[#1A1A1A] rounded-lg shaodw dark:bg-gray-800 dark:border-gray-700 w-[220px]">
      <section className="relative">
        <Link to={`/product/${p._id}`}>
          <span className="absolute bottom-3 right-3 bg-[#5f2476] text-[#5f2476] text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-[#5f2476] dark:text-[#fff]">
            {p?.brand}
          </span>
          <img
            className="cursor-pointer w-full"
            src={p.image}
            alt={p.name}
            style={{ height: "170px", objectFit: "cover" }}
          />
        </Link>
        <HeartIcon product={p} />
      </section>

      <div className="p-5">
        <div className="flex justify-between">
          <h5 className="mb-2 text-xl text-whiet dark:text-white">{p?.name}</h5>

          <p className="text-white font-semibold text-[#5f2476]">
            {p?.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "EGP",
            })}
          </p>
        </div>

        <p className="mb-3 font-normal text-[#CFCFCF]">
          سيريال: {p?.serialnumber}..
        </p>

        <section className="flex justify-between items-center">
          <Link
            to={`/product/${p._id}`}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#5f2476] rounded-lg hover:bg-[#5f2476] focus:ring-4 focus:outline-none focus:ring-[#5f2476] dark:bg-[#5f2476] dark:hover:bg-[#5f2476] dark:focus:ring-[#5f2476]"
          >
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
            المزيد
          </Link>

          <button
            className="p-2 rounded-full"
            onClick={() => addToCartHandler(p, 1)}
          >
            <AiOutlineShoppingCart size={25} />
          </button>
        </section>
      </div>
    </div>
  );
};

export default ProductCard;
