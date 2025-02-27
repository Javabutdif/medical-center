import { server_connection } from "../connections/server_connection";
import axios from "axios";
const token = sessionStorage.getItem("Token");

export const fetchMedicalReportUser = async (id) => {
  try {
    const response = await axios.get(
      `${server_connection()}/api/user/get-all-medical/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.status === 200 ? response.data.data : [];
  } catch (error) {
    if (error.response && error.response.data) {
      return false;
    } else {
      console.log("error", "An error occurred");
      return false;
    }
  }
};
export const fetchUserProfile = async (id) => {
  try {
    const response = await axios.get(
      `${server_connection()}/api/user/get-specific-data/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.status === 200 ? response.data.data : [];
  } catch (error) {
    if (error.response && error.response.data) {
      return false;
    } else {
      console.log("error", "An error occurred");
      return false;
    }
  }
};
export const updateProfile = async (formData) => {
  try {
    const response = await axios.put(
      `${server_connection()}/api/user/update-data`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.status === 200 ? true : false;
  } catch (error) {
    if (error.response && error.response.data) {
      return false;
    } else {
      console.log("error", "An error occurred");
      return false;
    }
  }
};

export const updateSeenTour = async (formData) => {
  console.log(formData);
  try {
    const response = await axios.put(
      `${server_connection()}/api/user/update-tour`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.status === 200 ? true : false;
  } catch (error) {
    if (error.response && error.response.data) {
      return false;
    } else {
      console.log("error", "An error occurred");
      return false;
    }
  }
};
