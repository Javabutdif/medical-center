import React, { useState, useEffect } from "react";
import Input from "../../components/common/Input";
import Modal from "../../components/common/Modal";
import { getInformationData } from "../../route/authentication";
import { fetchUserProfile, updateProfile } from "../../api/user";
import { showToast } from "../../components/helper/alert_helper";
import { useSnackbar } from "notistack";

const Profile = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    suffix: "",
    dob: "",
    mobile: "",
    emergencyContact: "",
    email: "",
    gender: "",
    age: "",
    address: "",
    country: "",
    state: "",
    postalCode: "",
    patientNo: "",
  });
  const user = getInformationData();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleFetchUser = async () => {
    const response = await fetchUserProfile(user.patient_id);
    setFormData({
      patientNo: response[0].patient_id,
      firstName: response[0].firstname,
      middleName: response[0].middlename,
      lastName: response[0].lastname,
      suffix: response[0].suffix,
      dob: response[0].birthday,
      mobile: response[0].mobile_number,
      email: response[0].email,
      gender: response[0].gender,
      state: response[0].state,
      postalCode: response[0].postalCode,
      address: response[0].address,
      country: response[0].country,
      emergencyContact: response[0].emergencyContact,
    });
    console.log(response[0]);
  };

  useEffect(() => {
    handleFetchUser();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    setIsModalOpen(true);
  };

  const handleConfirm = async () => {
    setIsModalOpen(false);
    // Add save logic here
    if (await updateProfile(formData)) {
      const key = showToast(enqueueSnackbar, "success", "Update Successful"); // Use enqueueSnackbar
      setTimeout(() => closeSnackbar(key), 2000);
      handleFetchUser();
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen/main z p-4 px-6 md:px-8 pb-20 md:pb-24">
      <div className="text-end mb-6">
        <p>
          <span className="block text-2xl font-heading font-bold">
            {formData.firstName} {formData.middleName} {formData.lastName}{" "}
            {formData.suffix}
          </span>
          <b className="block text-lg">
            <span>{formData.gender}</span>, <span>{formData.age}</span>
          </b>
        </p>
      </div>

      <div>
        <div className="mb-4">
          <label className="block mb-2 text-sm sm:text-base">
            <b>Patient No</b>
          </label>
          <Input
            type="text"
            name="patientNo"
            placeholder="Patient No"
            value={formData.patientNo}
            readOnly
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block mb-2 text-sm sm:text-base">
              <b>First Name</b>
            </label>
            <Input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              readOnly
            />
          </div>
          <div>
            <label className="block mb-2 text-sm sm:text-base">
              <b>Middle Name</b>
            </label>
            <Input
              type="text"
              name="middleName"
              placeholder="Middle Name"
              value={formData.middleName}
              readOnly
            />
          </div>
          <div>
            <label className="block mb-2 text-sm sm:text-base">
              <b>Last Name</b>
            </label>
            <Input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              readOnly
            />
          </div>
          <div>
            <label className="block mb-2 text-sm sm:text-base">
              <b>Suffix</b>
            </label>
            <Input
              type="text"
              name="suffix"
              placeholder="Suffix"
              value={formData.suffix}
              readOnly
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block mb-2 text-sm sm:text-base">
              <b>DOB</b>
            </label>
            <Input
              type="text"
              name="dob"
              placeholder="Date of Birth"
              value={new Date(formData.dob).toLocaleDateString()}
              readOnly
            />
          </div>
          <div>
            <label className="block mb-2 text-sm sm:text-base">
              <b>Gender</b>
            </label>
            <Input
              type="text"
              name="gender"
              placeholder="Gender"
              value={formData.gender}
              readOnly
            />
          </div>
          <div>
            <label className="block mb-2 text-sm sm:text-base">
              <b>Age</b>
            </label>
            <Input
              type="text"
              name="age"
              placeholder="Age"
              value={formData.age}
              readOnly
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-2 text-sm sm:text-base">
              <b>Mobile</b>
            </label>
            <Input
              type="text"
              name="mobile"
              placeholder="Mobile No"
              value={formData.mobile}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block mb-2 text-sm sm:text-base">
              <b>Emergency</b>
            </label>
            <Input
              type="text"
              name="emergencyContact"
              placeholder="Emergency Contact"
              value={formData.emergencyContact}
              onChange={handleChange}
            />
          </div>
          <div className="col-start-1 -col-end-1">
            <label className="block mb-2 text-sm sm:text-base">
              <b>Email</b>
            </label>
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="col-start-1 -col-end-1">
            <label className="block mb-2 text-sm sm:text-base">
              <b>Address</b>
            </label>
            <Input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block mb-2 text-sm sm:text-base">
              <b>Country</b>
            </label>
            <Input
              type="text"
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block mb-2 text-sm sm:text-base">
              <b>State</b>
            </label>
            <Input
              type="text"
              name="state"
              placeholder="State/Province"
              value={formData.state}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block mb-2 text-sm sm:text-base">
              <b>Postal</b>
            </label>
            <Input
              type="text"
              name="postalCode"
              placeholder="Postal Code"
              value={formData.postalCode}
              onChange={handleChange}
            />
          </div>
        </div>

        <button
          className="w-full mt-4 px-4 py-2 bg-primary text-accent rounded-lg"
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
