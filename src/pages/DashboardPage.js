import { useEffect } from "react";
import whisl_api from "../requests/whisl_api";

const DashboardPage = () => {
  useEffect(() => {
    whisl_api.getDashboardData().then((response) => {
      console.log(response);
    });
  }, []);
  return (
    <div>
      <h1>Dashboard</h1>
      <p>The Dashboard is accessible by every signed in user.</p>
    </div>
  );
};

export default DashboardPage;
