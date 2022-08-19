import axios from "axios";

// const SERVER_URL = "10.15.30.207";
const SERVER_URL = "10.15.30.46";

const SERVER_CMD = "http://" + SERVER_URL + ":5001/cmds";
const SERVER_GET = "http://" + SERVER_URL + ":5001/get";

export const fetchPosts = () => axios.get(SERVER_CMD);
export const createPost = (newPost) => {
  axios.get(SERVER_CMD + "/" + newPost.command);
};

const cmdGetControlParametersUrl = SERVER_CMD + "/01";
export const cmdFetchControlParameters = (DEV_EUI) =>
  axios
    .get(
      cmdGetControlParametersUrl,
      { params: { DEV_EUI: DEV_EUI } },
      { timeout: 5000 }
    )
    .catch((err) => {
      console.log(err);
    });

const getControlParametersUrl = SERVER_GET + "/01";
export const fetchControlParameters = (DEV_EUI) =>
  axios.get(
    getControlParametersUrl,
    { params: { DEV_EUI: DEV_EUI } },
    { timeout: 10000 }
  );

//

const cmdGetDataUrl = SERVER_CMD + "/03";
export const cmdFetchData = (DEV_EUI) =>
  axios
    .get(cmdGetDataUrl, { params: { DEV_EUI: DEV_EUI } }, { timeout: 5000 })
    .catch((err) => {
      console.log(err);
    });

const getDataUrl = SERVER_GET + "/03";
export const fetchData = (DEV_EUI) =>
  axios.get(getDataUrl, { params: { DEV_EUI: DEV_EUI } }, { timeout: 10000 });

//

const cmdGetTimetableUrl = SERVER_CMD + "/02";
export const cmdFetchTimetable = (DEV_EUI, day, month) =>
  axios
    .get(
      cmdGetTimetableUrl +
        day.toString(16).padStart(2, "0") +
        month.toString(16).padStart(2, "0"),
      { params: { DEV_EUI: DEV_EUI } },
      {
        timeout: 5000,
      }
    )
    .catch((err) => {
      console.log(err);
    });

const getTimetableUrl = SERVER_GET + "/02";
export const fetchTimetable = (DEV_EUI) =>
  axios.get(
    getTimetableUrl,
    { params: { DEV_EUI: DEV_EUI } },
    { timeout: 10000 }
  );

//

const cmdGetLuxtableUrl = SERVER_CMD + "/04";
export const cmdFetchLuxtable = (DEV_EUI) =>
  axios
    .get(
      cmdGetLuxtableUrl,
      { params: { DEV_EUI: DEV_EUI } },
      {
        timeout: 5000,
      }
    )
    .catch((err) => {
      console.log(err);
    });

const getLuxtableUrl = SERVER_GET + "/04";
export const fetchLuxtable = (DEV_EUI) =>
  axios.get(
    getLuxtableUrl,
    { params: { DEV_EUI: DEV_EUI } },
    { timeout: 10000 }
  );

//
const setLuxtableUrl = SERVER_CMD + "/FC";
export const updateLuxtable = (DEV_EUI, params) =>
  axios.get(
    setLuxtableUrl +
      params
        .map((param) => {
          let temp_str = Number(param).toString(16).padStart(4, "0");
          // Change to Big-Endian
          let new_str = temp_str[2] + temp_str[3] + temp_str[0] + temp_str[1];
          return new_str;
        })
        .join(""),
    { params: { DEV_EUI: DEV_EUI } },
    { timeout: 5000 }
  );

//

const setTimetableUrl = SERVER_CMD + "/FD";
export const updateTimetable = (DEV_EUI, params) =>
  axios.get(
    setTimetableUrl +
      params.map((param) => param.toString(16).padStart(2, "0")).join(""),
    { params: { DEV_EUI: DEV_EUI } },
    { timeout: 5000 }
  );

//

const setConfigUrl = SERVER_CMD + "/FE";
export const updateConfig = (DEV_EUI, params) => {
  let string_params = params
    .map((param, index) => {
      if (index === 2) return param.toString(16).padStart(4, "0");
      else return param.toString(16).padStart(2, "0");
    })
    .join("");
  // Change to Big-Endian
  string_params =
    string_params.slice(0, 4) +
    string_params.slice(6, 8) +
    string_params.slice(4, 6) +
    string_params.slice(8);

  axios.get(
    setConfigUrl + string_params,
    { params: { DEV_EUI: DEV_EUI } },
    { timeout: 5000 }
  );
};

//

const setRebootUrl = SERVER_CMD + "/FF";
export const updateReboot = (DEV_EUI) =>
  axios.get(setRebootUrl, { params: { DEV_EUI: DEV_EUI } }, { timeout: 5000 });

//

const fetchDataFromBDUrl = SERVER_GET + "/50";
export const fetchDataFromBD = (DEV_EUI, startDate, endDate) =>
  axios.get(
    fetchDataFromBDUrl,
    { params: { DEV_EUI, startDate, endDate } },
    { timeout: 10000 }
  );

//

const deleteDataFromBDUrl = SERVER_GET + "/51";
export const deleteDataFromBD = (DEV_EUI) =>
  axios.get(
    deleteDataFromBDUrl,
    { params: { DEV_EUI: DEV_EUI } },
    { timeout: 10000 }
  );
