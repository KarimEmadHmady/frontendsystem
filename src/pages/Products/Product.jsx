import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const Product = ({ product }) => {
  console.log(product);
  return (
    <div className="small-product-header w-[30rem] ml-[2rem] p-3 relative">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-[30rem] rounded"
        />
        <HeartIcon product={product} />
      </div>

      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h2 className="flex justify-between items-center">
            <div className="text-lg">{product.name}</div>
            <span className="bg-[#5f2476] text-[#fff] text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-[#5f2476] dark:text-[#fff]">
              L.E {product.price}
            </span>
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default Product;
