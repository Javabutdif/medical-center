import React, { useState, useEffect } from "react";
import Search from "../../../components/common/Search";
import Table from "../../../components/common/table/Table";
import { fetchAllSpecialImaging } from "../../../api/admin";
import { server_connection } from "../../../connections/server_connection";

const SpecialImaging = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [data, setData] = useState([]);
	const [selectedImage, setSelectedImage] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const getAllSpecial = async () => {
		const response = await fetchAllSpecialImaging();
		setData(response);
	};

	useEffect(() => {
		getAllSpecial();
	}, []);

	const openModal = (image) => {
		console.log(image);
		setSelectedImage(server_connection() + "/" + image);
		console.log(selectedImage);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setSelectedImage(null);
	};

	const columns = [
		{ path: "examDescription", label: "Exam Description" },
		{ path: "examDate", label: "Exam Date" },
		{ path: "sectionType", label: "Section" },
		{ path: "results", label: "Results" },
		{
			key: "actions",
			label: "Actions",
			content: (record) => (
				<button
					className="text-blue-500 hover:underline"
					onClick={() => openModal(record.image)}>
					View Details
				</button>
			),
		},
	];

	const handleSearch = (query) => {
		setSearchQuery(query);
	};

	const filteredData = data.filter((record) =>
		Object.values(record).some((value) =>
			value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
		)
	);

	return (
		<div>
			<Search placeholder="Search..." onSearch={handleSearch} />
			<Table columns={columns} data={filteredData} />

			{/* Modal */}
			{isModalOpen && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
					<div className="bg-white p-6 rounded-lg shadow-lg w-1/3 relative">
						<button
							className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
							onClick={closeModal}>
							&times;
						</button>
						{selectedImage ? (
							<>
								<a
									href={selectedImage}
									download
									className="mt-4 block bg-blue-500 text-white py-2 px-4 text-center rounded hover:bg-blue-600">
									Download File
								</a>
							</>
						) : (
							<p>No image available</p>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default SpecialImaging;
