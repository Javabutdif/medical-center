import React, { useRef, useState, useEffect } from "react";
import { fetchMedicalReportUser } from "../../api/user";
import { getInformationData } from "../../route/authentication";
import { server_connection } from "../../connections/server_connection";
import { FaEye } from "react-icons/fa";
import TableLayout from "../../components/common/table/TableLayout";
import Modal from "../../components/common/Modal";

const MedicalReport = () => {
	const [data, setData] = useState([]);
	const user = getInformationData();
	const [selectedImage, setSelectedImage] = useState(null);	
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [imageUrl, setImageUrl] = useState(""); // To store the full image URL


	const fetchApi = async () => {
		try {
		  const response = await fetchMedicalReportUser(user?.patient_id);
		  setData(response || []);
		} catch (error) {
		  console.error("Error fetching data:", error);
		}
	  };
	  

	useEffect(() => {
		fetchApi();
	}, []);

	const openModal = (image) => {
		console.log(image);
		setSelectedImage(server_connection() + "/" + image);
		setSelectedImage(image);
		console.log(selectedImage);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setSelectedImage(null);
		setImageUrl("");
	};

	  // Handle the download functionality
	  const handleDownload = () => {
		const link = document.createElement("a");
		link.href = imageUrl; // The image URL
		link.download = selectedImage; // The image will be saved with the selected image's name
		link.click();
	  };

	const columns = [
		{ path: "examDescription", label: "exam description" },
		{ path: "examDate", label: "exam date" },
		{ path: "sectionType", label: "section" },
		{ path: "results", label: "results" },
		{
			key: "actions",
			label: "Actions",
			content: (record) => (
				<button
				className="flex justify-center items-center text-secondary text-2xl hover:underline"
				onClick={() => openModal(record.image)}
				title="View"
				>
				<FaEye />
				</button>
			),
		},
	];

	return (
		<>
			<TableLayout 
				columns={columns}
				data={data}

				modals={(
					<Modal
						isOpen={isModalOpen}
						onClose={closeModal}
						onConfirm={handleDownload} // Trigger download on confirm
						buttonStyle="bg-blue-500 hover:bg-blue-600 text-white"
					>
						<div className="text-start">
						<p className="text-lg font-medium text-gray-700 mb-4">
							You are about to download the file
						</p>
						<p className="text-sm text-gray-500">
							Please confirm that you would like to proceed with the download.
						</p>
						</div>
					</Modal>
				)}

			/>	
		</>
	);
};

export default MedicalReport;
