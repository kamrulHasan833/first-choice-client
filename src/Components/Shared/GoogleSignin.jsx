import PropTypes from "prop-types";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import useAlert from "../../Hooks/useAlert";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const GoogleSignin = ({ text, state }) => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const alert = useAlert();
  const { signinWithGoogle } = useAuth();
  const handleGoogleSignin = async () => {
    try {
      const res = await signinWithGoogle();
      const user = res?.user;
      const { email, displayName, photoURL } = user;
      if (res.user) {
        const userInfo = {
          name: displayName,
          avatar: photoURL,
          email,
          user_type: "ordinary",
        };
        const res2 = await axiosPublic.post("/first-choice/v1/users", userInfo);
        if (res2.data._id || res2.data.status === 409) {
          alert(`Signed in successfully`, "success");
          if (!state) {
            navigate("/");
          } else {
            navigate(state);
          }
        }
      }
    } catch (err) {
      if (err) {
        alert("Signed in failed!", "error");
      }
    }
  };
  return (
    <div className="flex justify-center pt-5 ">
      <button
        onClick={handleGoogleSignin}
        className="text-white px-10 md:px14 py-1 md:py-2 border border-white capitalize flex items-center  gap-2 md:gap-3 md:text-base hover:bg-secondary-color"
      >
        <FcGoogle className="text-2xl md:text-3xl" /> {text}
      </button>
    </div>
  );
};

GoogleSignin.propTypes = {
  text: PropTypes.string,
  state: PropTypes.string,
};

export default GoogleSignin;
