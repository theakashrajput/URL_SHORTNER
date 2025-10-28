import { useContext, useEffect, useState } from "react";
import CustomUrlShortnerForm from "../components/CustomUrlShortnerForm";
import UrlTable from "../components/UrlTable"; // Import the UrlTable component
import { AuthContext } from "../context/AuthContext";
import { fetchUserProfile } from "../api/auth.api";

const Dashboard = () => {
  const { userUrlData, setUserUrlData, user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const res = await fetchUserProfile(user.id);
        setUserUrlData(res.urls || []);
      } catch {
      } finally {
        setLoading(false);
      }
    };
    fetchUrls();
  }, [userUrlData]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="h-screen w-full pt-24 flex flex-col items-center gap-5 font-[Poppins] px-5 pb-5">
      <CustomUrlShortnerForm />
      <UrlTable urls={userUrlData} /> {/* Render the UrlTable component */}
    </div>
  );
};

export default Dashboard;
