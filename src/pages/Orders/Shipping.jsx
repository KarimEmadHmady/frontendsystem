import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../../redux/features/cart/cartSlice";
import ProgressSteps from "../../components/ProgressSteps";

const Shipping = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [serialNumber, setSerialNumber] = useState(shippingAddress.address || "");
  const [productName, setProductName] = useState(shippingAddress.city || "");
  const [salesman, setSalesman] = useState(shippingAddress.country || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      saveShippingAddress({
        address: serialNumber,
        city: productName,
        country: salesman,
      })
    );

    navigate("/placeorder");
  };

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [navigate, shippingAddress]);

  return (
    <div className="container mx-auto mt-10 px-5 margine-btn-phone">
      <ProgressSteps step1 step2 />
      <div className="mt-[10rem] flex justify-around items-center flex-wrap">
        <form onSubmit={submitHandler} className="w-[40rem]">
          <h1 className="text-2xl font-semibold mb-4 px-5">تضف المعلومات الاتية</h1>
          
          <div className="mb-4">
            <label className="block text-white mb-2"> رقم السيريال</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="ادخل رقم السيريال للمنتجات التى تريد عمل طلب بها"
              value={serialNumber}
              required
              onChange={(e) => setSerialNumber(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-white mb-2">اسم المنتج </label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="ادخل اسم للمنتجات التى تريد عمل طلب بها"
              value={productName}
              required
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-white mb-2">البائع</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="ادخل اسم البائع"
              value={salesman}
              required
              onChange={(e) => setSalesman(e.target.value)}
            />
          </div>

          <button
            className="bg-[#5f2476] text-white py-2 px-4 rounded-full text-lg w-full"
            type="submit"
          >
            تابع اكمال الطلب
          </button>
        </form>
      </div>
    </div>
  );
};

export default Shipping;
