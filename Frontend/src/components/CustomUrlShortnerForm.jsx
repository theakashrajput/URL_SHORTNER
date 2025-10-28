import { toast } from "react-toastify";
import { createShortUrl } from "../api/shortUrl.api";
import { useForm } from "react-hook-form";
import { useState } from "react";

const CustomUrlShortnerForm = () => {
  const [shortUrl, setShortUrl] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = ()=>{
    navigator.clipboard.writeText(shortUrl);
    setIsCopied(true);
    toast.success("Text copied");
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  }

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = async (url) => {
    const res = await createShortUrl(url);
    if (res?.success) {
      setShortUrl(res.shortUrl);
      toast.success(res?.message);
      reset();
    } else {
      toast.error(res?.message || "Failed to create short URL");
    }
  };

  return (
    <div className="w-[80%] md:w-[60%] xl:w-[40%] border border-[#dbdbdb] p-5 rounded-md">
      <h2 className="text-center font-semibold text-2xl md:text-3xl font-[Gilroy] mb-5">
        Custom Url Shortner
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
          Generate Short Url
        </button>
        {shortUrl && <div className="flex bg-[#f1f1f1] rounded-md">
          <div className="px-3 grow py-2 md:py-3 rounded-md text-[#5a5959] text-sm md:text-base tracking-wide outline-none">{shortUrl}</div>
          <div onClick={handleCopy} className="flex items-center justify-center px-3 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600 ease-in duration-100 active:scale-95">{isCopied ? "Copied" : "Copy"}</div>
        </div>}
        <div className="flex flex-col gap-1">
          <label className="text-xs tracking-wide" htmlFor="slug">
            Custom Slug (Optional)
          </label>
          <input
            className="px-3 py-2 md:py-3 rounded-md text-[#5a5959] text-sm md:text-base tracking-wide outline-none bg-[#f1f1f1]"
            placeholder="Enter custom slug"
            type="text"
            id="slug"
            {...register("slug")}
          />
        </div>
      </form>
    </div>
  );
};

export default CustomUrlShortnerForm;
