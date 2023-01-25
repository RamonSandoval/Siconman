import { ActionIcon, Badge, Button, Center, Group } from "@mantine/core";
import { IconRotateClockwise2, IconTool } from "@tabler/icons";
import { useState, useEffect, useRef } from "react";
import api from "../services/api";
import React from "react";
import { Chart as ChartJS, ArcElement, Legend, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const QualityStats = () => {
  const [arrayDevices, setarrayDevices] = useState([]);
  var contadorYes = 0;
  var contadorNo = 0;

  useEffect(() => {
    init();
  }, []);

  /**
   * The function init() is an asynchronous function that calls the api.devicesList() function twice,
   * once with the argument 1 and once with the argument 2. The function then concatenates the two
   * lists and sets the arrayDevices variable to the concatenated list.
   */
  async function init() {
    const list = await api.devicesList(1);
    const list2 = await api.devicesList(2);
    setarrayDevices(list.data.concat(list2.data));
  }

  //option #1
  var cantidadYes = arrayDevices.filter(
    (data) =>
      data.attributes.maintenance?.data?.attributes.maintenance_eval == "yes"
  );
  var cantidadNo = arrayDevices.filter(
    (data) =>
      data.attributes.maintenance?.data?.attributes.maintenance_eval == "no"
  );
  //option #2
  /* A ternary operator. */
  arrayDevices.map((data) => {
    data.attributes.maintenance?.data?.attributes.maintenance_eval == "yes"
      ? contadorYes++
      : data.attributes.maintenance?.data?.attributes.maintenance_eval === "no"
      ? contadorNo++
      : null;
  });

  /* Creating the data for the chart. */
  var data = {
    labels: [
      contadorYes + " Se realizaron a tiempo",
      contadorNo + " No se realizaron a tiempo",
    ],
    datasets: [
      {
        label: "Total de equipos",
        data: [contadorYes, contadorNo],
        borderWidth: 1,
        backgroundColor: ["rgba(81, 100, 219)", "rgb(232, 65, 65)"],
      },
    ],
  };

  /* The options for the chart. */
  var options = {
    cutout: 200,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    legend: {
      labels: {
        fontSize: 26,
      },
    },
  };

  /* Returning the chart. */
  return (
    <>
      <Center>
        <h4>Cantidad de mantenimientos realizados en tiempo y forma</h4>
      </Center>
      <div>
        <Doughnut data={data} height={900} options={options} />
      </div>
    </>
  );
};

export default QualityStats;
