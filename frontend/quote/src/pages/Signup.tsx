import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  email: yup.string().email("Email is invalid").required("Email is required"),
  first_name: yup.string().required("First Name is required"),
  last_name: yup.string().required("Last Name is required"),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
      "Password must be at least 8 characters, include uppercase, lowercase, number, and special character"
    )
    .required("Password is required"),
  password_2: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});
function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const onFormSubmit = (data: object) => {
    console.log(data);
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100 bg-gray bg-gradient mt-5">
        <div className="container text-center  w-25 bg-light shadow-lg p-4 rounded ">
          <h2>Signup</h2>
          <form
            onSubmit={handleSubmit(onFormSubmit)}
            method="POST"
            className="mt-5"
          >
            <div className="input-group input-group-sm mb-3">
              <span className="input-group-text" id="fname">
                First Name
              </span>
              <input
                type="text"
                className={`form-control ${
                  errors.first_name ? "is-invalid" : ""
                }`}
                aria-label="firstname"
                {...register("first_name")}
                placeholder="John"
                aria-describedby="fname"
              />
              {errors.first_name && (
                <div className="invalid-feedback">
                  {errors.first_name.message}
                </div>
              )}
            </div>
            <div className="input-group input-group-sm mb-3">
              <span className="input-group-text" id="lname">
                Last Name
              </span>
              <input
                type="text"
                className={`form-control ${
                  errors.last_name ? "is-invalid" : ""
                }`}
                aria-label="lastname"
                {...register("last_name")}
                placeholder="Doe"
                aria-describedby="lname"
              />
              {errors.last_name && (
                <div className="invalid-feedback">
                  {errors.last_name.message}
                </div>
              )}
            </div>
            <div className="input-group input-group-sm mb-3">
              <span className="input-group-text" id="email">
                Email
              </span>
              <input
                type="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                aria-label="email"
                {...register("email")}
                placeholder="email@mail.com"
                aria-describedby="email"
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email.message}</div>
              )}
            </div>
            <div className="input-group input-group-sm mb-3">
              <span className="input-group-text" id="username">
                Username
              </span>
              <input
                type="text"
                className={`form-control ${
                  errors.username ? "is-invalid" : ""
                }`}
                aria-label="username"
                {...register("username")}
                placeholder="@username"
                aria-describedby="username"
              />
              {errors.username && (
                <div className="invalid-feedback">
                  {errors.username.message}
                </div>
              )}
            </div>
            <div className="input-group input-group-sm mb-3">
              <span className="input-group-text" id="password">
                Password
              </span>
              <input
                type="password"
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
                aria-label="password"
                {...register("password")}
                placeholder="********"
                aria-describedby="password"
              />
              {errors.password && (
                <div className="invalid-feedback">
                  {errors.password.message}
                </div>
              )}
            </div>
            <div className="input-group input-group-sm mb-3">
              <span className="input-group-text" id="cpassword">
                confirm password
              </span>
              <input
                type="password"
                className={`form-control ${
                  errors.password_2 ? "is-invalid" : ""
                }`}
                aria-label="password"
                {...register("password_2")}
                placeholder="********"
                aria-describedby="cpassword"
              />
              {errors.password_2 && (
                <div className="invalid-feedback">
                  {errors.password_2.message}
                </div>
              )}
            </div>
            <button className="btn btn-outline btn-success">Signup</button>
          </form>
        </div>
      </div>
    </>
  );
}
export default Signup;
