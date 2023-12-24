import { updateProfile } from "firebase/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import GoogleSignin from "../Components/Shared/GoogleSignin";
import Title from "../Components/Shared/Title";
import useAlert from "../Hooks/useAlert";
import useAuth from "../Hooks/useAuth";
import useAxiosPublic from "../Hooks/useAxiosPublic";
const Signup = () => {
  const { signup, auth } = useAuth();
  const { state } = useLocation();

  const axiosPulic = useAxiosPublic();
  const alert = useAlert();

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // handle signup with email and password
  const handleSignup = async (data) => {
    const { name, image, email, password } = data;
    try {
      const res = await signup(email, password);

      if (res.user) {
        await updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: image,
        });
        const userInfo = { name, avatar: image, email, user_type: "ordinary" };
        const res2 = await axiosPulic.post("/first-choice/v1/users", userInfo);
        if (res2.data._id || res2.data.status === 409) {
          alert("Signed up successfully", "success");
          if (!state) {
            navigate("/");
          } else {
            navigate(state);
          }
        }
      }
    } catch (err) {
      if (err.message.includes("auth/email-already-in-use")) {
        alert("User already exist.", "error");
        if (!state) {
          navigate("/");
        } else {
          navigate(state);
        }
      } else {
        alert("Signed up failed.", "error");
      }
    }
  };
  const wrongPass = errors?.password;
  const wrongPassType = wrongPass?.type;

  const [isShowPass, setIsShowPass] = useState(false);
  return (
    <>
      <Title title="Sign Up" />
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse w-full">
          <div className="bg-[url('https://unity-mates-server.vercel.app/images/authentication.png')] max-w-4xl w-full ">
            <div className="card shrink-0 w-full max-w-4xl shadow-2xl rounded-none p-14 md:py-20 bg-primary-color bg-opacity-75">
              <h3 className="text-center text-3xl md:text-4xl lg:text-5xl text-white font-bold capitalize mb-6 ">
                sign up
              </h3>
              <GoogleSignin text="sign up with google" state={state} />
              <form className="card-body" onSubmit={handleSubmit(handleSignup)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
                  <div>
                    <div className="form-control">
                      <label className="label">
                        <p className="label-text text-white">
                          Name <span className="text-red-500 text-xl">*</span>
                        </p>
                      </label>
                      <input
                        type="text"
                        placeholder="name"
                        className="input input-bordered rounded-none"
                        {...register("name", { required: true })}
                      />
                      {errors.name && (
                        <p className="text-red-500">Name is required.</p>
                      )}
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <p className="label-text text-white">
                          Image URL{" "}
                          <span className="text-red-500 text-xl">*</span>
                        </p>
                      </label>
                      <input
                        type="text"
                        placeholder="Image URL"
                        className="input input-bordered rounded-none"
                        {...register("image", { required: true })}
                      />
                      {errors.image && (
                        <p className="text-red-500">Image url is required.</p>
                      )}
                    </div>
                  </div>
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
                          Password{" "}
                          <span className="text-red-500 text-xl">*</span>
                        </p>
                      </label>
                      <input
                        type={isShowPass ? "text" : "password"}
                        placeholder="password"
                        className="input input-bordered rounded-none"
                        {...register("password", {
                          required: true,
                          pattern:
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,
                          minLength: 6,
                          maxLength: 16,
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
                        {wrongPassType === "pattern"
                          ? "Password must include at least 1 capital , 1 small letter and a  number"
                          : wrongPassType === "minLength"
                          ? "Password must at least 6 character."
                          : wrongPassType === "required"
                          ? "Password is require"
                          : "Password must max 16 character."}
                      </p>
                    )}
                  </div>
                </div>
                <div className="form-control  mt-10  items-center ">
                  <button className="btn btn-primary hover:text-title-color bg-primary-color border-none hover:bg-white text-white text-base px-10 md:px-14 py-2 rounded-full">
                    Sign Up
                  </button>
                </div>
              </form>
              <p className="text-center text-title-color">
                Already have an account? Please,{" "}
                <Link to="/signin" className="hover:underline text-white">
                  sign in.
                </Link>{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
