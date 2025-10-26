import { useState } from "react";
import PreviewUrl from "../components/PreviewUrl";
import UrlForm from "../components/UrlForm";

const Dashboard = () => {

  const [shortUrl, setShortUrl] = useState("");

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center gap-5 font-[Poppins]">
      <UrlForm setShortUrl={setShortUrl} />
      <PreviewUrl shortUrl={shortUrl} />
    </div>
  );
};

export default Dashboard;
