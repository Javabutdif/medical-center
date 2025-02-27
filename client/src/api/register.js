import { server_connection } from "../connections/server_connection";
import axios from "axios";
import { showToast } from "../components/helper/alert_helper";
import { enqueueSnackbar } from "notistack"; // Import enqueueSnackbar

export const register = async (
  username,
  firstname,
  middlename,
  lastname,
  suffix,
  gender,
  birthday,
  email,
  mobile_number,
  password
) => {
  const payload = {
    username,
    firstname,
    middlename,
    lastname,
    suffix,
    gender,
    birthday,
    email,
    mobile_number,
    password,
  };

  try {
    const response = await axios.post(
      `${server_connection()}/api/register`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    enqueueSnackbar(response.data.message, { variant: "success" }); // Show success toast
    return response.status === 200 ? true : false;
  } catch (error) {
    if (error.response && error.response.data) {
      enqueueSnackbar(error.response.data.message, { variant: "error" }); // Show error toast
      return false;
    } else {
      enqueueSnackbar("An error occurred", { variant: "error" }); // Show error toast
      return false;
    }
  }
};

export const fetchOtp = async (email, firstname, lastname) => {
  const payload = {
    email,
    firstname,
    lastname,
  };

  try {
    const response = await axios.post(
      `${server_connection()}/api/get-otp`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    enqueueSnackbar(response.data.message, { variant: "success" }); // Show success toast
    console.log(response.data.data.otp);
    return response.status === 200 ? response.data.data.otp : false;
  } catch (error) {
    if (error.response && error.response.data) {
      enqueueSnackbar(error.response.data.message, { variant: "error" }); // Show error toast
      return false;
    } else {
      enqueueSnackbar("An error occurred", { variant: "error" }); // Show error toast
      return false;
    }
  }
};

export const changePassword = async (password, email) => {
  const payload = {
    password,
    email,
  };

  try {
    const response = await axios.post(
      `${server_connection()}/api/change-password`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    enqueueSnackbar(response.data.message, { variant: "success" }); // Show success toast
    return response.status === 200 ? true : false;
  } catch (error) {
    if (error.response && error.response.data) {
      enqueueSnackbar(error.response.data.message, { variant: "error" }); // Show error toast
      return false;
    } else {
      enqueueSnackbar("An error occurred", { variant: "error" }); // Show error toast
      return false;
    }
  }
};
