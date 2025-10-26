import { createShortUrl } from "../api/shortUrl.api";
import { useForm } from "react-hook-form";

const UrlForm = ({ setShortUrl }) => {

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = async (url) => {
    const shortUrl = await createShortUrl(url);
    setShortUrl(shortUrl);
    reset();
  };

  return (
    <div className="w-[80%] md:w-[60%] xl:w-[40%] border border-[#dbdbdb] p-5 rounded-md">
      <h2 className="text-center font-semibold text-2xl md:text-3xl font-[Gilroy] mb-5">
        Url Shortner
      </h2>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex flex-col gap-5 md:gap-7"
      >
        <div className="flex flex-col gap-1">
        <input
          className="px-3 py-2 md:py-3 rounded-md text-[#5a5959] text-sm md:text-base tracking-wide outline-none bg-[#f1f1f1]"
          placeholder="Enter full URL"
          type="text"
          {...register("originalUrl", { required: "Url is required" })}
        />
        {errors.originalUrl && (
          <span className="pl-1 text-xs text-red-400 tracking-wide leading-none">
            {errors.originalUrl.message}
          </span>
        )}
        </div>
        <button
          className="bg-blue-500 text-white tracking-wide text-sm md:text-base py-2 md:py-3 rounded-md active:scale-95 hover:bg-blue-600 transform ease-in duration-200 cursor-pointer"
          type="submit"
        >
          Genrate Short Url
        </button>
      </form>
    </div>
  );
};

export default UrlForm;
