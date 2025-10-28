import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { loginUserApi } from "../api/auth.api";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Login = ({ stateManage }) => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const formSubmitHandler = async (user) => {
    const res = await loginUserApi(user);
    if (res?.success) {
      // Update the user in AuthContext
      login(res.user);
      toast.success(res?.message);
      // Navigate to dashboard
      navigate("/dashboard", { replace: true });
    } else {
      toast.error(res?.message || "Login failed");
    }
    reset();
  };

  return (
    <div className="h-screen w-full flex justify-center items-center flex-col gap-3 bg-[#ffffff]">
      <form
        onSubmit={handleSubmit(formSubmitHandler)}
        className="w-[90%] sm:w-[60%] lg:w-[30%] flex flex-col gap-6 rounded px-5 py-3"
      >
        <h1 className="text-3xl text-center font-semibold font-[gilroy] mb-3">
          Login Form
        </h1>
        <div className="flex flex-col gap-1 tracking-wide">
          <label htmlFor="email" className="text-sm pl-3">
            Email
          </label>
          <input
            className="bg-white py-2 px-4 placeholder:text-sm outline-none border border-[#b4b4b4] rounded-3xl"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            })}
            type="email"
            id="email"
            placeholder="Email"
            autoComplete="current-email"
          />
          {errors.email && (
            <span className="pl-3 text-xs text-red-400 tracking-wide leading-none">
              {errors.email.message}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1 tracking-wide">
          <label htmlFor="password" className="text-sm pl-3">
            Password
          </label>
          <input
            className="bg-white py-2 px-4 placeholder:text-sm outline-none border border-[#b4b4b4] rounded-3xl"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            type="password"
            id="password"
            placeholder="******"
            autoComplete="current-password"
          />
          {errors.password && (
            <span className="pl-3 text-xs text-red-400 tracking-wide leading-none">
              {errors.password.message}
            </span>
          )}
        </div>
        <button
          className="tracking-wide leading-none py-3.5 rounded-3xl mt-3 bg-black text-white active:scale-95 transform ease-in duration-200 cursor-pointer"
          type="submit"
        >
          Login
        </button>
      </form>
      <p className="text-sm tracking-wide">
        Don't have an account?
        <span
          onClick={() => stateManage(false)}
          className="text-blue-400 ml-0.5 hover:underline cursor-pointer"
          to="/register"
        >
          Register
        </span>
      </p>
    </div>
  );
};

export default Login;
