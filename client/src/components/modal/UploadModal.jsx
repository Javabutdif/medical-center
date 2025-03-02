import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import Modal from "../../components/common/Modal"; // Import Modal
import { upload_picture } from "../../api/admin";
import { showToast } from "../../components/helper/alert_helper";
import { useSnackbar } from "notistack"; // Import useSnackbar

const UploadModal = ({ isOpen, onClose, patient }) => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState({
    patient_id: patient?.patient_id || "",
    examDescription: "",
    sectionType: "",
    selectedImage: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));

    if (files) {
      setSelectedImage(files[0]);
    }
  };

  const handleUploadClick = (e) => {
    e.preventDefault();
    setIsConfirmModalOpen(true);
  };

  const handleConfirmUpload = async () => {
    if (await upload_picture(formData, patient?.patient_id)) {
      const key = showToast(enqueueSnackbar, "success", "Upload Successful");
      setTimeout(() => closeSnackbar(key), 2000);
      setIsConfirmModalOpen(false);

      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Upload Patient Data
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Please provide the exam description, section type, and upload
                  a file for {patient?.firstname} {patient?.lastname}.
                </p>
                <div className="mt-4">
                  <label className="block text-gray-700 mb-2">
                    Exam Description
                  </label>
                  <input
                    type="text"
                    name="examDescription"
                    value={formData.examDescription}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-gray-700 mb-2">
                    Section Type
                  </label>
                  <select
                    name="sectionType"
                    value={formData.sectionType}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                  >
                    <option value="">Select Section Type</option>
                    <option value="Special Imaging">Special Imaging</option>
                    <option value="Laboratory">Laboratory</option>
                  </select>
                </div>
                <div className="mt-4">
                  <label className="block text-gray-700 mb-2">
                    Upload File
                  </label>
                  <input
                    type="file"
                    name="selectedImage"
                    accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                  />
                </div>
                {selectedImage && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-500">
                      Selected file: {selectedImage.name}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            onClick={handleUploadClick}
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Upload
          </button>
          <button
            onClick={onClose}
            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
      <Modal
        isOpen={isConfirmModalOpen}
        title="Confirm Upload"
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirmUpload}
      >
        <p className="font-body">Are you sure you want to upload the data?</p>
      </Modal>
    </div>
  );
};

export default UploadModal;
