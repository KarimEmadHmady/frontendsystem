import { useState, useEffect } from "react";
import axios from "axios"; 
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../redux/features/shop/shopSlice";
import Loader from "../components/Loader";
import ProductCard from "./Products/ProductCard";

const Shop = () => {
  const dispatch = useDispatch();
  const { products, checked, radio } = useSelector((state) => state.shop);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductsById = async () => {
      try {
        setLoading(true);
        setTimeout(async () => {
          const { data } = await axios.get("https://backendsystem.vercel.app/api/products", {
            withCredentials: true, 
          });

          console.log("📦 المنتجات:", data); 
          dispatch(setProducts(data.products));
          setLoading(false);
        }, 2000); // تأخير لمدة ثانيتين
      } catch (err) {
        const errorMessage = err.response?.data?.message || "فشل في جلب المنتجات، ادخل السيريال و اسم البراند من صفحة اضافة منتج.";
        setError(errorMessage);
        console.error("❌ API Error:", errorMessage);
        setLoading(false);
      }
    };

    fetchProductsById();
  }, [checked, radio, dispatch]);

  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="container mx-auto margine-btn-phone">
      <div className="p-3 container-products-shoppage">
        <h2 className="h4 text-center mb-2">
          {products?.length} منتجات
        </h2>
        <div className="flex flex-wrap justify-center">
          {loading ? (
            <Loader className="text-center" />
          ) : products.length === 0 ? (
            <p className="text-center">لا توجد منتجات متاحة</p>
          ) : (
            products?.map((p) => (
              <div className="p-3" key={p._id}>
                <ProductCard p={p} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;

