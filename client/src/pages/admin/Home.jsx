import { React, useState, useEffect } from "react";
import Counter from "../../components/medical-report/Counter";
import GenderChart from "../../components/ui/GenderChart";
import { getDashboard } from "../../api/admin";

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!sessionStorage.getItem("reloaded")) {
      sessionStorage.setItem("reloaded", "true");
      window.location.reload();
    }
  }, []);
  const fetchDashboard = async () => {
    const response = await getDashboard();
    console.log(response);
    setData(response);
  };
  useEffect(() => {
    fetchDashboard();
  }, []);
  const genderData = {
    male: data.male_count, // Total number of males
    female: data.female_count, // Total number of females
  };
  return (
    <div className="min-h-screen/main flex flex-col justify-start items-center gap-8 px-4 pb-8">
      {/* Counters Grid */}
      <div className="self-end w-full max-w-5xl grid grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="col-span-2 lg:col-span-1">
          <Counter title="Patients" count={data.user_count} />
        </div>
        <Counter title="Lab Completed" count={data.lab_count} />
        <Counter title="Imaging Done" count={data.special_count} />
      </div>

      {/* Gender Chart Section */}
      <GenderChart style={"flex-1 self-stretch w-full "} data={genderData} />
    </div>
  );
};

export default Home;
