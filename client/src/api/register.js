import { server_connection } from "../connections/server_connection";
import axios from "axios";
import { showToast } from "../components/helper/alert_helper";

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
    alert(response.data.message);
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
    alert(response.data.message);
    console.log(response.data.data.otp);
    return response.status === 200 ? response.data.data.otp : "";
  } catch (error) {
    if (error.response && error.response.data) {
      return false;
    } else {
      console.log("error", "An error occurred");
      return false;
    }
  }
};
