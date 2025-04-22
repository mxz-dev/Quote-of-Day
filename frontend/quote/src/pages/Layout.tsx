import { Outlet, NavLink  } from "react-router-dom";
import { useSelector } from "react-redux";

function Layout() {
  const {isAuthenticated} = useSelector((state)=> state.auth)

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark w-100 position-absolute top-0">
        <div className="container">
          <a className="navbar-brand" href="#">
            Quote App
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                {
                isAuthenticated ? 
                <NavLink  className="btn btn-outline-light me-2" to="/logout">
                  Logout
                </NavLink> 
                :
                <NavLink  className="btn btn-outline-light me-2" to="/login">
                  Login
                </NavLink> 
                }
              </li>
              <li className="nav-item">
                <NavLink  className="btn btn-light" to="/signup">
                  Sign Up
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
}
export default Layout;
