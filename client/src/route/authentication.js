
let storedData;
let storedRole;

export const getRoute = () => {
  return storedRole || null;
};

export const setInformationData = (data, role) => {
	storedData = data;
	storedRole = role;
};

export const getInformationData = () => {
	return {
		name: storedData?.name || null,
		department: storedData?.department || null,
		email: storedData?.email || null,
		patient_id: storedData?.patient_id || null,
	};
};
export const removeAuthentication = () => {
  sessionStorage.removeItem("Token");
  sessionStorage.removeItem("Data");
  sessionStorage.removeItem("hasReloaded");
  storedData = null;
  storedRole = null;
};
