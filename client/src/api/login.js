import { server_connection } from "../connections/server_connection";
import axios from "axios";

export const login = async (username, password) => {
  const payload = {
    username,
    password,
  };

  try {
    const response = await axios.post(
      `${server_connection()}/api/login`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data.message);
    return response.status === 200 ? true : false;
  } catch (error) {
    if (error.response && error.response.data) {
      window.location.reload();
      return false;
    } else {
      console.log("error", "An error occurred");
      return false;
    }
  }
};
