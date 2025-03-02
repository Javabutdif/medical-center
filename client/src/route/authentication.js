let storedData;
let storedRole;
let storedTour;

export const getRoute = () => {
  return storedRole || null;
};

export const setInformationData = (data, role, hasSeenTour) => {
  storedData = data;
  storedRole = role;
  storedTour = hasSeenTour;
};

export const getInformationData = () => {
  return {
    name: storedData?.name || null,
    department: storedData?.department || null,
    email: storedData?.email || null,
    patient_id: storedData?.patient_id || null,
    hasSeenTour: storedTour || false,
  };
};
export const removeAuthentication = () => {
  sessionStorage.removeItem("Token");
  sessionStorage.removeItem("Data");

  storedData = null;
  storedRole = null;
};
