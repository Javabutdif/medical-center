import { server_connection } from "../connections/server_connection";
import axios from "axios";
 const token = sessionStorage.getItem("Token");

 export const fetchAllPatients = async () => {
		try {
			const response = await axios.get(
				`${server_connection()}/api/admin/get-all-patients`,
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
