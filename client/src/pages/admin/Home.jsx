import React from "react";
import Counter from "../../components/medical-report/Counter";
import GenderChart from "../../components/ui/GenderChart";

const Home = () => {
  const genderData = {
    male: 336, // Total number of males
    female: 338, // Total number of females
  };

  return (
    <div className="min-h-screen/main flex flex-col justify-start items-center gap-8 px-4 pb-8">
      {/* Counters Grid */}
      <div className="self-end w-full max-w-5xl grid grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="col-span-2 lg:col-span-1">
          <Counter title="Patients" count={2000} />
        </div>
        <Counter title="Lab Completed" count={200} />
        <Counter title="Imaging Done" count={2} />
      </div>

      {/* Gender Chart Section */}
        <GenderChart style={"flex-1 self-stretch w-full "} data={genderData} /> 
    </div>
  );
};

export default Home;
