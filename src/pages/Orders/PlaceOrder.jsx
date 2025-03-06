import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import ProgressSteps from "../../components/ProgressSteps";
import Loader from "../../components/Loader";
import { useCreateOrderMutation } from "../../redux/api/orderApiSlice";
import { clearCartItems } from "../../redux/features/cart/cartSlice";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [createOrder, { isLoading, error }] = useCreateOrderMutation({
    fixedCacheKey: "orders",
  });

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    }
  }, [cart.shippingAddress.address, navigate]);


  const itemsPrice = cart.cartItems.reduce((acc, item) => acc + (Number(item.price) || 0), 0);


  const placeOrderHandler = async () => {
    try {
      const totalPrice = Number(itemsPrice.toFixed(2)); 
  
      if (isNaN(totalPrice)) {
        toast.error("خطأ في الحساب: الإجمالي غير صالح!");
        return;
      }
  
      const res = await createOrder({
        orderItems: cart.cartItems.map((item) => ({
          ...item,
          qty: 1, 
        })),
        shippingAddress: cart.shippingAddress,
        itemsPrice: totalPrice, 
        totalPrice,
      }).unwrap();
  
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (error) {
      toast.error("Error creating order: " + (error.data?.message || error.message));
    }
  };
  
  return (
    <>
      <ProgressSteps step1 step2 step3 />

      <div className="container mx-auto mt-8 page-ltr ">
        {cart.cartItems.length === 0 ? (
          <Message>Your cart is empty</Message>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <td className="px-1 py-2 text-left align-top">صورة المنتج</td>
                  <td className="px-1 py-2 text-left">اسم المنتج</td>
                  <td className="px-1 py-2 text-left"> رقم السيريال </td>
                  <td className="px-1 py-2 text-left">الإجمالي</td>
                </tr>
              </thead>

              <tbody>
                {cart.cartItems.map((item, index) => (
                  <tr key={index}>
                    <td className="p-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover"
                      />
                    </td>

                    <td className="p-2">
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </td>
                    <td className="p-2">{item.serialnumber}</td>
                    <td className="p-2">L.E {item.price.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-5 text-center">ملخص الطلب</h2>
          <div className="flex justify-between flex-wrap p-8 bg-[#181818] page-rtl">

          <div>
              <h2 className="text-2xl font-semibold mb-1">معلومات الطلب</h2>
              <p>
                <strong>تفاصيل الطلب:</strong>
                <p>رقم السيريال: {cart.shippingAddress.address}</p>
                <p>اسم المنتج: {cart.shippingAddress.city}</p>
                <p>اسم البائع: {cart.shippingAddress.country}</p>
              </p>
            </div>



            {error && <Message variant="danger">{error.data.message}</Message>}


            <ul className="text-lg">
              <li>
              <span className="font-semibold mb-4">عدد العناصر: </span> {cart.cartItems.length}

              </li>

              <li>
                <span className="font-semibold mb-4">الإجمالي:</span> جنيه {itemsPrice.toFixed(2)}
              </li>
            </ul>

          </div>

          <button
            type="button"
            className="bg-[#5f2476] text-white py-2 px-4 rounded-full text-lg w-full mt-4"
            disabled={cart.cartItems.length === 0}
            onClick={placeOrderHandler}
          >
            تأكيد الطلب
          </button>

          {isLoading && <Loader />}
        </div>
      </div>
    </>
  );
};

export default PlaceOrder;
