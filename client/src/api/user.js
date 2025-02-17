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
