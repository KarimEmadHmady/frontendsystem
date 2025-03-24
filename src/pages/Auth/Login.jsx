import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { setCredentials, logout } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import Webcam from "react-webcam";
import { FaCamera } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(null);
  const webcamRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        () => {
          toast.error("فشل في تحديد الموقع الجغرافي.");
        }
      );
    } else {
      toast.error("الموقع الجغرافي غير مدعوم في هذا المتصفح.");
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!image) {
      toast.error("يرجى التقاط صورة لتسجيل الدخول.");
      return;
    }
    if (!location) {
      toast.error("يرجى السماح بالحصول على الموقع الجغرافي.");
      return;
    }

    try {
      const res = await login({ email, password, image, location }).unwrap();
      dispatch(setCredentials({ ...res }));
      localStorage.setItem("loginTime", Date.now());
      navigate(redirect);
    } catch (err) {
      console.error("🔴 خطأ في تسجيل الدخول:", err);
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (userInfo) {
      const loginTime = localStorage.getItem("loginTime");
      const currentTime = Date.now();
      const tenHours = 10 * 60 * 60 * 1000;

      if (loginTime && currentTime - loginTime >= tenHours) {
        dispatch(logout());
        toast.info("انتهت جلستك، يرجى تسجيل الدخول مرة أخرى.");
        navigate("/login");
      }
    }
  }, [userInfo, dispatch, navigate]);

  return (
    <div>
      <section className="pr-[10rem] flex flex-wrap page-login-container">
        <div className="ml-[4rem] mt-[5rem]">
          <h1 className="text-2xl font-semibold mb-4">تسجيل دخول</h1>
          <form
            onSubmit={submitHandler}
            className="container w-[40rem] class-page-login-reg"
          >
            <div className="my-[2rem]">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white"
              >
                البريد الالكترونى
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 p-2 border rounded w-full"
                placeholder="ادخل البريد الاكترونى"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white"
              >
                كلمة السر{" "}
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 p-2 border rounded w-full"
                placeholder="ادخل كلمة السر"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="border rounded w-full"
              />
              <button
                type="button"
                onClick={capture}
                className="mt-2 flex items-center justify-center gap-2 bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600 transition"
              >
                <FaCamera className="text-lg" />
                التقط صورة
              </button>
              {image && (
                <img src={image} alt="User" className="mt-2 rounded w-full" />
              )}
            </div>
            <div className="mb-4">
              <button
                type="button"
                onClick={getLocation}
                className="bg-green-500 flex items-center justify-center gap-2 text-white px-4 py-2 rounded shadow-md hover:bg-green-600 transition"
              >
                <FaMapMarkerAlt className="text-lg" />
                حدد موقعك
              </button>
              {location && (
                <p className="text-white mt-2">
                  موقعك: {location.latitude}, {location.longitude}
                </p>
              )}
            </div>
            <button
              disabled={isLoading}
              type="submit"
              className="bg-[#5f2476] text-white px-4 py-2 rounded cursor-pointer my-[1rem]"
            >
              {isLoading ? "تسجيل دخول..." : "تسجيل دخول"}
            </button>
            {isLoading && <Loader />}
          </form>
          <div className="mt-4">
            <p className="text-white">
              انشاء حساب جديد?{" "}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
                className="text-[#5f2476] hover:underline"
              >
                {" "}
                تسجيل{" "}
              </Link>
            </p>
          </div>
        </div>
        <img
          src="/imageicone.png"
          alt=""
          className="h-[65rem] w-[59%] xl:block md:hidden sm:hidden rounded-lg login-page-img"
        />
      </section>
    </div>
  );
};

export default Login;
