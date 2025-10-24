import { useRef, useState } from "react";
import { toast } from "react-toastify";

const PreviewUrl = ({ shortUrl }) => {
  const [isCopied, setIsCopied] = useState(false);

  const textDivRef = useRef(null);

  const handleCopy = async () => {
    if (textDivRef.current && navigator.clipboard) {
      const textToCopy = textDivRef.current.textContent;

      try {
        await navigator.clipboard.writeText(textToCopy);
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1000);
        toast.success("Text copied", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } catch (err) {
        toast.error("Failed to copy text", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };

  return (
    <>
      {shortUrl && (
        <div className="w-[80%] md:w-[60%] xl:w-[40%] flex flex-col gap-3 md:flex-row justify-between items-center p-2 md:p-3 border rounded-sm border-[#dbdbdb]">
          <div
            ref={textDivRef}
            className="scorollbar-hide w-full md:w-[80%] overflow-scroll rounded-sm bg-[#e7e1e1] px-2 py-2"
          >
            {shortUrl}
          </div>

          <button
            onClick={handleCopy}
            className={`${
              isCopied ? "bg-[#3d3d3d]" : "bg-black"
            } w-full md:w-[20%] text-sm text-white rounded-sm px-3 py-2 active:scale-95 hover:bg-[#3d3d3d] transform ease-in duration-200 cursor-pointer`}
          >
            {isCopied ? "Copied" : "Copy"}
          </button>
        </div>
      )}
    </>
  );
};

export default PreviewUrl;
