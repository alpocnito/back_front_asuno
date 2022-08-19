import React, { useEffect, useState } from "react";
import "./styles.css";
import BasicButton from "./BasicButton/BasicButton.js";
import BasicValue from "./BasicValue/BasicValue.js";
import {
  Button,
  TextField,
  Grid,
  Checkbox,
  FormControlLabel,
  Box,
} from "@material-ui/core";
import {
  fetchData,
  fetchControlParameters,
  cmdFetchControlParameters,
  cmdFetchData,
  fetchTimetable,
  cmdFetchTimetable,
  cmdFetchLuxtable,
  fetchLuxtable,
  updateLuxtable,
  updateTimetable,
  updateConfig,
  updateReboot,
  fetchDataFromBD,
  deleteDataFromBD,
} from "../../api";
import useLocalStorageState from "use-local-storage-state";
import DateTimePicker from "react-datetime-picker";
import Details from "./Details/Details.js";
import ReactTooltip from "react-tooltip";

const DataDisplay = (props) => {
  const DEV_EUI = props.DEV_EUI;

  const [time_get_data, setTimeGetData] = useLocalStorageState(
    "time_get_data" + DEV_EUI,
    { defaultValue: 0 }
  );

  const [data, setData] = useLocalStorageState("data " + DEV_EUI, {
    defaultValue: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  });
  const [control_parameters, setControlParameters] = useLocalStorageState(
    "control_parameters " + DEV_EUI,
    { defaultValue: [0, 0, 0] }
  );

  const [day_timetable, setDayTimetable] = useLocalStorageState(
    "day_timetable " + DEV_EUI,
    { defaultValue: 0 }
  );
  const [day_timetable_err, setDayTimetableErr] = useLocalStorageState(
    "day_timetable_err " + DEV_EUI,
    { defaultValue: false }
  );
  const [day_timetable_err_text, setDayTimetableErrText] = useLocalStorageState(
    "day_timetable_err_text " + DEV_EUI,
    { defaultValue: "" }
  );

  const [month_timetable, setMonthTimetable] = useLocalStorageState(
    "month_timetable " + DEV_EUI,
    { defaultValue: 0 }
  );
  const [month_timetable_err, setMonthTimetableErr] = useLocalStorageState(
    "month_timetable_err " + DEV_EUI,
    { defaultValue: false }
  );
  const [month_timetable_err_text, setMonthTimetableErrText] =
    useLocalStorageState("month_timetable_err_text " + DEV_EUI, {
      defaultValue: "",
    });

  const [timetable, setTimetable] = useLocalStorageState(
    "timetable " + DEV_EUI,
    { defaultValue: [] }
  );
  const [luxtable, setLuxtable] = useLocalStorageState("luxtable " + DEV_EUI, {
    defaultValue: [],
  });

  const [new_timetable, setNewTimetable] = useLocalStorageState(
    "new_timetable " + DEV_EUI,
    { defaultValue: new Array(24).fill(0) }
  );
  const [new_timetable_err, setNewTimetableErr] = useLocalStorageState(
    "new_timetable_err " + DEV_EUI,
    { defaultValue: new Array(24).fill(false) }
  );
  const [new_timetable_err_text, setNewTimetableErrText] = useLocalStorageState(
    "new_timetable_err_text " + DEV_EUI,
    { defaultValue: new Array(24).fill("") }
  );

  const [new_luxtable, setNewLuxtable] = useLocalStorageState(
    "new_luxtable " + DEV_EUI,
    { defaultValue: new Array(11).fill(0) }
  );
  const [new_luxtable_err, setNewLuxtableErr] = useLocalStorageState(
    "new_luxtable_err " + DEV_EUI,
    { defaultValue: new Array(24).fill(false) }
  );
  const [new_luxtable_err_text, setNewLuxtableErrText] = useLocalStorageState(
    "new_luxtable_err_text " + DEV_EUI,
    { defaultValue: new Array(24).fill("") }
  );

  const [new_timetable_control, setNewTimetableControl] = useLocalStorageState(
    "new_timetable_control " + DEV_EUI,
    { defaultValue: [0, 0, 0, 0] }
  );
  const [new_timetable_control_err, setNewTimetableControlErr] =
    useLocalStorageState("new_timetable_control_err " + DEV_EUI, {
      defaultValue: new Array(4).fill(false),
    });
  const [new_timetable_control_err_text, setNewTimetableControlErrText] =
    useLocalStorageState("new_timetable_control_err_text " + DEV_EUI, {
      defaultValue: new Array(4).fill(""),
    });

  const [new_control_parameters, setNewControlParameters] =
    useLocalStorageState("new_control_parameters " + DEV_EUI, {
      defaultValue: [0, 0, 0, 0],
    });
  const [new_control_parameters_err, setNewControlParametersErr] =
    useLocalStorageState("new_control_parameters_err " + DEV_EUI, {
      defaultValue: new Array(4).fill(false),
    });
  const [new_control_parameters_err_text, setNewControlParametersErrText] =
    useLocalStorageState("new_control_parameters_err_text " + DEV_EUI, {
      defaultValue: new Array(4).fill(""),
    });

  const [new_control_parameters_checkb, setNewControlParametersChecb] =
    useLocalStorageState("new_control_parameters_checkb " + DEV_EUI, {
      defaultValue: [false, false, false, false],
    });

  const [upd_data, setUpdData] = useLocalStorageState("upd_data " + DEV_EUI, {
    defaultValue: 0,
  });

  const [upd_param, setUpdParam] = useLocalStorageState(
    "upd_param " + DEV_EUI,
    {
      defaultValue: 0,
    }
  );

  const [upd_data_from_db, setUpdDataFromDb] = useLocalStorageState(
    "upd_data_from_db " + DEV_EUI,
    {
      defaultValue: false,
    }
  );

  const [data_from_db, setDataFromDb] = useLocalStorageState(
    "upd_data " + DEV_EUI,
    {
      defaultValue: [],
    }
  );

  const [startDate, setStartDate] = useState(new Date());

  const [endDate, setEndDate] = useState(new Date());
  //
  //
  //
  //

  // useEffect(() => {
  //   subscribe();
  // }, []);

  // const subscribe = async () => {
  //   try {
  //     //cmdFetchData(DEV_EUI);
  //     console.log("S");
  //     try {
  //       var t_data = await fetchData(DEV_EUI);

  //       t_data = t_data.data;
  //       console.log(t_data);

  //       console.log("E");
  //       setData(t_data);

  //       var today = new Date();
  //       var time =
  //         today.getHours() +
  //         ":" +
  //         today.getMinutes() +
  //         ":" +
  //         today.getSeconds();
  //       setTimeGetData(time);

  //       setUpdData(upd_data + 1);
  //     } catch (err) {
  //       console.log(err);
  //     }

  //     await subscribe();
  //   } catch (e) {
  //     setTimeout(() => {
  //       subscribe();
  //     }, 500);
  //   }
  // };

  // const subscribe = async () => {
  //   setTimeout(() => {
  //     subscribe();
  //     getDataFromBD();
  //   }, 5000);
  // };

  //
  //

  const getControlParameters = async () => {
    cmdFetchControlParameters(DEV_EUI);
    const { data } = await fetchControlParameters(DEV_EUI);
    setControlParameters(data);

    setUpdParam(upd_param + 1);
  };

  const getData = async () => {
    cmdFetchData(DEV_EUI);
    const { data } = await fetchData(DEV_EUI);
    setData(data);

    var today = new Date();
    var time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    setTimeGetData(time);

    setUpdData(upd_data + 1);
    //console.log(upd_data);
  };

  const getTimetable = async () => {
    cmdFetchTimetable(DEV_EUI, day_timetable, month_timetable);
    const { data } = await fetchTimetable(DEV_EUI);
    setTimetable(data);
  };

  const getLuxtable = async () => {
    cmdFetchLuxtable(DEV_EUI);
    const { data } = await fetchLuxtable(DEV_EUI);
    setLuxtable(data);
  };

  const setLuxtableCb = (index, value) => {
    let temp_new_luxtable_err = new_luxtable_err;
    let temp_new_luxtable_err_text = new_luxtable_err_text;

    if (Number(value) >= 0 && Number(value) <= 65535) {
      temp_new_luxtable_err[index] = false;
      temp_new_luxtable_err_text[index] = "";
    } else {
      temp_new_luxtable_err[index] = true;
      temp_new_luxtable_err_text[index] = "Введите значения от 0 до 65535";
    }
    setNewLuxtableErr(temp_new_luxtable_err);
    setNewLuxtableErrText(temp_new_luxtable_err_text);

    let temp = [...new_luxtable];
    temp[index] = value;

    setNewLuxtable(temp);
  };

  const setTimetableCb = (index, value) => {
    let temp_new_timetable_err = new_timetable_err;
    let temp_new_timetable_err_text = new_timetable_err_text;

    if (
      Number(value) >= 0 &&
      Number(value) <= 100 &&
      Number(value) % 10 === 0
    ) {
      temp_new_timetable_err[index] = false;
      temp_new_timetable_err_text[index] = "";
    } else {
      temp_new_timetable_err[index] = true;
      temp_new_timetable_err_text[index] =
        "Введите значения от 0 до 100 кратное 10";
    }

    setNewTimetableErr(temp_new_timetable_err);
    setNewTimetableErrText(temp_new_timetable_err_text);

    let temp = [...new_timetable];
    temp[index] = Number(value);

    setNewTimetable(temp);
  };

  const setNewTimetableControlCb = (index, value) => {
    let temp_new_timetable_control_err = new_timetable_control_err;
    let temp_new_timetable_control_err_text = new_timetable_control_err_text;

    if (index === 0 || index === 2) {
      if (Number(value) >= 0 && Number(value) <= 30) {
        temp_new_timetable_control_err[index] = false;
        temp_new_timetable_control_err_text[index] = "";
      } else {
        temp_new_timetable_control_err[index] = true;
        temp_new_timetable_control_err_text[index] =
          "Введите значения от 0 до 30";
      }
    } else {
      if (Number(value) >= 0 && Number(value) <= 11) {
        temp_new_timetable_control_err[index] = false;
        temp_new_timetable_control_err_text[index] = "";
      } else {
        temp_new_timetable_control_err[index] = true;
        temp_new_timetable_control_err_text[index] =
          "Введите значения от 0 до 11";
      }
    }

    let temp_new_timetable_control = [...new_timetable_control];
    temp_new_timetable_control[index] = Number(value);

    setNewTimetableControl(temp_new_timetable_control);

    if (
      temp_new_timetable_control[1] > temp_new_timetable_control[3] ||
      (temp_new_timetable_control[1] === temp_new_timetable_control[3] &&
        temp_new_timetable_control[0] > temp_new_timetable_control[2])
    ) {
      temp_new_timetable_control_err[index] = true;
      temp_new_timetable_control_err_text[index] =
        "Начальная дата должна быть меньше конечной";

      setNewTimetableControlErr(temp_new_timetable_control_err);
      setNewTimetableControlErrText(temp_new_timetable_control_err_text);
    }
  };

  const setNewControlParametersCb = (index, value) => {
    let temp_new_control_parameters = [...new_control_parameters];
    temp_new_control_parameters[index] = Number(value);

    setNewControlParameters(temp_new_control_parameters);

    //

    let temp_new_control_parameters_err = new_control_parameters_err;
    let temp_new_control_parameters_err_text = new_control_parameters_err_text;

    if (
      temp_new_control_parameters[0] >= 1 &&
      temp_new_control_parameters[0] <= 4
    ) {
      temp_new_control_parameters_err[0] = false;
      temp_new_control_parameters_err_text[0] = "";
    } else {
      temp_new_control_parameters_err[0] = true;
      temp_new_control_parameters_err_text[0] = "Введите значение от 1 до 4";
    }

    if (
      temp_new_control_parameters[1] >= 1 &&
      temp_new_control_parameters[1] <= 65535
    ) {
      temp_new_control_parameters_err[1] = false;
      temp_new_control_parameters_err_text[1] = "";
    } else {
      temp_new_control_parameters_err[1] = true;
      temp_new_control_parameters_err_text[1] =
        "Введите значение от 1 до 65535";
    }

    if (
      temp_new_control_parameters[2] === 1 ||
      temp_new_control_parameters[2] === 2 ||
      temp_new_control_parameters[2] === 64 ||
      temp_new_control_parameters[2] === 128
    ) {
      temp_new_control_parameters_err[2] = false;
      temp_new_control_parameters_err_text[2] = "";
    } else {
      temp_new_control_parameters_err[2] = true;
      temp_new_control_parameters_err_text[2] =
        "Введите значение из списка: 1, 2, 64, 128";
    }

    if (
      temp_new_control_parameters[3] >= 0 &&
      temp_new_control_parameters[3] <= 100 &&
      temp_new_control_parameters[3] % 10 === 0
    ) {
      temp_new_control_parameters_err[3] = false;
      temp_new_control_parameters_err_text[3] = "";
    } else {
      temp_new_control_parameters_err[3] = true;
      temp_new_control_parameters_err_text[3] =
        "Введите значение от 0 до 100, кратное 10";
    }

    setNewControlParametersErr(temp_new_control_parameters_err);
    setNewControlParametersErrText(temp_new_control_parameters_err_text);
  };

  const setNewControlParametersCheckbCb = (index, value) => {
    let temp = [...new_control_parameters_checkb];
    temp[index] = value;

    setNewControlParametersChecb(temp);
  };

  const updateNewControlParametersCb = () => {
    let command_choose = 0;
    if (new_control_parameters_checkb[0]) command_choose += 0x01;
    if (new_control_parameters_checkb[1]) command_choose += 0x02;
    if (new_control_parameters_checkb[2]) command_choose += 0x04;
    if (new_control_parameters_checkb[3]) command_choose += 0x08;

    updateConfig(DEV_EUI, [command_choose].concat(new_control_parameters));
  };

  const setReboot = async () => {
    updateReboot(DEV_EUI);
  };

  const setDayTimetableCb = (value) => {
    if (Number(value) >= 0 && Number(value) <= 30) {
      setDayTimetableErr(false);
      setDayTimetableErrText("");
    } else {
      setDayTimetableErr(true);
      setDayTimetableErrText("Введите значение от 0 до 30");
    }

    setDayTimetable(Number(value));
  };

  const setMonthTimetableCb = (value) => {
    if (Number(value) >= 0 && Number(value) <= 11) {
      setMonthTimetableErr(false);
      setMonthTimetableErrText("");
    } else {
      setMonthTimetableErr(true);
      setMonthTimetableErrText("Введите значение от 0 до 11");
    }

    setMonthTimetable(Number(value));
  };

  const getDataFromBD = async () => {
    if (startDate >= endDate) {
      alert("Начальная дата должна быть меньше конечной");
      return;
    }

    const { data } = await fetchDataFromBD(DEV_EUI, startDate, endDate);
    setUpdDataFromDb(!upd_data_from_db);
    setDataFromDb(data);

    let last_data = data[data.length - 1];
    setData([
      last_data["lamp_brightness"],
      last_data["temp_value"],
      last_data["light_value"],
      last_data["roll"],
      last_data["pitch"],
      last_data["lamp_voltage"],
      last_data["lamp_current"],
      last_data["active_power"],
      last_data["reactive_power"],
      last_data["time_modem"],
      last_data["time_reload"],
      last_data["rssi"],
      last_data["SNR"],
      last_data["bandwidth"],
      last_data["spreadingFactor"],
      last_data["codeRate"],
    ]);
  };

  const deleteDataFromBDCb = async () => {
    const { data } = await deleteDataFromBD(DEV_EUI);
    setUpdDataFromDb(!upd_data_from_db);
    setDataFromDb([]);
  };
  const tooltipContent = ["tooltip1", "tooltip2", "tooltip3"];

  return (
    <div>
      {/* <WedgeContainer>
        <Button
          variant="icon"
          onClick={() => openView(sv)}
          disabled={sv.disabled || !item.canEdit}
        >
          <Tooltip content={tooltipContent[index]}>
            <Icon
              iconId={sv.iconId}
              size="medium"
              cursor="pointer"
              color={theme.font.color.primaryDark}
            />
          </Tooltip>
        </Button>
        {!!sv.count && (
          <Badge
            borderColor={theme.color.alert}
            color={theme.color.alert}
            top="-3rem"
            right="-1.5rem"
            content={sv.count}
          />
        )}
        <Wedge />
      </WedgeContainer> */}

      <Box sx={{ marginTop: "30px", marginBottom: "30px" }}>
        <Grid
          container
          alignItems="flex-start"
          spacing={1}
          direction="row"
          styles={{ border: "80px" }}
        >
          <Grid item>
            <Button variant="outlined" onClick={getData}>
              Получить данные
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" onClick={getDataFromBD}>
              Загрузить данные из базы
            </Button>
          </Grid>
          {/* <Grid item>
            <Button variant="outlined" onClick={deleteDataFromBDCb}>
              Удалить все из базы данных к хуям
            </Button>
          </Grid> */}
          <Grid item>
            <div>Начальная дата</div>
            <DateTimePicker value={startDate} onChange={setStartDate} />
          </Grid>
          <Grid item>
            <div>Конечная дата</div>
            <DateTimePicker value={endDate} onChange={setEndDate} />
          </Grid>
          <Button variant="outlined" onClick={setReboot}>
            Перезагрузить устройство
          </Button>
        </Grid>
      </Box>
      <Box>
        <Grid
          container
          alignItems="flex-start"
          spacing={1}
          direction="row"
          styles={{ border: "80px" }}
        >
          <Details summaryContent={<span>Параметры электросети</span>} open>
            <Grid item style={{ margin: "10px" }}>
              <Grid container spacing={1} direction="column">
                <Grid item>
                  <BasicButton
                    name="Напряжение"
                    value={`${data[5]} мВ`}
                    upd_var={upd_data}
                    DEV_EUI={DEV_EUI}
                    upd_db={upd_data_from_db}
                    data_db={data_from_db}
                    cont={data[5]}
                  />
                </Grid>
                <Grid item>
                  <BasicButton
                    name="Ток"
                    value={`${data[6]} мА`}
                    upd_var={upd_data}
                    DEV_EUI={DEV_EUI}
                    upd_db={upd_data_from_db}
                    data_db={data_from_db}
                    cont={data[6]}
                  />
                </Grid>
                <Grid item>
                  <BasicButton
                    name="Активная мощность"
                    value={`${data[7]} мВт`}
                    upd_var={upd_data}
                    DEV_EUI={DEV_EUI}
                    upd_db={upd_data_from_db}
                    data_db={data_from_db}
                    cont={data[7]}
                  />
                </Grid>
                <Grid item>
                  <BasicButton
                    name="Реактивная мощность"
                    value={`${data[8]} мА`}
                    upd_var={upd_data}
                    DEV_EUI={DEV_EUI}
                    upd_db={upd_data_from_db}
                    data_db={data_from_db}
                    cont={data[8]}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Details>

          <Details summaryContent={<span>Показания</span>} open>
            <Grid item style={{ margin: "10px" }}>
              <Grid container spacing={1} direction="column">
                <Grid item>
                  <BasicButton
                    name="Температура"
                    value={`${data[1]} °C`}
                    upd_var={upd_data}
                    DEV_EUI={DEV_EUI}
                    upd_db={upd_data_from_db}
                    data_db={data_from_db}
                    cont={data[1]}
                  />
                </Grid>
                <Grid item>
                  <BasicButton
                    name="Яркость светильника"
                    value={`${data[0]} %`}
                    upd_var={upd_data}
                    DEV_EUI={DEV_EUI}
                    upd_db={upd_data_from_db}
                    data_db={data_from_db}
                    cont={data[0]}
                  />
                </Grid>
                <Grid item>
                  <BasicButton
                    name="Датчик освещенности"
                    value={`${data[2]} лк`}
                    upd_var={upd_data}
                    DEV_EUI={DEV_EUI}
                    upd_db={upd_data_from_db}
                    data_db={data_from_db}
                    cont={data[2]}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Details>

          <Details summaryContent={<span>Углы наклона</span>} open>
            <Grid item style={{ margin: "10px" }}>
              <Grid container spacing={1} direction="column">
                <Grid item>
                  <BasicButton
                    name="Крен"
                    value={`${data[4]} °`}
                    upd_var={upd_data}
                    DEV_EUI={DEV_EUI}
                    upd_db={upd_data_from_db}
                    data_db={data_from_db}
                    cont={data[4]}
                  />
                </Grid>
                <Grid item>
                  <BasicButton
                    name="Тангаж"
                    value={`${data[3]} °`}
                    upd_var={upd_data}
                    DEV_EUI={DEV_EUI}
                    upd_db={upd_data_from_db}
                    data_db={data_from_db}
                    cont={data[3]}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Details>

          <Details summaryContent={<span>Время</span>} open>
            <Grid item style={{ margin: "10px" }}>
              <Grid container spacing={1} direction="column">
                <Grid item>
                  <BasicButton
                    name="Время устройства"
                    value={`${data[9]} с`}
                    upd_var={upd_data}
                    DEV_EUI={DEV_EUI}
                    upd_db={upd_data_from_db}
                    data_db={data_from_db}
                    cont={data[9]}
                  />
                </Grid>
                <Grid item>
                  <BasicButton
                    name="Время с перезагрузки"
                    value={`${data[10]} с`}
                    upd_var={upd_data}
                    DEV_EUI={DEV_EUI}
                    upd_db={upd_data_from_db}
                    data_db={data_from_db}
                    cont={data[10]}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Details>

          <Details summaryContent={<span>Данные передачи</span>} open>
            <Grid item style={{ margin: "10px" }}>
              <Grid container spacing={1} direction="column">
                <Grid item>
                  <BasicButton
                    name="rssi"
                    value={`${data[11]}`}
                    upd_var={upd_data}
                    DEV_EUI={DEV_EUI}
                    upd_db={upd_data_from_db}
                    data_db={data_from_db}
                    cont={data[11]}
                  />
                </Grid>
                <Grid item>
                  <BasicButton
                    name="SNR"
                    value={`${data[12]}`}
                    upd_var={upd_data}
                    DEV_EUI={DEV_EUI}
                    upd_db={upd_data_from_db}
                    data_db={data_from_db}
                    cont={data[12]}
                  />
                </Grid>
                <Grid item>
                  <BasicButton
                    name="bandwidth"
                    value={`${data[13]}`}
                    upd_var={upd_data}
                    DEV_EUI={DEV_EUI}
                    upd_db={upd_data_from_db}
                    data_db={data_from_db}
                    cont={data[13]}
                  />
                </Grid>
                <Grid item>
                  <BasicButton
                    name="spreadingFactor"
                    value={`${data[14]}`}
                    upd_var={upd_data}
                    DEV_EUI={DEV_EUI}
                    upd_db={upd_data_from_db}
                    data_db={data_from_db}
                    cont={data[14]}
                  />
                </Grid>
                <Grid item>
                  <BasicButton
                    name="codeRate"
                    value={`${data[15]}`}
                    upd_var={upd_data}
                    DEV_EUI={DEV_EUI}
                    upd_db={upd_data_from_db}
                    data_db={data_from_db}
                    cont={data[15]}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Details>

          {/* <Grid item>
            <Grid container spacing={1} direction="column">
              <Grid item>Информация</Grid>
              <Grid item>
                <BasicButton
                  name="Последнее обновление данных"
                  value={time_get_data}
                />
              </Grid>
            </Grid>
          </Grid> */}
        </Grid>

        <Grid container spacing={1} direction="row">
          <Grid item>
            <Details
              summaryContent={<span>Timetable и Luxtable</span>}
              open
              style={{ width: "922px", margin: "6px" }}
            >
              <Grid
                container
                alignItems="flex-start"
                spacing={5}
                direction="row"
                style={{ margin: "10px" }}
              >
                <Grid item>
                  <Grid container direction="column">
                    <Grid item>Timetable</Grid>

                    {timetable.map((light, index) => (
                      <Grid item>
                        <Button key={index}>{`${index
                          .toString()
                          .padStart(2, "0")}:00: ${light.toString()}%`}</Button>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>

                <Grid item>
                  <Grid container direction="column">
                    <Grid item>Luxtable</Grid>

                    {luxtable.map((light, index) => (
                      <Grid item>
                        <Button key={index}>{`${(index * 10)
                          .toString()
                          .padStart(
                            3,
                            "0"
                          )}%  -  ${light.toString()} лк`}</Button>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>

                <Grid item>
                  <Grid container spacing={1} direction="column">
                    <Grid item>Set timetable</Grid>

                    {new_timetable.map((light, index) => (
                      <Grid item>
                        <TextField
                          key={index}
                          label={`brightness in % for ${index
                            .toString()
                            .padStart(2, "0")}:00`}
                          value={light}
                          onChange={(event) =>
                            setTimetableCb(index, event.target.value)
                          }
                          error={new_timetable_err[index]}
                          helperText={new_timetable_err_text[index]}
                        ></TextField>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>

                <Grid item>
                  <Grid container spacing={1} direction="column">
                    <Grid item>Set luxtable</Grid>

                    {new_luxtable.map((light, index) => (
                      <Grid item>
                        <TextField
                          key={index}
                          label={`luxes for ${(index * 10).toString()}%`}
                          value={light}
                          onChange={(event) =>
                            setLuxtableCb(index, event.target.value)
                          }
                          error={new_luxtable_err[index]}
                          helperText={new_luxtable_err_text[index]}
                        ></TextField>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>

                <Grid item>
                  <Grid container spacing={1} direction="row">
                    <Grid item>
                      <Grid container spacing={1} direction="column">
                        <Grid item>
                          <TextField
                            key={0}
                            variant="outlined"
                            label="first day"
                            value={new_timetable_control[0]}
                            onChange={(event) =>
                              setNewTimetableControlCb(0, event.target.value)
                            }
                            error={new_timetable_control_err[0]}
                            helperText={new_timetable_control_err_text[0]}
                          ></TextField>
                        </Grid>
                        <Grid item>
                          <TextField
                            key={1}
                            variant="outlined"
                            label="first month"
                            value={new_timetable_control[1]}
                            onChange={(event) =>
                              setNewTimetableControlCb(1, event.target.value)
                            }
                            error={new_timetable_control_err[1]}
                            helperText={new_timetable_control_err_text[1]}
                          ></TextField>
                        </Grid>
                        <Grid item>
                          <TextField
                            key={2}
                            variant="outlined"
                            label="last day"
                            value={new_timetable_control[2]}
                            onChange={(event) =>
                              setNewTimetableControlCb(2, event.target.value)
                            }
                            error={new_timetable_control_err[2]}
                            helperText={new_timetable_control_err_text[2]}
                          ></TextField>
                        </Grid>
                        <Grid item>
                          <TextField
                            key={3}
                            variant="outlined"
                            label="last month"
                            value={new_timetable_control[3]}
                            onChange={(event) =>
                              setNewTimetableControlCb(3, event.target.value)
                            }
                            error={new_timetable_control_err[3]}
                            helperText={new_timetable_control_err_text[3]}
                          ></TextField>
                        </Grid>
                        <Grid item>
                          <Button
                            variant="outlined"
                            onClick={() => {
                              if (
                                new_timetable_control_err.every(
                                  (cur) => !cur
                                ) &&
                                new_timetable_err.every((cur) => !cur)
                              )
                                updateTimetable(
                                  DEV_EUI,
                                  new_timetable_control.concat(new_timetable)
                                );
                            }}
                          >
                            Установить Timetable
                          </Button>
                        </Grid>
                        <Grid item>
                          <a data-tip data-for="Timetable">
                            Про Timetable
                          </a>
                          <ReactTooltip
                            id="Timetable"
                            aria-haspopup="true"
                            effect="solid"
                            delayHide={100}
                            place="right"
                            styles={{ "font-size": "30px" }}
                          >
                            <p>
                              0x03 – LAMP_CONTROL_MODE_TIME Управление модемом
                              по расписанию
                            </p>
                            <p>
                              В данном режиме яркость лампы модема регулируется
                              по расписанию (Timetable)
                            </p>
                            <p>
                              На каждый день хранится массив на 24 числа -
                              значение яркости на каждый час
                            </p>
                            <p>
                              Установка Timetable происходит сразу на интервал
                              времени. Дни и месяцы отсчитываются с 0
                            </p>
                          </ReactTooltip>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item>
                      <Grid container spacing={1} direction="column">
                        <Grid item>
                          <TextField
                            variant="outlined"
                            label="day"
                            value={day_timetable}
                            onChange={(event) =>
                              setDayTimetableCb(event.target.value)
                            }
                            error={day_timetable_err}
                            helperText={day_timetable_err_text}
                          ></TextField>
                        </Grid>
                        <Grid item>
                          <TextField
                            variant="outlined"
                            label="month"
                            value={month_timetable}
                            onChange={(event) =>
                              setMonthTimetableCb(event.target.value)
                            }
                            error={month_timetable_err}
                            helperText={month_timetable_err_text}
                          ></TextField>
                        </Grid>
                        <Grid item>
                          <Button
                            variant="outlined"
                            onClick={() => {
                              if (!day_timetable_err && !month_timetable_err)
                                getTimetable();
                            }}
                          >
                            Запросить Timetable
                          </Button>
                          <div style={{ marginTop: "60px" }}></div>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item>
                      <Grid container spacing={1} direction="column">
                        <Grid item>
                          <Button
                            variant="outlined"
                            onClick={() => {
                              if (new_luxtable_err.every((cur) => !cur))
                                updateLuxtable(DEV_EUI, new_luxtable);
                            }}
                          >
                            Установить Luxtable
                          </Button>
                        </Grid>

                        <Grid item>
                          <Button variant="outlined" onClick={getLuxtable}>
                            Запросить Luxtable
                          </Button>
                        </Grid>

                        <Grid item>
                          <a data-tip data-for="Luxtable">
                            Про Luxtable
                          </a>
                          <ReactTooltip
                            id="Luxtable"
                            aria-haspopup="true"
                            effect="solid"
                            delayHide={100}
                            place="right"
                            styles={{ "font-size": "30px" }}
                          >
                            <p>
                              0х02 – LAMP_CONTROL_MODE_LIGHT_SENSOR Управление
                              модемом через датчик освещенности
                            </p>
                            <p>
                              В данном режиме яркость лампы модема регулируется
                              через датчик освещенности
                            </p>
                            <p>
                              Модем регулирует яркость лампы по массиву
                              соответствия (Luxtable)
                            </p>
                            <p>
                              Luxtable задает яркость лампы в ПРОЦЕНТАХ,
                              соответственное показаниям люксометра в ЛЮКСАХ
                            </p>
                          </ReactTooltip>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Details>
          </Grid>

          <Grid item>
            <Details
              summaryContent={<span>Параметры</span>}
              open
              style={{ width: "922px", margin: "6px" }}
            >
              <Grid
                container
                alignItems="flex-start"
                spacing={5}
                direction="row"
                style={{ margin: "10px" }}
              >
                <Grid item>
                  <Grid container spacing={1} direction="column">
                    <TextField
                      variant="outlined"
                      label="Режим работы модема"
                      value={new_control_parameters[0]}
                      onChange={(event) =>
                        setNewControlParametersCb(0, event.target.value)
                      }
                      error={new_control_parameters_err[0]}
                      helperText={new_control_parameters_err_text[0]}
                    ></TextField>
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={(event) =>
                            setNewControlParametersCheckbCb(
                              0,
                              event.target.checked
                            )
                          }
                        />
                      }
                      label="Включить поле Режим работы модема"
                    />
                    <TextField
                      variant="outlined"
                      label="Интервал передачи данных"
                      value={new_control_parameters[1]}
                      onChange={(event) =>
                        setNewControlParametersCb(1, event.target.value)
                      }
                      error={new_control_parameters_err[1]}
                      helperText={new_control_parameters_err_text[1]}
                    ></TextField>
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={(event) =>
                            setNewControlParametersCheckbCb(
                              1,
                              event.target.checked
                            )
                          }
                        />
                      }
                      label="Включить поле Интервал передачи данных"
                    />
                    <TextField
                      variant="outlined"
                      label="Усиления люксметра"
                      value={new_control_parameters[2]}
                      onChange={(event) =>
                        setNewControlParametersCb(2, event.target.value)
                      }
                      error={new_control_parameters_err[2]}
                      helperText={new_control_parameters_err_text[2]}
                    ></TextField>
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={(event) =>
                            setNewControlParametersCheckbCb(
                              2,
                              event.target.checked
                            )
                          }
                        />
                      }
                      label="Включить поле Усиления люксметра"
                    />
                    <TextField
                      variant="outlined"
                      label="Значение яркости"
                      value={new_control_parameters[3]}
                      onChange={(event) =>
                        setNewControlParametersCb(3, event.target.value)
                      }
                      error={new_control_parameters_err[3]}
                      helperText={new_control_parameters_err_text[3]}
                    ></TextField>
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={(event) =>
                            setNewControlParametersCheckbCb(
                              3,
                              event.target.checked
                            )
                          }
                        />
                      }
                      label="Включить поле Значение яркости"
                    />
                    <Button
                      variant="outlined"
                      onClick={() => {
                        if (new_control_parameters_err.every((cur) => !cur))
                          updateNewControlParametersCb();
                      }}
                    >
                      Установить параметры
                    </Button>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container spacing={1} direction="column">
                    <Grid item>
                      <BasicValue
                        name="Режим работы модема"
                        value={control_parameters[0]}
                        upd_var={upd_param}
                        DEV_EUI={DEV_EUI}
                        upd_db={upd_data_from_db}
                        data_db={data_from_db}
                        cont={control_parameters[0]}
                      />
                      <a data-tip data-for="global">
                        Про режимы работы модема
                      </a>
                      <ReactTooltip
                        id="global"
                        aria-haspopup="true"
                        effect="solid"
                        delayHide={100}
                        styles={{ "font-size": "30px" }}
                      >
                        <p>Режимы рабоыт модема</p>
                        <ul>
                          <li>
                            0x01 – LAMP_CONTROL_MODE_MANUAL Ручное управление
                            модемом
                          </li>
                          <li>
                            0х02 – LAMP_CONTROL_MODE_LIGHT_SENSOR Управление
                            модемом через датчик освещенности
                          </li>
                          <li>
                            0x03 – LAMP_CONTROL_MODE_TIME Управление модемом по
                            расписанию
                          </li>
                          <li>
                            0x04 – LAMP_CONTROL_MODE_NONE Зарезервированный
                            режим
                          </li>
                        </ul>
                      </ReactTooltip>
                    </Grid>
                    <Grid item>
                      <BasicValue
                        name="Интервал передачи данных"
                        value={`${control_parameters[1]} мин`}
                        upd_var={upd_param}
                        DEV_EUI={DEV_EUI}
                        upd_db={upd_data_from_db}
                        data_db={data_from_db}
                        cont={control_parameters[1]}
                      />
                    </Grid>
                    <Grid item>
                      <BasicValue
                        name="Усиление люксометра"
                        value={control_parameters[2]}
                        upd_var={upd_param}
                        DEV_EUI={DEV_EUI}
                        upd_db={upd_data_from_db}
                        data_db={data_from_db}
                        cont={control_parameters[2]}
                      />
                    </Grid>
                    <Grid item>
                      <Button variant="outlined" onClick={getControlParameters}>
                        Получить параметры
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Details>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default DataDisplay;
