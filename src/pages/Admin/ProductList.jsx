import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";

const ProductList = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [serialnumber, setserialnumber] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useFetchCategoriesQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("image", imageUrl);
      productData.append("name", name);
      productData.append("serialnumber", serialnumber);
      productData.append("price", price);
      productData.append("category", category);

      const { data } = await createProduct(productData);

      if (data.error) {
        toast.error("فشل إنشاء المنتج. حاول مرة أخرى.");
      } else {
        toast.success(`${data.name} is created`);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("فشل إنشاء المنتج. حاول مرة أخرى.");
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);

      setImage(res.imageUrl);
      setImageUrl(res.imageUrl);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  useEffect(() => {
    if (categories?.length > 0) {
      setCategory(categories[0]._id);
    }
  }, [categories]);

  return (
    <div className="container xl:mx-[9rem] sm:mx-[0] contproductlist-page page-ltr margine-btn-phone">
      <div className="flex flex-col md:flex-row">
        <AdminMenu />
        <div className="md:w-3/4 p-3">
          <div className="h-12 text-center">Create Product</div>

          {imageUrl && (
            <div className="text-center">
              <img
                src={imageUrl}
                alt="product"
                className="block mx-auto max-h-[200px]"
              />
            </div>
          )}

          <div className="mb-3">
            <label className="border text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
              {image ? image.name : "Upload Image"}
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={uploadFileHandler}
                className={!image ? "hidden" : "text-white"}
              />
            </label>
          </div>

          <div className="p-3 mb-[70px]">
            <div className="flex flex-wrap">
              <div className="one">
                <label htmlFor="name">Name</label> <br />
                <input
                  type="text"
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="two ml-[10px] sm:ml-0">
                <label htmlFor="name block">Price</label> <br />
                <input
                  type="number"
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>

            <label htmlFor="" className="my-5">
              Serial Number
            </label>
            <textarea
              type="text"
              className="p-2 mb-3 bg-[#101011] border rounded-lg w-[95%] text-white"
              value={serialnumber}
              onChange={(e) => setserialnumber(e.target.value)}
            ></textarea>

            <div>
              <label htmlFor="category">Category</label> <br />
              <select
                id="category"
                className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white select-Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories?.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleSubmit}
              className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-[#5f2476]"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
