import React, { useState, useEffect } from "react";
import Search from "../../components/common/Search";
import Table from "../../components/common/table/Table";
import {
  fetchAllPatients,
  updatedPatientApi,
  deletePatient,
} from "../../api/admin";
import Modal from "../../components/common/Modal";
import { FaEllipsisH, FaEdit, FaTrash, FaUpload } from "react-icons/fa";
import EditModal from "../../components/modal/EditModal";
import UploadModal from "../../components/modal/UploadModal";
import TableLayout from "../../components/common/table/TableLayout";

const PatientProfile = () => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFetchAllPatients = async () => {
    setLoading(true);
    try {
      const response = await fetchAllPatients();
      console.log("Fetched data:", response);
      if (Array.isArray(response)) {
        setData(response);
      } else {
        console.error("Expected an array, but got:", response);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    handleFetchAllPatients();
  }, []);

  const handleEdit = (patient) => {
    setSelectedPatient(patient);
    setIsEditModalOpen(true);
    setDropdownOpen(null); // Close dropdown after action
  };

  const handleDelete = (patient) => {
    setSelectedPatient(patient.patient_id);
    setIsModalOpen(true);
    setDropdownOpen(null); // Close dropdown after action
  };

  const confirmDelete = async () => {
    if (await deletePatient(selectedPatient)) {
      setIsModalOpen(false);
    }
  };

  const toggleDropdown = (patientId) => {
    setDropdownOpen(dropdownOpen === patientId ? null : patientId);
  };

  const handleUpload = (patient) => {
    setSelectedPatient(patient);
    setIsUploadModalOpen(true);
    setDropdownOpen(null);
  };

  const handleSave = async (updatedPatient) => {
    setData((prevData) =>
      prevData.map((patient) =>
        patient.patient_id === updatedPatient.patient_id
          ? updatedPatient
          : patient
      )
    );
    if (await updatedPatientApi(updatedPatient)) {
      console.log("Update Patient Successfully");
    }
  };

  const columns = [
    { path: "patient_id", label: "Patient ID" },
    { path: "firstname", label: "First Name" },
    { path: "middlename", label: "Middle Name" },
    { path: "lastname", label: "Last Name" },
    { path: "suffix", label: "Suffix" },
    { path: "gender", label: "Gender" },
    { path: "birthday", label: "Date of Birth" },
    { path: "email", label: "Email" },
    { path: "mobile_number", label: "Mobile Number" },
    {
      key: "actions",
      label: "",
      content: (patient) => (
        <div className="relative">
          <button
            onClick={() => toggleDropdown(patient.patient_id)}
            className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 flex items-center"
          >
            <FaEllipsisH />
          </button>
          {dropdownOpen === patient.patient_id && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50">
              <button
                onClick={() => handleUpload(patient)}
                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center"
              >
                <FaUpload className="mr-2" /> Upload
              </button>
              <button
                onClick={() => handleEdit(patient)}
                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center"
              >
                <FaEdit className="mr-2" /> Edit
              </button>
              <button
                onClick={() => handleDelete(patient)}
                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center"
              >
                <FaTrash className="mr-2" /> Delete
              </button>
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <>
      <TableLayout
        columns={columns}
        data={data}
        modals={
          <>
            <Modal
              isOpen={isModalOpen}
              title="Confirm Delete"
              onClose={() => setIsModalOpen(false)}
              onConfirm={confirmDelete}
            >
              <p>Are you sure you want to delete this patient?</p>
            </Modal>

            <EditModal
              isOpen={isEditModalOpen}
              onClose={() => setIsEditModalOpen(false)}
              patient={selectedPatient}
              onSave={handleSave}
            />

            <UploadModal
              loading={loading}
              isOpen={isUploadModalOpen}
              onClose={() => setIsUploadModalOpen(false)}
              patient={selectedPatient}
            />
          </>
        }
      />
    </>
  );
};

export default PatientProfile;
