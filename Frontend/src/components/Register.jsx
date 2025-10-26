import { useForm } from "react-hook-form";
import { registerUserApi } from "../api/auth.api";
// import { toast } from "react-toastify";

const Register = ({stateManage}) => {

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const formSubmitHandler = async (user) => {
      const res = await registerUserApi(user);
      // toast.success(res.data.message);
    reset();
  };

  return (
    <div className="h-screen w-full flex justify-center items-center flex-col gap-3 bg-[#ffffff]">
      <form
        onSubmit={handleSubmit(formSubmitHandler)}
        className="w-[90%] sm:w-[60%] lg:w-[30%] flex flex-col gap-6 rounded px-5 py-3 font-[poppins]"
      >
        <h1 className="text-3xl text-center font-semibold font-[gilroy] mb-3">
          Registe Form
        </h1>
        <div className="flex flex-col gap-1 tracking-wide">
          <label htmlFor="username" className="text-sm pl-3">
            Username
          </label>
          <input
            className="bg-white py-2 px-4 placeholder:text-sm outline-none border border-[#b4b4b4] rounded-3xl"
            {...register("userName", {
              required: "Username is required",
              minLength: {
                value: 3,
                message: "Username must be at least 3 characters",
              },
            })}
            type="text"
            id="userName"
            placeholder="Username"
            autoComplete="current-userName"
          />
          {errors.userName && (
            <span className="pl-3 text-xs text-red-400 tracking-wide leading-none">
              {errors.userName.message}
            </span>
          )}
        </div>
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
          Register
        </button>
      </form>
      <p className="text-sm tracking-wide">
        Already have an account?
        <span
        onClick={()=>stateManage(true)}
        className="text-blue-400 ml-0.5 hover:underline cursor-pointer" to="/login">
          Login
        </span>
      </p>
    </div>
  );
};

export default Register;
