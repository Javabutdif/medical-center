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
    showToast("success", response.data.message);
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
