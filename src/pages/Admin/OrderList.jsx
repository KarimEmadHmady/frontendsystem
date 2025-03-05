import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "../../redux/api/orderApiSlice";
import AdminMenu from "./AdminMenu";
import { CSVLink } from "react-csv";
import axios from "axios";
import BASE_URL from "../../redux/constants";

const OrderList = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();
  console.log(orders);

  const deleteAllOrders = async () => {
    try {
      const token = localStorage.getItem("token"); // اجلب التوكن لو عندك نظام مصادقة
      const response = await axios.delete(`${BASE_URL}/api/orders`, {
        headers: {
          Authorization: `Bearer ${token}`, // أرسل التوكن مع الطلب
        },
      });

      alert(response.data.message); // عرض رسالة نجاح
    } catch (error) {
      console.error("🔴 خطأ أثناء حذف الطلبات:", error);
      alert("حدث خطأ أثناء حذف الطلبات.");
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <div className="container mx-auto page-ltr margine-btn-phone">
          <AdminMenu />

          <CSVLink
            data={orders.map((order) => ({
              "Order ID": order._id,
              "Username": order.user ? order.user.username : "N/A",
              "Total Price": `L.E ${order.totalPrice}`,
              "Date": new Date(order.createdAt).toLocaleString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              }),
              "Items": order.orderItems.map((item) => item.serialnumber).join(", "),
              "Brand": order.orderItems[0].brand,
            }))}
            filename="orders.csv"
            className="mb-4 p-2 bg-green-500 text-white rounded"
          >
            تحميل كـ Excel
          </CSVLink>

          <table className="w-full border-collapse border border-gray-300 mt-4">
            <thead className="w-full border">
              <tr className="mb-[5rem]">
                <th className="text-left pl-1">ITEMS</th>
                <th className="text-left pl-1">Serial Number</th>
                <th className="text-left pl-1">User</th>
                <th className="text-left pl-1">Brand</th>
                <th className="text-left pl-1">Date</th>
                <th className="text-left pl-1">Total</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>
                    <img
                      src={order.orderItems[0].image}
                      alt={order._id}
                      className="w-[5rem] pt-4"
                    />
                  </td>
                  <td>
                    {order.orderItems.map((item, index) => (
                      <div key={index}>{item.serialnumber}</div>
                    ))}
                  </td>
                  <td>{order.user ? order.user.username : "N/A"}</td>
                  <td>{order.orderItems[0].brand}</td>

                  <td className="py-2">
                    {new Date(order.createdAt).toLocaleString("en-US", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </td>

                  <td>L.E {order.totalPrice}</td>

                  <td>
                    <Link to={`/order/${order._id}`}>
                      <button className="bg-[#5f2476] text-white py-2 px-4 rounded hover:bg-[#5f2476]">
                        More
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-center items-center min-h-screen">
            <button
              onClick={deleteAllOrders}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300"
            >
              🗑️ حذف جميع الطلبات
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderList;
