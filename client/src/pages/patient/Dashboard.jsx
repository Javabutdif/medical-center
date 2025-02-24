import React from "react";
import DashboardNavBar from "../../components/NavigationBar/DashboardAside";
import { getRoute } from "../../route/authentication";
import { FaCheck, FaArrowRight } from "react-icons/fa";

const Dashboard = () => {
  return (
    <div className="min-h-screen p-4 sm:p-8 font-body space-y-12 pb-32 md:pb-24">
      <section>
        <header className="mb-4 sm:mb-6">
          <h1 className="font-heading flex flex-col">
            <span className="self-start relative uppercase text-md sm:text-lg font-medium">
              <div className="absolute w-full h-1 -top-2 bg-primary" />
              Who we are
            </span>
            <span className="capitalize text-4xl sm:text-5xl font-bold">
              Southwestern University Medical Center
            </span>
          </h1>
        </header>
        <p className="text-sm sm:text-md leading-relaxed sm:leading-loose mb-4 sm:mb-6 font-light">
          Welcome to <b>SWUMed</b>, where warmth, compassion, and world-class care meet to elevate your healing journey. Resting in the heart of Cebu, <b>SWUMed</b> is more than just a hospital; we’re your trusted ally in achieving optimal wellness. Make your appointment today and experience the difference that compassionate, patient-centered care can make in your life.
        </p>
      </section>
      <section className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="flex-1">
          <h2 className="text-lg font-semibold flex items-center">
            <span className="bg-secondary text-accent flex justify-center items-center p-1 rounded-full mr-2">
              <FaCheck />
            </span>
            Leading Healthcare
          </h2>
          <p className="text-sm">Providing modern and efficient medical services</p>
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-semibold flex items-center">
            <span className="bg-secondary text-accent flex justify-center items-center p-1 rounded-full mr-2">
              <FaCheck />
            </span>
            HMOs Accepted
          </h2>
          <p className="text-sm">Making us the hospital of choice among the community</p>
        </div>
      </section>
      <section className="relative h-96 bg-black text-white p-4">
        <div className="absolute -bottom-16  -translate-x-1/2 left-1/2 flex bg-secondary justify-center items-center max-w-3xl w-full ">
          <div className="flex-1 flex flex-col justify-center items-center p-4">
            <h3 className="text-2xl font-bold mb-2">Need More Info</h3>
            <p className="mb-4">Find out more about our services and offerings.</p>
            <button className="flex items-center bg-primary text-white px-4 py-2 rounded">
              Click here <FaArrowRight className="ml-2" />
            </button>
          </div>
          <div className="flex-1 flex flex-col justify-center items-center p-4">
            <h3 className="text-2xl font-bold mb-2">Get In Touch</h3>
            <p className="mb-4">Need Some Help?</p>
            <button className="flex items-center bg-primary text-white px-4 py-2 rounded">
              Click here <FaArrowRight className="ml-2" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
