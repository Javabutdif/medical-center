import React, { useRef, useState, useEffect } from "react";
import Counter from "../../components/medical-report/Counter";
import Search from "../../components/common/Search";
import Table from "../../components/common/table/Table";
import Pagination from "../../components/common/table/Pagination";
import { fetchMedicalReportUser } from "../../api/user";
import { getInformationData } from "../../route/authentication";
import { server_connection } from "../../connections/server_connection";

const MedicalReport = () => {
	const [value, setValue] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [data, setData] = useState([]);
	const searchRef = useRef();
	const user = getInformationData();
	const [selectedImage, setSelectedImage] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const fetchApi = async () => {
		const response = await fetchMedicalReportUser(user?.patient_id);
		setData(response);
	};

	useEffect(() => {
		fetchApi();
	}, []);

	const handleSearch = () => {
		if (searchRef.current) {
			const searchValue = searchRef.current.getSearchValue();
			setValue(searchValue);
			setCurrentPage(1); // Reset to first page on search
		}
	};

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
		{ path: "examDescription", label: "exam description" },
		{ path: "examDate", label: "exam date" },
		{ path: "sectionType", label: "section" },
		{ path: "results", label: "results" },
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

	const filteredData = data.filter((item) =>
		columns.some((column) =>
			item[column.path]?.toString().toLowerCase().includes(value.toLowerCase())
		)
	);

	return (
		<div className="container mx-auto px-4 md:px-8 space-y-4">
			<div className="flex flex-col justify-between sm:flex-row gap-4">
				<div className="flex-1 flex justify-center md:justify-start space-x-4">
					<Counter title={"pending"} count={3} />
					<Counter title={"completed"} count={4} />
				</div>
				<Search ref={searchRef} style={"sm:self-end"} onSearch={handleSearch} />
			</div>
			<Table columns={columns} data={filteredData} buttonText="View" />
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

export default MedicalReport;
