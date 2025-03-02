import React, { useEffect, useState, useRef } from "react";
import DashboardNavBar from "../../components/NavigationBar/DashboardAside";
import { getRoute } from "../../route/authentication";
import { FaCheck, FaArrowRight } from "react-icons/fa";
import bannerImage from "../../assets//Home-1v1.webp";

const Dashboard = () => {
  const [activeAccordion, setActiveAccordion] = useState(0);
  const userGuideRef = useRef(null);
  
    useEffect(() => {
      if (!sessionStorage.getItem("reloaded")) {
        sessionStorage.setItem("reloaded", "true");
        window.location.reload();
      }
    }, []);

  const accordionData = [
    {
      title: "How do I login to my account?",
      content: (
        <div className="space-y-2">
          <ol className="list-decimal list-inside pl-4 space-y-1">
            <li>Visit the login page through pxi.chonghua.com.ph</li>
            <li>Enter your username (usually your email address)</li>
            <li>Enter your password</li>
            <li>Click the "Login" button</li>
          </ol>
          <p className="mt-2 text-sm text-gray-500">Note: For first-time users, use the credentials sent to your registered email address.</p>
        </div>
      )
    },
    {
      title: "I forgot my password. What should I do?",
      content: (
        <div className="space-y-2">
          <ol className="list-decimal list-inside pl-4 space-y-1">
            <li>On the login page, click "Forgot Password"</li>
            <li>Enter your registered email address</li>
            <li>Click "Reset Password"</li>
            <li>Check your email for password reset instructions</li>
            <li>Follow the link in the email to create a new password</li>
            <li>Login with your new password</li>
          </ol>
          <p className="mt-2 text-sm text-gray-500">If you don't receive the email within a few minutes, check your spam folder or contact support.</p>
        </div>
      )
    },
    {
      title: "How do I register a PXI Account?",
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Manual Registration</h4>
            <p className="mb-2">Only patients with previous transactions in the hospital can manually register:</p>
            <ol className="list-decimal list-inside pl-4 space-y-1">
              <li>Access PXI through pxi.chonghua.com.ph or chonghua.com.ph</li>
              <li>Tap or click Login</li>
              <li>Tap or click Register</li>
              <li>Enter necessary Patient Information</li>
              <li>Tap or click Submit</li>
              <li>Follow the verification process</li>
            </ol>
          </div>
          <div>
            <h4 className="font-medium mb-2">Auto Registration</h4>
            <p>New patients with a registered mobile number and email address will automatically receive a username and default password upon creation of a Hospital record.</p>
          </div>
        </div>
      )
    },
    {
      title: "How do I access my online test results?",
      content: (
        <ol className="list-decimal list-inside pl-4 space-y-1">
          <li>Tap or click Online Test Results</li>
          <li>Tap or click the type of diagnostic result you want to view</li>
          <li>To view each result individually, tap or click View beside the preferred procedure (opens in new tab)</li>
          <li>When using a mobile device, scroll down to view the list of results</li>
        </ol>
      )
    },
  ];

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? -1 : index);
  };

  const scrollToUserGuide = () => {
    userGuideRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

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
      <div className="relative">
        <section className="relative h-96 overflow-hidden rounded-lg">
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60"></div>
          <img 
            src={bannerImage} 
            className="absolute inset-0 w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700 ease-in-out" 
            alt="Medical Center Banner" 
          />
        </section>
        
        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex bg-secondary justify-center items-center max-w-2xl w-full shadow-xl rounded-lg">
          <div className="flex flex-col justify-center items-center p-8 hover:bg-secondary/90 transition-colors duration-300">
            <h3 className="text-3xl font-bold mb-3 text-white">New to Our Platform?</h3>
            <p className="mb-6 text-white/90 text-center max-w-md">
              Not sure how to navigate the app? Let us guide you through the features and functionalities.
            </p>
            <button 
              onClick={scrollToUserGuide}
              className="flex items-center bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors duration-300 text-lg font-medium"
            >
              Open User Guide <FaArrowRight className="ml-3" />
            </button>
          </div>
        </div>
      </div>
      <section ref={userGuideRef} className="pt-20">
        <h2 className="text-3xl font-bold mb-6">User Guide</h2>
        <p className="text-gray-600 mb-6">Find answers to commonly asked questions about using our platform below.</p>
        <div className="space-y-2">
          {accordionData.map((item, index) => (
            <div key={index} className="border rounded-lg">
              <button
                className="w-full p-4 text-left flex justify-between items-center"
                onClick={() => toggleAccordion(index)}
              >
                <span className="font-medium">{item.title}</span>
                <span className={`transform transition-transform duration-200 ${activeAccordion === index ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>
              <div 
                className={`overflow-hidden transition-all duration-200 ${
                  activeAccordion === index ? 'max-h-[500px] p-4' : 'max-h-0'
                }`}
              >
                <div className="text-gray-600">{item.content}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
