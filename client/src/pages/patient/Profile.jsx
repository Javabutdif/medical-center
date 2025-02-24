import React, { useState } from 'react';
import Input from '../../components/common/Input';
import Modal from '../../components/common/Modal';

const Profile = () => {
  const [formData, setFormData] = useState({
    firstName: 'Juan',
    middleName: 'Santos',
    lastName: 'Delacruz',
    surname: 'Sr.',
    dob: '01/01/1994',
    mobile: '0998 561 2707',
    emergencyContact: '0998 561 2708',
    email: 'juan.delacruz@example.com',
    gender: 'Male',
    age: '27',
    address: '123 Main St, Cebu City',
    country: 'Philippines',
    state: 'Cebu',
    postalCode: '6000',
    patientNo: '123456',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    setIsModalOpen(false);
    // Add save logic here
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='min-h-screen/main z p-4 px-6 md:px-8 pb-20 md:pb-24'>
      <div className='text-end mb-6'>
        <p>
          <span className='block text-2xl font-heading font-bold'>{formData.firstName} {formData.middleName} {formData.lastName} {formData.surname}</span>
          <b className='block text-lg'>
            <span>{formData.gender}</span>, <span>{formData.age}</span>
          </b>
        </p>
      </div>

      <div>
        <div className='mb-4'>
          <label className='block mb-2 text-sm sm:text-base'><b>Patient No</b></label>
          <Input type="text" name="patientNo" placeholder="Patient No" value={formData.patientNo} readOnly />
        </div>

        <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-4'>
          <div>
            <label className='block mb-2 text-sm sm:text-base'><b>First Name</b></label>
            <Input type="text" name="firstName" placeholder="First Name" value={formData.firstName} readOnly />
          </div>
          <div>
            <label className='block mb-2 text-sm sm:text-base'><b>Middle Name</b></label>
            <Input type="text" name="middleName" placeholder="Middle Name" value={formData.middleName} readOnly />
          </div>
          <div>
            <label className='block mb-2 text-sm sm:text-base'><b>Last Name</b></label>
            <Input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} readOnly />
          </div>
          <div>
            <label className='block mb-2 text-sm sm:text-base'><b>Surname</b></label>
            <Input type="text" name="surname" placeholder="Surname" value={formData.surname} readOnly />
          </div>
        </div>
        <div className='grid grid-cols-3 gap-4 mb-4'>
          <div>
            <label className='block mb-2 text-sm sm:text-base'><b>DOB</b></label>
            <Input type="text" name="dob" placeholder="Date of Birth" value={formData.dob} readOnly />
          </div>
          <div>
            <label className='block mb-2 text-sm sm:text-base'><b>Gender</b></label>
            <Input type="text" name="gender" placeholder="Gender" value={formData.gender} readOnly />
          </div>
          <div>
            <label className='block mb-2 text-sm sm:text-base'><b>Age</b></label>
            <Input type="text" name="age" placeholder="Age" value={formData.age} readOnly />
          </div>
        </div>

        <div className='grid grid-cols-2 gap-4 mb-4'>
          <div>
            <label className='block mb-2 text-sm sm:text-base'><b>Mobile</b></label>
            <Input type="text" name="mobile" placeholder="Mobile No" value={formData.mobile} onChange={handleChange} />
          </div>
          <div>
            <label className='block mb-2 text-sm sm:text-base'><b>Emergency</b></label>
            <Input type="text" name="emergencyContact" placeholder="Emergency Contact" value={formData.emergencyContact} onChange={handleChange} />
          </div>
          <div className='col-start-1 -col-end-1'>
            <label className='block mb-2 text-sm sm:text-base'><b>Email</b></label>
            <Input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
          </div>
        </div>

        <div className='grid grid-cols-3 gap-4 mb-4'>
          <div className='col-start-1 -col-end-1'>
            <label className='block mb-2 text-sm sm:text-base'><b>Address</b></label>
            <Input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
          </div>
          <div>
            <label className='block mb-2 text-sm sm:text-base'><b>Country</b></label>
            <Input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} />
          </div>
          <div>
            <label className='block mb-2 text-sm sm:text-base'><b>State</b></label>
            <Input type="text" name="state" placeholder="State/Province" value={formData.state} onChange={handleChange} />
          </div>
          <div>
            <label className='block mb-2 text-sm sm:text-base'><b>Postal</b></label>
            <Input type="text" name="postalCode" placeholder="Postal Code" value={formData.postalCode} onChange={handleChange} />
          </div>
        </div>

        <button 
          className='w-full mt-4 px-4 py-2 bg-primary text-accent rounded-lg' 
          onClick={handleSave}
        >
          Save
        </button>
        <Modal 
          isOpen={isModalOpen} 
          title="Confirm Save" 
          onClose={handleClose} 
          onConfirm={handleConfirm}
        >
          <p>Are you sure you want to save the changes?</p>
        </Modal>
      </div>
    </div>
  );
};

export default Profile;
