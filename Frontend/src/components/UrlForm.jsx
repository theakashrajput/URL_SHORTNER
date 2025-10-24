import { useState } from "react";
import { createShortUrl } from "../api/shortUrl.api";

const UrlForm = ({ setShortUrl }) => {
  const [urlInput, seturlInput] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    seturlInput("");
    const shortUrl = await createShortUrl(urlInput);
    setShortUrl(shortUrl);
  };

  return (
    <div className="w-[80%] md:w-[60%] xl:w-[40%] border border-[#dbdbdb] p-5 rounded-md">
      <h2 className="text-center font-semibold text-2xl md:text-3xl font-[Gilroy] mb-5">
        Url Shortner
      </h2>
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col gap-3 md:gap-5"
      >
        <input
          onChange={(e) => seturlInput(e.target.value)}
          value={urlInput}
          className="px-3 py-2 md:py-3 rounded-md text-[#5a5959] text-sm md:text-base tracking-wide outline-none bg-[#f1f1f1]"
          placeholder="Enter full URL"
          type="text"
        />
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
