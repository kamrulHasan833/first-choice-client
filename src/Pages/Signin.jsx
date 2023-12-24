import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import GoogleSignin from "../Components/Shared/GoogleSignin";
import Title from "../Components/Shared/Title";
import useAlert from "../Hooks/useAlert";
import useAuth from "../Hooks/useAuth";
const Signin = () => {
  const [error, setError] = useState(false);
  const [isShowPass, setIsShowPass] = useState(false);
  const { signin } = useAuth();
  const { state, pathname } = useLocation();
  const alert = useAlert();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // handle signup with email and password
  const handleSignin = async (data) => {
    setError(false);
    const { email, password } = data;
    try {
      const res = await signin(email, password);

      if (res.user) {
        alert("Signed in successfully", "success");
        if (!state) {
          navigate("/");
        } else {
          navigate(state);
        }
      }
    } catch (err) {
      if (err.message.includes("auth/invalid-login-credentials")) {
        setError(true);
        alert("Signed in failed.", "error");
      } else {
        alert("Signed in failed.", "error");
      }
    }
  };
  const wrongPass = errors?.password;
  const wrongPassType = wrongPass?.type;

  return (
    <>
      {pathname !== "/contact" && <Title title="Sign In" />}
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse w-full">
          <div className="bg-[url('https://unity-mates-server.vercel.app/images/authentication.png')] max-w-4xl w-full">
            <div className="card shrink-0 w-full max-w-4xl shadow-2xl rounded-none p-14 md:py-20 bg-primary-color bg-opacity-75">
              <h3 className="text-center text-3xl md:text-4xl lg:text-5xl text-white font-bold capitalize mb-6 ">
                sign in
              </h3>
              <GoogleSignin text="sign in with google" state={state} />
              <form className="card-body" onSubmit={handleSubmit(handleSignin)}>
                <div>
                  <div className="form-control">
                    <label className="label">
                      <p className="label-text text-white">
                        Email <span className="text-red-500 text-xl">*</span>
                      </p>
                    </label>
                    <input
                      type="email"
                      placeholder="email"
                      className="input input-bordered rounded-none"
                      {...register("email", { required: true })}
                    />
                    {errors.email && (
                      <p className="text-red-500">Email is required.</p>
                    )}
                  </div>
                  <div className="form-control relative">
                    <label className="label">
                      <p className="label-text text-white">
                        Password <span className="text-red-500 text-xl">*</span>
                      </p>
                    </label>
                    <input
                      type={isShowPass ? "text" : "password"}
                      placeholder="password"
                      className="input input-bordered rounded-none"
                      {...register("password", {
                        required: true,
                      })}
                    />

                    <p
                      onClickCapture={() => setIsShowPass(!isShowPass)}
                      className="absolute bottom-3 right-5 text-xl cursor-pointer"
                    >
                      {isShowPass ? <IoEyeOffOutline /> : <IoEyeOutline />}
                    </p>
                  </div>
                  {wrongPass && (
                    <p role="alert" className="text-red-500">
                      {wrongPassType === "required"
                        ? "Password is required."
                        : "uncaught error occurs."}
                    </p>
                  )}
                  {error && (
                    <p role="alert" className="text-red-500">
                      Email or Password {`wasn't matched.`}
                    </p>
                  )}
                </div>

                <div className="form-control  mt-10  items-center ">
                  <button className="btn btn-primary hover:text-title-color bg-primary-color border-none hover:bg-white text-white text-base px-10 md:px-14 py-2 rounded-full">
                    Sign in
                  </button>
                </div>
              </form>
              <p className="text-center text-title-color">
                {`Don't have an account? Please,`}{" "}
                <Link
                  to="/signup"
                  className="hover:underline text-white"
                  state={state}
                >
                  sign up.
                </Link>{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
