import { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import { useNavigate, useParams } from "react-router-dom";
import {
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";

const AdminProductUpdate = () => {
  const params = useParams();

  const { data: productData } = useGetProductByIdQuery(params._id);

  const [image, setImage] = useState(productData?.image || "");
  const [name, setName] = useState(productData?.name || "");
  const [serialnumber, setSerialNumber] = useState(
    productData?.serialnumber || ""
  );
  const [price, setPrice] = useState(productData?.price || "");
  const [category, setCategory] = useState(productData?.category || "");
  const [brand, setBrand] = useState(productData?.brand || "");

  const navigate = useNavigate();

  const { data: categories = [] } = useFetchCategoriesQuery();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  useEffect(() => {
    if (productData && productData._id) {
      setName(productData.name);
      setSerialNumber(productData.serialnumber);
      setPrice(productData.price);
      setCategory(productData.category?._id);
      setBrand(productData.brand);
      setImage(productData.image);
    }
  }, [productData]);

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success("تمت إضافة الصورة بنجاح", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      setImage(res.image);
    } catch (err) {
      toast.error("فشل في رفع الصورة", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", name);
      formData.append("serialnumber", serialnumber);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("brand", brand);

      const data = await updateProduct({ productId: params._id, formData });

      if (data?.error) {
        toast.error(data.error, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
      } else {
        toast.success(`تم تحديث المنتج بنجاح`, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
        navigate("/admin/allproductslist");
      }
    } catch (err) {
      toast.error("فشل في تحديث المنتج. حاول مرة أخرى.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  const handleDelete = async () => {
    try {
      let answer = window.confirm("هل أنت متأكد أنك تريد حذف هذا المنتج؟");
      if (!answer) return;

      const { data } = await deleteProduct(params._id);
      toast.success(`تم حذف المنتج بنجاح`, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      navigate("/admin/allproductslist");
    } catch (err) {
      toast.error("فشل في حذف المنتج. حاول مرة أخرى.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="container xl:mx-[9rem] sm:mx-[0] margine-btn-phone">
      <div className="flex flex-col md:flex-row">
        <AdminMenu />
        <div className="md:w-3/4 p-3">
          <h2 className="h-12">تحديث / حذف المنتج</h2>

          {image && (
            <div className="text-center">
              <img
                src={image}
                alt="product"
                className="block mx-auto w-full h-[40%]"
              />
            </div>
          )}

          <div className="mb-3">
            <label className="py-2 px-4 block w-full text-center rounded-lg cursor-pointer font-bold">
              {image ? image.name : "رفع صورة"}
              <input
                type="file"
                accept="image/*"
                onChange={uploadFileHandler}
                className="hidden"
              />
            </label>
          </div>

          <div className="p-3">
            <label>اسم المنتج</label>
            <input
              type="text"
              className="p-4 mb-3 w-full border rounded-lg bg-[#101011] text-white"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label>السعر</label>
            <input
              type="number"
              className="p-4 mb-3 w-full border rounded-lg bg-[#101011] text-white"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <label>العلامة التجارية</label>
            <input
              type="text"
              className="p-4 mb-3 w-full border rounded-lg bg-[#101011] text-white"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />

            <label>الرقم التسلسلي</label>
            <input
              type="text"
              className="p-4 mb-3 w-full border rounded-lg bg-[#101011] text-white"
              value={serialnumber}
              onChange={(e) => setSerialNumber(e.target.value)}
            />

            <label>الفئة</label>
            <select
              className="p-4 mb-3 w-full border rounded-lg bg-[#101011] text-white"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>

            <button
              onClick={handleSubmit}
              className="py-4 px-10 mt-5 rounded-lg bg-green-600"
            >
              تحديث
            </button>
            <button
              onClick={handleDelete}
              className="py-4 px-10 mt-5 rounded-lg bg-red-600 ml-4"
            >
              حذف
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProductUpdate;
