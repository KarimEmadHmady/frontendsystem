import { Link, useParams } from "react-router-dom";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { useGetOrderDetailsQuery} from "../../redux/api/orderApiSlice";

const Order = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  if (isLoading) return <Loader />;
  if (error) return <Message variant="danger">{error.data.message}</Message>;

  return (
    <div className="page-info-order container flex flex-col ml-[10rem] md:flex-row page-ltr">
      <div className="md:w-2/3 pr-4">
        <div className="border gray-300 mt-5 pb-4 mb-5">
          {order.orderItems.length === 0 ? (
            <Message>Order is empty</Message>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-[80%]">
                <thead className="border-b-2">
                  <tr>
                    <th className="p-2">صورة الامنتج </th>
                    <th className="p-2">اسم المنتج</th>
                    <th className="p-2">رقم السيريال</th>
                    <th className="p-2 text-center">الكمية</th>
                    <th className="p-2">التاريخ و الوقت</th>
                    <th className="p-2">الاجمالى</th>
                  </tr>
                </thead>

                <tbody>
                  {order.orderItems.map((item, index) => (
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
                      <td className="p-2 text-center">{item.serialnumber}</td>

                      <td className="p-2 text-center">{item.qty}</td>
                      <td className="p-2 text-center">
                        {new Date(order.createdAt).toLocaleString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </td>
                      <td className="p-2 text-center">
                        L.E {(item.qty * item.price).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <div className=" page-rtl page-order-info">
        <div className="mt-5 border-gray-300 pb-4 mb-4">
          <h2 className="text-xl font-bold mb-2">معلومات الطلب</h2>
          <p className="mb-4 mt-4">
            <strong className="text-[#5f2476]">رقم الطلب:  </strong> <div>{order._id}</div>
          </p>

          <p className="mb-4">
            <strong className="text-[#5f2476]">اسم المستخدم:</strong>{" "}
            {order.user.username}
          </p>

          <p className="mb-4">
            <strong className="text-[#5f2476]">البريد الالكترونى:</strong> {order.user.email}
          </p>

          <p className="mb-4">
            <strong className="text-[#5f2476]">اسم البراند:</strong>{" "}
            {order.orderItems.map((item, index) => (
              <span key={index}>
                {item.brand}
                {index !== order.orderItems.length - 1 && ", "}
              </span>
            ))}
          </p>

          <p className="mb-4">
            <strong className="text-[#5f2476]">معلومات:</strong>{" "}
            <p>رقم السيريال : {order.shippingAddress.address}</p>
            <p>اسم المنتج : {order.shippingAddress.city}</p>
            <p>اسم البائع: {order.shippingAddress.country}</p>
          </p>
        </div>

        <h2 className="text-xl font-bold mb-2 mt-[1rem]">ملخص الطلب</h2>

        <div className="flex justify-between mb-2">
          <span>اجمالى عدد المنتجات فى الطلب</span>
          <span>{order.orderItems.reduce((acc, item) => acc + item.qty, 0)}</span>
        </div>

        <div className="flex justify-between mb-2">
          <span>اسماء المنتجات المضافة فى الطلب</span>
          <span>{order.orderItems.map((item) => item.name).join(", ")}</span>
        </div>

        <div className="flex justify-between mb-2">
          <span>اجمالى السعر </span>
          <span>L.E {order.itemsPrice}</span>
        </div>
      </div>
    </div>
  );
};

export default Order;
