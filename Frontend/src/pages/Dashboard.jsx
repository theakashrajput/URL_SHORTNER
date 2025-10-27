import { useState } from "react";
import CustomUrlShortnerForm from "../components/CustomUrlShortnerForm";
import UrlTable from "../components/UrlTable"; // Import the UrlTable component

const Dashboard = () => {
  const [customShortUrl, setCustomShortUrl] = useState("");

  // Example usage in a parent component
  const urls = [
    {
      originalUrl: "https://www.google.com",
      shortUrl: "localhost:3000/abc123",
      counts: 5,
    },
    {
      originalUrl: "https://www.google.com",
      shortUrl: "localhost:3000/abc123",
      counts: 5,
    },
    {
      originalUrl: "https://www.google.com",
      shortUrl: "localhost:3000/abc123",
      counts: 5,
    },
    {
      originalUrl: "https://www.google.com",
      shortUrl: "localhost:3000/abc123",
      counts: 5,
    },
    {
      originalUrl: "https://www.google.com",
      shortUrl: "localhost:3000/abc123",
      counts: 5,
    },
    {
      originalUrl: "https://www.google.com",
      shortUrl: "localhost:3000/abc123",
      counts: 5,
    },
    {
      originalUrl: "https://www.google.com",
      shortUrl: "localhost:3000/abc123",
      counts: 5,
    },
    {
      originalUrl: "https://www.google.com",
      shortUrl: "localhost:3000/abc123",
      counts: 5,
    },
    // ... more URL objects
  ];

  return (
    <div className="h-screen w-full pt-24 flex flex-col items-center gap-5 font-[Poppins] px-5 pb-5">
      {/* <h2 className="text-4xl font-semibold font-[Gilroy]">Dashboard</h2> */}
      <CustomUrlShortnerForm setCustomShortUrl={customShortUrl} />
      <UrlTable urls={urls} /> {/* Render the UrlTable component */}
    </div>
  );
};

export default Dashboard;
