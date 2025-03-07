import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

import { useGetUsersQuery } from "../../redux/api/usersApiSlice";
import {
  useGetTotalOrdersQuery,
  useGetTotalSalesByDateQuery,
  useGetTotalSalesQuery,
} from "../../redux/api/orderApiSlice";

import { FaUsers, FaMoneyBillWave, FaClipboardList } from "react-icons/fa";
import AdminMenu from "./AdminMenu";
import OrderList from "./OrderList";
import Loader from "../../components/Loader";

const AdminDashboard = () => {
  const { data: sales, isLoading } = useGetTotalSalesQuery();
  const { data: customers, isLoading: loading } = useGetUsersQuery();
  const { data: orders, isLoading: loadingTwo } = useGetTotalOrdersQuery();
  const { data: salesDetail } = useGetTotalSalesByDateQuery();

  const [chartData, setChartData] = useState({
    series: [{ name: "المبيعات", data: [] }],
    options: {
      chart: { type: "bar", height: 350 },
      xaxis: { categories: [] },
    },
  });

  useEffect(() => {
    
    if (salesDetail && salesDetail.length > 0) {
      const formattedSalesDate = salesDetail.map((item) => ({
        x: item._id,
        y: item.totalSales,
      }));
  
      setChartData({
        series: [{ name: "المبيعات", data: formattedSalesDate.map((item) => item.y) }],
        options: {
          chart: { type: "bar", height: 350 },
          xaxis: { categories: formattedSalesDate.map((item) => item.x) },
        },
      });
    } else {
      setChartData({
        series: [{ name: "المبيعات", data: [10, 20, 30, 40, 50] }],
        options: {
          chart: { type: "bar", height: 350 },
          xaxis: { categories: ["يناير", "فبراير", "مارس", "أبريل", "مايو"] },
        },
      });
    }
  }, [salesDetail]);
  

  return (
    <>
      <AdminMenu />

      <section className="xl:ml-[4rem] md:ml-[0rem] page-ltr margine-btn-phone p-[10px]">
        <div className="page-dashboard w-[80%] flex justify-around flex-wrap">
          <div className="rounded-lg bg-black p-5 w-[20rem] mt-5">
            <div className="font-bold rounded-full w-[3rem] bg-[#5f2476] text-center p-3">
            
            <FaMoneyBillWave size={25} />
            
            </div>
            <p className="mt-5">اجمالى المبيعات</p>
            <h1 className="text-xl font-bold">
              EGP {isLoading ? <Loader /> : sales?.totalSales?.toFixed(2) || 0}
            </h1>
          </div>
          <div className="rounded-lg bg-black p-5 w-[20rem] mt-5">
            <div className="font-bold rounded-full w-[3rem] bg-[#5f2476] text-center p-3">
            <FaUsers size={25} />
            </div>
            <p className="mt-5">عدد المستخدمين</p>
            <h1 className="text-xl font-bold">
              {loading ? <Loader /> : customers?.length || 0}
            </h1>
          </div>
          <div className="rounded-lg bg-black p-5 w-[20rem] mt-5">
            <div className="font-bold rounded-full w-[3rem] bg-[#5f2476] text-center p-3">
            <FaClipboardList size={25} />
            </div>
            <p className="mt-5">عدد الاوردرات</p>
            <h1 className="text-xl font-bold">
              {loadingTwo ? <Loader /> : orders?.totalOrders || 0}
            </h1>
          </div>
        </div>

        {/* 🔹 رسم المخطط الديناميكي */}
        <div className="page-dashboard-chart ml-[10rem] mt-[4rem]">
          <ReactApexChart options={chartData.options} series={chartData.series} type="bar" width="90%" />
        </div>

        <div className="mt-[4rem]">
          <OrderList />
        </div>
      </section>
    </>
  );
};

export default AdminDashboard;
