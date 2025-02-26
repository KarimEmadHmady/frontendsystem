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



  useEffect(() => {
    const fetchProductsById = async () => {
      try {
        const { data } = await axios.get("https://backendsystem-nrel836dl-karims-projects-c3a021f0.vercel.app/api/products", {
          withCredentials: true, // ✅ علشان يرسل الكوكيز
        });
  
        console.log("📦 المنتجات:", data); // ✅ تأكد إن المنتجات بتيجي صح
        dispatch(setProducts(data.products));
      } catch (err) {
        setError("فشل في جلب المنتجات، حاول لاحقًا.");
        console.error("❌ API Error:", err.response?.data || err.message);
      }
    };
  
    fetchProductsById();
  }, [checked, radio, dispatch]);
  


  


  if (error) return <p>{error}</p>;

  return (
    <div className={`container mx-auto`}>
      <div className="p-3 container-products-shoppage">
        <h2 className="h4 text-center mb-2">
          {products?.length} Products
        </h2>
        <div className="flex flex-wrap justify-center">
          {products.length === 0 ? (
            <Loader className="text-center" />
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
