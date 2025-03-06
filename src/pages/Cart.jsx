import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { removeFromCart } from "../redux/features/cart/cartSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <>
      <div className="container flex justify-around items-start flex-wrap mx-auto mt-8  margine-btn-phone page-ltr   ">
        {cartItems.length === 0 ? (
          <div>
            لا يوجد منتجات مضافة لعمل طلب  
            <Link to="/addserialNumber" className="text-red-500 ml-2">
              اذهب لإضافة منتج
            </Link>
          </div>
        ) : (
          <>
            <div className="flex flex-col w-[80%] ">
              <h1 className="text-2xl font-semibold mb-4 text-center">طلب منتج</h1>

              {cartItems.map((item, index) => (
                  <div
                    key={item._id}
                    className={`flex items-center mb-[1rem] pb-2 border-b border-gray-600 rtl ${
                      index === cartItems.length - 1 ? "border-none" : ""
                    }`}
                  >
                    <div className="w-[5rem] h-[5rem]">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>

                    <div className="flex-1 mr-4">
                      <Link to={`/product/${item._id}`} className="text-[#5f2476]">
                       اسم المنتج: {item.name}
                      </Link>

                      <div className="mt-1 text-white"> اسم البراند: {item.brand}</div>
                      <p className="my-1 xl:w-[35rem] lg:w-[35rem] md:w-[30rem] text-[#B0B0B0]">
                        رقم السيريال: {item.serialnumber}
                      </p>
                      <div className="mt-2 text-white font-bold">السعر: {item.price} L.E</div>
                    </div>

                    <div className="btn-cart-width">
                      <button
                        className="text-[#5f2476] ml-[5rem]"
                        onClick={() => removeFromCartHandler(item._id)}
                      >
                        <FaTrash className="ml-[1rem] mt-[.5rem]" />
                      </button>
                    </div>
                  </div>
                ))}


              <div className="mt-8 w-[40rem]">
                <div className="p-4 rounded-lg">
                <h2 className="text-xl font-semibold mb-2">
                عدد المنتجات ({cartItems.length})
              </h2>

              <div className="text-2xl font-bold">
               اجمالى السعر: L.E {" "} 
                 {cartItems.reduce((acc, item) => acc + item.price, 0).toFixed(2)}
              </div>

                  <button
                    className="btn-cart bg-[#5f2476] mt-4 py-2 px-4 rounded-full text-lg w-full"
                    disabled={cartItems.length === 0}
                    onClick={checkoutHandler}
                  >
                    اكمل خطوات الطلب
                  </button>            
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;

