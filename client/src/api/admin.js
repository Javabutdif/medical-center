import { server_connection } from "../connections/server_connection";
import axios from "axios";

export const test = async () => {
  try {
    const response = await axios.get(`${server_connection()}/`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data.message;
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
