import React, { useState, useEffect } from "react";
import Search from "../../../components/common/Search";
import Table from "../../../components/common/table/Table";
import { fetchAllLaboratory } from "../../../api/admin";
import { server_connection } from "../../../connections/server_connection";
import Modal from "../../../components/common/Modal"; // Import the Modal component
import { FaEye } from "react-icons/fa";
import TableLayout from "../../../components/common/table/TableLayout";

const Laboratory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState(""); // To store the full image URL

  // Fetch all laboratory data
  const getAllLaboratories = async () => {
    try {
      const response = await fetchAllLaboratory();
      setData(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllLaboratories();
  }, []);

  // Open modal with selected image and generate the image URL
  const openModal = (image) => {
    setImageUrl(server_connection() + "/" + image); // Set the full image URL
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
    setImageUrl("");
  };

  // Handle the download functionality
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = imageUrl; // The image URL
    link.download = selectedImage; // The image will be saved with the selected image's name
    link.click();
  };

  // Columns for the table
  const columns = [
    { path: "patient_id", label: "ID" },
    { path: "patient_name", label: "Patient Name" },
    { path: "examDescription", label: "Exam Description" },
    { path: "examDate", label: "Exam Date" },
    { path: "sectionType", label: "Section" },
    { path: "results", label: "Results" },
    {
      key: "actions",
      label: "Actions",
      content: (record) => (
        <button
          className="flex flex-col justify-center items-center text-blue-500 text-2xl *:hover:underline"
          onClick={() => openModal(record.image)}
        >
          <FaEye />
          <span className="text-xs">
            {" "}
            {/* Changed to text-xs for even smaller text */}
            view
          </span>
        </button>
      ),
    },
  ];

  return (
    <>
      <TableLayout
        style={"mt-4 overflow-auto"}
        columns={columns}
        data={data}
        modals={
          <Modal
            isOpen={isModalOpen}
            onClose={closeModal}
            onConfirm={handleDownload} // Trigger download on confirm
            buttonStyle="bg-blue-500 hover:bg-blue-600 text-white"
          >
            <div className="text-start">
              <p className="text-lg font-medium text-gray-700 mb-4">
                You are about to download the file
              </p>
              <p className="text-sm text-gray-500">
                Please confirm that you would like to proceed with the download.
              </p>
            </div>
          </Modal>
        }
      />

      {/* Modal to show selected image and trigger download */}
    </>
  );
};

export default Laboratory;
