import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import Input from '../../components/common/Input'; // Adjust the import path as needed
import Modal from '../../components/common/Modal'; // Import the Modal component

const EditModal = ({ isOpen, onClose, patient, onSave }) => {
  const [formData, setFormData] = useState({ ...patient });
  const [errors, setErrors] = useState({});
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  useEffect(() => {
    if (patient) {
      setFormData({ ...patient });
    }
  }, [patient]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSaveClick = (e) => {
    e.preventDefault();
    setIsConfirmModalOpen(true);
  };

  const handleConfirmSave = () => {
    onSave(formData);
    setIsConfirmModalOpen(false);
    onClose();
  };

  const handleCloseConfirmModal = () => {
    setIsConfirmModalOpen(false);
  };

  return (
    <div className={`${isOpen ? 'fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 transition-opacity duration-300 ease-in-out' : 'hidden'}`}>
      <div className='relative w-full max-w-2xl p-6 bg-accent rounded-md shadow-lg'>
        <button 
          className='absolute top-3 right-3 text-primary hover:text-secondary'
          onClick={onClose}
        >
          <FaTimes size={20} />
        </button>
        <h2 className='text-2xl font-heading font-bold mb-6 text-primary'>Edit Patient</h2>
        <form onSubmit={handleSaveClick}>
          <div className='grid grid-cols-2 gap-6 mb-6'>
            <div className='col-span-2 sm:col-span-1'>
              <label className='block text-dark mb-2 font-body'>First Name</label>
              <Input 
                type='text'
                name='firstname'
                value={formData.firstname || ''}
                disabled
                className='w-full px-3 py-2 border border-muted rounded bg-muted'
              />
            </div>
            <div className='col-span-2 sm:col-span-1'>
              <label className='block text-dark mb-2 font-body'>Middle Name</label>
              <Input 
                type='text'
                name='middlename'
                value={formData.middlename || ''}
                disabled
                className='w-full px-3 py-2 border border-muted rounded bg-muted'
              />
            </div>
            <div className='col-span-2 sm:col-span-1'>
              <label className='block text-dark mb-2 font-body'>Last Name</label>
              <Input 
                type='text'
                name='lastname'
                value={formData.lastname || ''}
                disabled
                className='w-full px-3 py-2 border border-muted rounded bg-muted'
              />
            </div>
            <div className='col-span-2 sm:col-span-1'>
              <label className='block text-dark mb-2 font-body'>Suffix</label>
              <Input 
                type='text'
                name='suffix'
                value={formData.suffix || ''}
                disabled
                className='w-full px-3 py-2 border border-muted rounded bg-muted'
              />
            </div>
          </div>
          <div className='flex space-x-6 mb-6'>
            <div className='w-1/2'>
              <label className='block text-dark mb-2 font-body'>Gender</label>
              <Input 
                type='text'
                name='gender'
                value={formData.gender || ''}
                disabled
                className='w-full px-3 py-2 border border-muted rounded bg-muted'
              />
            </div>
            <div className='w-1/2'>
              <label className='block text-dark mb-2 font-body'>Date of Birth</label>
              <Input 
                type='text'
                name='birthday'
                value={formData.birthday || ''}
                disabled
                className='w-full px-3 py-2 border border-muted rounded bg-muted'
              />
            </div>
          </div>
          <div className='mb-6'>
            <label className='block text-dark mb-2 font-body'>Email</label>
            <Input 
              type='email'
              name='email'
              value={formData.email || ''}
              onChange={handleChange}
              error={errors.email}
              className='w-full px-3 py-2 border border-muted rounded'
            />
          </div>
          <div className='mb-6'>
            <label className='block text-dark mb-2 font-body'>Mobile Number</label>
            <Input 
              type='text'
              name='mobileNumber'
              value={formData.mobileNumber || ''}
              onChange={handleChange}
              error={errors.mobileNumber}
              className='w-full px-3 py-2 border border-muted rounded'
            />
          </div>
          <button type='submit' className='w-full py-2 bg-primary text-accent rounded hover:bg-secondary transition duration-300 font-heading'>Save</button>
        </form>
      </div>
      <Modal 
        isOpen={isConfirmModalOpen}
        title="Confirm Save"
        onClose={handleCloseConfirmModal}
        onConfirm={handleConfirmSave}
      >
        <p className="font-body">Are you sure you want to save the changes?</p>
      </Modal>
    </div>
  );
};

export default EditModal;
