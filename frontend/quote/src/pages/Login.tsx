import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { loginUser} from "../store/authSlice";
import { AppDispatch } from "../store/store";
// import { RootState } from "../store/store";
// import { useEffect, useState } from "react";

interface FormData {
  username: string;
  password: string;
}

function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated } = useSelector((state: any) => state.auth);

  const schema = yup.object().shape({
    username: yup.string().required("Username is required"),
    password: yup
      .string()
      .required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema) });
  const onFormSubmit = (data: FormData) => {
      dispatch(loginUser({ username: data.username, password: data.password }));
  };
    if (isAuthenticated){
      window.location.href = "/"
    }else{
    return (
      <>
        <div className="d-flex justify-content-center align-items-center vh-100 bg-gray bg-gradient">
          <div className="container text-center  w-25 bg-light shadow-lg p-4 rounded">
            <h2>Login</h2>
            <form
              onSubmit={handleSubmit(onFormSubmit)}
              method="POST"
              className="mt-5"
            >
              <div className="input-group input-group-sm mb-3">
                <span className="input-group-text" id="username">
                  username
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
                  password
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
              <button className="btn btn-outline btn-success">Login</button>
            </form>
          </div>
        </div>
      </>
    );}
  }
export default Login;
