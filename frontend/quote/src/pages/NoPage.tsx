import {Link} from "react-router-dom";
export default function NoPage() {
  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
        <h1 className="display-1 text-danger fw-bold">404</h1>
        <h2 className="text-dark">Oops! Page Not Found</h2>
        <p className="text-muted">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn btn-primary mt-3">
          Go Home
        </Link>
      </div>
    </>
  );
}
