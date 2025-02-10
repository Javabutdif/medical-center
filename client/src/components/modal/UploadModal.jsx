import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import Modal from '../../components/common/Modal'; // Import Modal

const UploadModal = ({ isOpen, onClose, patient }) => {
  const [examDescription, setExamDescription] = useState('');
  const [sectionType, setSectionType] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const handleUploadClick = (e) => {
    e.preventDefault();
    setIsConfirmModalOpen(true);
  };

  const handleConfirmUpload = () => {
    console.log('Upload data:', { patient, examDescription, sectionType, selectedImage });
    setIsConfirmModalOpen(false);
    onClose();
  };

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center'>
      <div className='bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full'>
        <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
          <div className='sm:flex sm:items-start'>
            <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
              <h3 className='text-lg leading-6 font-medium text-gray-900'>Upload Patient Data</h3>
              <div className='mt-2'>
                <p className='text-sm text-gray-500'>
                  Please provide the exam description, section type, and upload an image for {patient?.firstname} {patient?.lastname}.
                </p>
                <div className='mt-4'>
                  <label className='block text-gray-700 mb-2'>Exam Description</label>
                  <input 
                    type='text'
                    value={examDescription}
                    onChange={(e) => setExamDescription(e.target.value)}
                    className='w-full px-3 py-2 border border-gray-300 rounded'
                  />
                </div>
                <div className='mt-4'>
                  <label className='block text-gray-700 mb-2'>Section Type</label>
                  <select 
                    value={sectionType}
                    onChange={(e) => setSectionType(e.target.value)}
                    className='w-full px-3 py-2 border border-gray-300 rounded'
                  >
                    <option value=''>Select Section Type</option>
                    <option value='A'>Section A</option>
                    <option value='B'>Section B</option>
                    <option value='C'>Section C</option>
                  </select>
                </div>
                <div className='mt-4'>
                  <label className='block text-gray-700 mb-2'>Upload Image</label>
                  <input 
                    type='file'
                    accept='image/*'
                    onChange={handleImageChange}
                    className='w-full px-3 py-2 border border-gray-300 rounded'
                  />
                </div>
                {selectedImage && (
                  <div className='mt-4'>
                    <img 
                      src={URL.createObjectURL(selectedImage)}
                      alt='Selected'
                      className='w-full h-auto rounded'
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
          <button 
            onClick={handleUploadClick} 
            className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm'
          >
            Upload
          </button>
          <button 
            onClick={onClose} 
            className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm'
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
}

export default UploadModal;
