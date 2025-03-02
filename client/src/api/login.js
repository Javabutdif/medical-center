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

    sessionStorage.setItem("Token", response.data.token);
    return response.status === 200
      ? { response: true, role: response.data.role }
      : false;
  } catch (error) {
    if (error.response && error.response.data) {
      return false;
    } else {
      console.log("error", "An error occurred");
      return false;
    }
  }
};
