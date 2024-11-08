import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // To navigate after logout

  const handleLogout = () => {
    dispatch(logout()); // No need to pass event or user here
    navigate("/login"); // Redirect to login after logout
  };
  return (
    <div className="border header flex justify-between items-center px-4 sticky top-0 z-50 bg-white">
      <div>
        <Link
          aria-current="page"
          className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700  active"
          to={"alllesson"}
        >
          <span className="ml-3">All lesson</span>
        </Link>
      </div>
      <b>Bài thực hành react ( ts required )</b>

      <button
        onClick={handleLogout}
        className="bg-blue-400 text-white text-sm px-3 rounded py-2 h-fit"
      >
        Logout
      </button>
    </div>
  );
};

export default Header;
