import React, { useRef, useState, useEffect } from "react";
import Search from "../../components/common/Search";
import Table from "../../components/common/table/Table";
import Pagination from "../../components/common/table/Pagination";
import { fetchAllPatients } from "../../api/admin";
import dateFormat, { masks } from "dateformat";

const PatientProfile = () => {
	const [value, setValue] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const searchRef = useRef();
	const [data, setData] = useState([]);

	const handleSearch = () => {
		if (searchRef.current) {
			const searchValue = searchRef.current.getSearchValue();
			setValue(searchValue);
			setCurrentPage(1); // Reset to first page on search
		}
	};

	const handleFetchAllPatients = async () => {
		const response = await fetchAllPatients();
		setData(response);
	};
	useEffect(() => {
		handleFetchAllPatients();
	},[data]);

	const columns = [
		{ path: "patient_id", label: "Patient ID" },
		{ path: "firstname", label: "First Name" },
		{ path: "middlename", label: "Middle Name" },
		{ path: "lastname", label: "Last Name" },
		{ path: "suffix", label: "Suffix" },
		{ path: "gender", label: "Gender" },
		{ path: "birthday", label: "Date of Birth" },
		{ path: "email", label: "Email" },
		{ path: "mobileNumber", label: "Mobile Number" },
		{ path: "actions", label: "Actions" },
	];

	const filteredData = data.filter((item) =>
		columns.some((column) =>
			item[column.path]?.toString().toLowerCase().includes(value.toLowerCase())
		)
	);

	return (
		<div className="container mx-auto px-4 md:px-8 space-y-4">
			<div className="flex flex-col justify-between sm:flex-row gap-4">
				<Search ref={searchRef} style={"sm:self-end"} onSearch={handleSearch} />
			</div>
			<Table columns={columns} data={filteredData} buttonText="View Profile" />
		</div>
	);
};

export default PatientProfile;
