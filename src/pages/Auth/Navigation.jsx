import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaPlusCircle } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Navigation.css";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const location = useLocation();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{ zIndex: 9999 }}
      className={`${
        showSidebar ? "hidden" : "flex"
      } xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 text-white bg-[#000] w-[4%] hover:w-[15%] h-[100vh] fixed`}
      id="navigation-container"
    >
      <div className="flex flex-col justify-center navigation-container-menu">
        <Link
          to="/"
          className="flex items-center transition-transform transform hover:opacity-80"
        >
          <AiOutlineHome className="icone-menu-home ml-2 mt-[3rem]" size={26} />
          <span className=" nav-item-name mt-[3rem]">الرئيسية</span>
        </Link>

        <Link
          to="/shop"
          className="flex items-center transition-transform transform hover:opacity-80"
        >
          <AiOutlineShopping
            className="icone-menu-home ml-2 mt-[3rem]"
            size={26}
          />
          <span className=" nav-item-name mt-[3rem]">المنتجات</span>
        </Link>

        <Link to="/cart" className="flex relative">
          <div className=" navigation-container-menu-other flex items-center transition-transform transform hover:opacity-80">
            <AiOutlineShoppingCart
              className="icone-menu-home mt-[3rem] ml-2"
              size={26}
            />
            <span className=" nav-item-name mt-[3rem]">السلة</span>
          </div>

          <div className="absolute top-9 cart-phone-counter">
            {cartItems.length > 0 && (
              <span>
                <span className="px-1 py-0 text-sm text-white bg-[#5f2476] rounded-full">
                  {cartItems.length}
                </span>
              </span>
            )}
          </div>
        </Link>

        <Link to="/addserialNumber" className="flex relative">
          <div className="navigation-container-menu-other flex justify-center items-center transition-transform transform hover:opacity-80">
            <FaPlusCircle
              className="icone-menu-home mt-[3rem] ml-2"
              size={20}
            />
            <span className=" nav-item-name mt-[3rem]">إضافة منتج</span>
            {/* <FavoritesCount /> */}
          </div>
        </Link>
      </div>

      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="btn-profile-menu flex items-center text-gray-800 focus:outline-none"
        >
          {userInfo ? (
            <span className="text-white">{userInfo.username}</span>
          ) : (
            <></>
          )}
          {userInfo && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 ml-1 ${
                dropdownOpen ? "transform rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
              />
            </svg>
          )}
        </button>

        {dropdownOpen && userInfo && (
          <ul
            className={`navi-users absolute -mt-[4.1rem] ml-14 space-y-2 bg-[#000] text-[#5f2476] ${
              !userInfo.isAdmin ? "-top-20" : "-top-80"
            }`}
          >
            {userInfo.isAdmin && (
              <>
                <li>
                  <Link
                    to="/admin/dashboard"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    لوحة التحكم
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/productlist"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    إضافة منتج
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/categorylist"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    التصنيفات
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/orderlist"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    الطلبات
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/userlist"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    المستخدمون
                  </Link>
                </li>
              </>
            )}

            <li>
              <Link
                to="/addserialNumber"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                إضافة منتج
              </Link>
            </li>
            <li>
              <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">
                الملف الشخصي
              </Link>
            </li>
            <li>
              <button
                onClick={logoutHandler}
                className="block w-full px-4 py-2 text-right hover:bg-gray-100"
              >
                تسجيل الخروج
              </button>
            </li>
          </ul>
        )}
        {!userInfo && (
          <ul>
            <li>
              <Link
                to="/login"
                className="flex items-center mt-5 transition-transform transform hover:opacity-80"
              >
                <AiOutlineLogin className="mr-2 mt-[4px]" size={26} />
                <span className="hidden nav-item-name">تسجيل الدخول</span>
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="flex items-center mt-5 transition-transform transform hover:opacity-80"
              >
                <AiOutlineUserAdd size={26} />
                <span className="hidden nav-item-name">إنشاء حساب</span>
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navigation;
