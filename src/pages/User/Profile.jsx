import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import Loader from "../../components/Loader";
import { useProfileMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { Link } from "react-router-dom";

const Profile = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  useEffect(() => {
    setUserName(userInfo.username);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.username]);

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          username,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Profile updated successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4 mt-[10rem]">
      <div className="flex justify-center align-center md:flex md:space-x-4">
        <div className="md:w-1/3">
          <h2 className="text-2xl font-semibold mb-4">تحديث الملف الشخصي</h2>
          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <label className="block text-white mb-2">الاسم</label>
              <input
                type="text"
                placeholder="ادخل الاسم هنا "
                className="form-input p-4 rounded-sm w-full"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-white mb-2">البريد الالكترونى</label>
              <input
                type="email"
                placeholder="ادخل البريد"
                className="form-input p-4 rounded-sm w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-white mb-2">الرقم السرى</label>
              <input
                type="password"
                placeholder="ادخل الرقم السرى "
                className="form-input p-4 rounded-sm w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-white mb-2">تأكيد الرقم السرى</label>
              <input
                type="password"
                placeholder="اعادة كتابة الرقم السرى"
                className="form-input p-4 rounded-sm w-full"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-[#5f2476] text-white py-2 px-4 rounded hover:bg-[#5f2476]"
              >
                تحديث
              </button>

              <Link
                to="/user-orders"
                className="bg-[#5f2476] text-white py-2 px-4 rounded hover:bg-[#5f2476]"
              >
                الطلبات الخاصة بى 
              </Link>
            </div>
            {loadingUpdateProfile && <Loader />}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
