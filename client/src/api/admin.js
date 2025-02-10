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


 export const updatedPatientApi = async (updatedPatient) => {
		try {
			const response = await axios.put(
				`${server_connection()}/api/admin/update-patients`,
				updatedPatient,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			);
			return response.status === 200;
		} catch (error) {
			if (error.response && error.response.data) {
				return false;
			} else {
				console.log("error", "An error occurred");
				return false;
			}
		}
 };

 export const deletePatient = async (id) => {
		try {
			const response = await axios.delete(
				`${server_connection()}/api/admin/delete-patient/${id}`,

				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			);
			return response.status === 200;
		} catch (error) {
			if (error.response && error.response.data) {
				return false;
			} else {
				console.log("error", "An error occurred");
				return false;
			}
		}
 };

 export const upload_picture = async (data, id) => {
		const formData = new FormData();
		formData.append("dataImage", data);

		try {
			const response = await axios.post(
				`${Server_Connection()}/api/upload-data/${id}`,
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
						Authorization: `Bearer ${token}`,
					},
				}
			);
			if (response.status === 200) {
				console.log(response.data.message);
			} else {
				console.log(response.data.message);
			}
			console.log(response.data.message);
		} catch (error) {
			console.error("Error:", error.response.data.message);
			showToast("error", error.response.data.message);
			return null;
		}
 };




 
