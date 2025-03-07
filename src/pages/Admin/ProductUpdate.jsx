// import { useState, useEffect } from "react";
// import AdminMenu from "./AdminMenu";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   useUpdateProductMutation,
//   useDeleteProductMutation,
//   useGetProductByIdQuery,
//   useUploadProductImageMutation,
// } from "../../redux/api/productApiSlice";
// import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
// import { toast } from "react-toastify";

// const AdminProductUpdate = () => {
//   const params = useParams();

//   const { data: productData } = useGetProductByIdQuery(params._id);

//   console.log(productData);

//   const [image, setImage] = useState(productData?.image || "");
//   const [name, setName] = useState(productData?.name || "");
//   const [serialnumber, setserialnumber] = useState(
//     productData?.serialnumber || ""
//   );
//   const [price, setPrice] = useState(productData?.price || "");
//   const [category, setCategory] = useState(productData?.category || "");
//   const [quantity, setQuantity] = useState(productData?.quantity || "");
//   const [brand, setBrand] = useState(productData?.brand || "");
//   const [stock, setStock] = useState(productData?.countInStock);

//   // hook
//   const navigate = useNavigate();

//   // Fetch categories using RTK Query
//   const { data: categories = [] } = useFetchCategoriesQuery();

//   const [uploadProductImage] = useUploadProductImageMutation();

//   // Define the update product mutation
//   const [updateProduct] = useUpdateProductMutation();

//   // Define the delete product mutation
//   const [deleteProduct] = useDeleteProductMutation();

//   useEffect(() => {
//     if (productData && productData._id) {
//       setName(productData.name);
//       setserialnumber(productData.serialnumber);
//       setPrice(productData.price);
//       setCategory(productData.category?._id);
//       setQuantity(productData.quantity);
//       setBrand(productData.brand);
//       setImage(productData.image);
//     }
//   }, [productData]);

//   const uploadFileHandler = async (e) => {
//     const formData = new FormData();
//     formData.append("image", e.target.files[0]);
//     try {
//       const res = await uploadProductImage(formData).unwrap();
//       toast.success("تمت إضافة المنتج بنجاح", {
//         position: toast.POSITION.TOP_RIGHT,
//         autoClose: 2000,
//       });
//       setImage(res.image);
//     } catch (err) {
//       toast.success("تمت إضافة المنتج بنجاح", {
//         position: toast.POSITION.TOP_RIGHT,
//         autoClose: 2000,
//       });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const formData = new FormData();
//       formData.append("image", image);
//       formData.append("name", name);
//       formData.append("serial number", serialnumber);
//       formData.append("price", price);
//       formData.append("category", category);
//       formData.append("quantity", quantity);
//       formData.append("brand", brand);
//       formData.append("countInStock", stock);

//       // Update product using the RTK Query mutation
//       const data = await updateProduct({ productId: params._id, formData });

//       if (data?.error) {
//         toast.error(data.error, {
//           position: toast.POSITION.TOP_RIGHT,
//           autoClose: 2000,
//         });
//       } else {
//         toast.success(`تم اضافة المنتج بنجاح`, {
//           position: toast.POSITION.TOP_RIGHT,
//           autoClose: 2000,
//         });
//         navigate("/admin/allproductslist");
//       }
//     } catch (err) {
//       console.log(err);
//       toast.error("فشل فى اضافة المنتج. حاول مرة أخرى.", {
//         position: toast.POSITION.TOP_RIGHT,
//         autoClose: 2000,
//       });
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       let answer = window.confirm(
//         "هل أنت متأكد أنك تريد حذف هذا المنتج؟?"
//       );
//       if (!answer) return;

//       const { data } = await deleteProduct(params._id);
//       toast.success(`"${data.name}" is deleted`, {
//         position: toast.POSITION.TOP_RIGHT,
//         autoClose: 2000,
//       });
//       navigate("/admin/allproductslist");
//     } catch (err) {
//       console.log(err);
//       toast.error("Delete failed. Try again.", {
//         position: toast.POSITION.TOP_RIGHT,
//         autoClose: 2000,
//       });
//     }
//   };

//   return (
//     <>
//       <div className="container  xl:mx-[9rem] sm:mx-[0]">
//         <div className="flex flex-col md:flex-row">
//           <AdminMenu />
//           <div className="md:w-3/4 p-3">
//             <div className="h-12">Update / Delete Product</div>

//             {image && (
//               <div className="text-center">
//                 <img
//                   src={image}
//                   alt="product"
//                   className="block mx-auto w-full h-[40%]"
//                 />
//               </div>
//             )}

//             <div className="mb-3">
//               <label className="text-white  py-2 px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
//                 {image ? image.name : "Upload image"}
//                 <input
//                   type="file"
//                   name="image"
//                   accept="image/*"
//                   onChange={uploadFileHandler}
//                   className="text-white"
//                 />
//               </label>
//             </div>

//             <div className="p-3">
//               <div className="flex flex-wrap">
//                 <div className="one">
//                   <label htmlFor="name">Name</label> <br />
//                   <input
//                     type="text"
//                     className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white mr-[5rem]"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                   />
//                 </div>

//                 <div className="two">
//                   <label htmlFor="name block">Price</label> <br />
//                   <input
//                     type="number"
//                     className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white "
//                     value={price}
//                     onChange={(e) => setPrice(e.target.value)}
//                   />
//                 </div>
//               </div>

//               <div className="flex flex-wrap">
//                 <div>
//                   <label htmlFor="name block">Quantity</label> <br />
//                   <input
//                     type="number"
//                     min="1"
//                     className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white mr-[5rem]"
//                     value={quantity}
//                     onChange={(e) => setQuantity(e.target.value)}
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="name block">Brand</label> <br />
//                   <input
//                     type="text"
//                     className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white "
//                     value={brand}
//                     onChange={(e) => setBrand(e.target.value)}
//                   />
//                 </div>
//               </div>

//               <label htmlFor="" className="my-5">
//               serial number
//               </label>  
//               <textarea
//                 type="text"
//                 className="p-2 mb-3 bg-[#101011]  border rounded-lg w-[95%] text-white"
//                 value={serialnumber}
//                 onChange={(e) => setserialnumber(e.target.value)}
//               />

//               <div className="flex justify-between">
//                 <div>
//                   <label htmlFor="name block">Count In Stock</label> <br />
//                   <input
//                     type="text"
//                     className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white "
//                     value={stock}
//                     onChange={(e) => setStock(e.target.value)}
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="">Category</label> <br />
//                   <select
//                     placeholder="Choose Category"
//                     className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white mr-[5rem]"
//                     onChange={(e) => setCategory(e.target.value)}
//                   >
//                     {categories?.map((c) => (
//                       <option key={c._id} value={c._id}>
//                         {c.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>

//               <div className="">
//                 <button
//                   onClick={handleSubmit}
//                   className="py-4 px-10 mt-5 rounded-lg text-lg font-bold  bg-green-600 mr-6"
//                 >
//                   Update
//                 </button>
//                 <button
//                   onClick={handleDelete}
//                   className="py-4 px-10 mt-5 rounded-lg text-lg font-bold  bg-[#5f2476]"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AdminProductUpdate;




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

      console.log("🚀 إرسال البيانات:", Object.fromEntries(formData.entries()));

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
                <option key={c._id} value={c._id}>{c.name}</option>
              ))}
            </select>

            <button onClick={handleSubmit} className="py-4 px-10 mt-5 rounded-lg bg-green-600">
              تحديث
            </button>
            <button onClick={handleDelete} className="py-4 px-10 mt-5 rounded-lg bg-red-600 ml-4">
              حذف
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProductUpdate;
