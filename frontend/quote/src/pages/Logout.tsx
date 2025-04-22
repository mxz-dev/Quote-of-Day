import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../store/store";
import { logoutUser } from "../store/authSlice";

export default function Logout() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = async () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  if (isAuthenticated) {
    return (
      <>
        <div className="container d-flex justify-content-center align-items-center vh-100">
          <div
            className="card shadow p-4"
            style={{ maxWidth: "400px", width: "100%" }}
          >
            <h4 className="text-center mb-4">
              Are you sure you want to logout?
            </h4>
            <div className="d-flex justify-content-between">
              <button className="btn btn-danger w-45" onClick={handleLogout}>
                Yes, Logout
              </button>
              <button
                className="btn btn-secondary w-45"
                onClick={() => navigate(-1)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    navigate("/login");
  }
}
