import React, { useEffect } from "react";
import "./styles.css";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import useLocalStorageState from "use-local-storage-state";

function prettyDate(today) {
  return (
    today.getDay() +
    "." +
    today.getMonth() +
    "-" +
    today.getHours() +
    ":" +
    today.getMinutes() +
    ":" +
    today.getSeconds()
  );
}

const frontName_servName = {
  Напряжение: "lamp_voltage",
  Ток: "lamp_current",
  "Активная мощность": "active_power",
  "Реактивная мощность": "reactive_power",
  Температура: "temp_value",
  "Яркость светильника": "lamp_brightness",
  "Датчик освещенности": "light_value",
  "Время устройства": "time_modem",
  "Время с перезагрузки": "time_reload",
  Крен: "roll",
  Тангаж: "pitch",
  rssi: "rssi",
  SNR: "SNR",
  bandwidth: "bandwidth",
  spreadingFactor: "spreadingFactor",
  codeRate: "codeRate",
};

const BasicButton = (props) => {
  const [labels, setLabels] = useLocalStorageState(
    "labels" + props.name + props.DEV_EUI,
    {
      defaultValue: {},
    }
  );
  const [data, setData] = useLocalStorageState(
    "data" + props.name + props.DEV_EUI,
    {
      defaultValue: {},
    }
  );

  useEffect(() => {
    if (!Array.isArray(props.data_db)) return;

    let t_data = data;
    let t_labels = labels;

    t_data[`${props.name}`] = props.data_db.map((sample_data) => {
      return sample_data[frontName_servName[`${props.name}`]];
    });
    t_labels[`${props.name}`] = props.data_db.map((sample_data) =>
      prettyDate(new Date(sample_data["receivedAt"]))
    );

    setLabels(t_labels);
    setData(t_data);

    // console.log(data);
    // console.log(labels);
  }, [props.upd_db]);

  // useEffect(() => {
  //   let t_data = data;
  //   let t_labels = labels;

  //   if (data[props.name] === undefined) {
  //     t_data[`${props.name}`] = [props.cont];
  //     t_labels[`${props.name}`] = [prettyDate(new Date())];
  //   } else {
  //     t_data[`${props.name}`].push(props.cont);
  //     t_labels[`${props.name}`].push(prettyDate(new Date()));
  //   }
  //   setLabels(t_labels);
  //   setData(t_data);

  //   // console.log(data);
  //   // console.log(labels);
  // }, [props.upd_var]);

  return (
    <div id="DIV_1">
      <div id="DIV_2"></div>

      <div id="DIV_11">
        <div id="DIV_12">{props.name}</div>
        <div id="DIV_9">
          <div id="A_10">{props.value}</div>
        </div>
      </div>

      <Line
        datasetIdKey="id12"
        data={{
          labels: labels[props.name],
          datasets: [
            {
              id: 2,
              data: data[props.name],
              borderColor: "rgb(53, 162, 235)",
            },
          ],
        }}
        options={{
          plugins: {
            legend: {
              display: false,
            },
            tooltips: {
              callbacks: {
                label: function (tooltipItem) {
                  return tooltipItem.yLabel;
                },
              },
            },
          },
        }}
      />
    </div>
  );
};

export default BasicButton;
