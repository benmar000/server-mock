// keep in mind that individual functions should be split into their own files
const { getPatients } = require("../../server");

const convertToDate = (dates) => {
  return dates.map((date) => new Date(date));
};

const getMaxDate = (dates) => {
  const max = Math.max(...dates);
  return new Date(max);
};

const sanitizeString = (string) =>
  string.trim().toLowerCase().replace(/\s+/g, " ");

const isFalsyObject = (patient) =>
  Object.values(patient).every((value) => value !== null);

const logPatientsNamesAndLastAppointments = () => {
  const patients = getPatients();
  const sanitizedPatients = patients.filter((patient) =>
    isFalsyObject(patient)
  );

  const result = [];

  for (const patient of sanitizedPatients) {
    const { visits, name } = patient;
    const sanitizedName = sanitizeString(name);
    const dates = visits.map((visit) => visit.date);
    const visitsAsDates = convertToDate(dates);
    const maxDate = getMaxDate(visitsAsDates);
    result.push({ sanitizedName, maxDate });
  }

  return result;
};

console.log(logPatientsNamesAndLastAppointments());
