import { ActionIcon, Badge, Button, Center, Group } from "@mantine/core";
import { IconRotateClockwise2, IconTool } from "@tabler/icons";
import { useState, useEffect, useRef } from "react";
import api from "../services/api";
import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Legend,
  Tooltip,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const QualityStats = () => {
  const [arrayDevices, setarrayDevices] = useState([]);
  useEffect(() => {
    init();
  }, []);

  async function init() {
    const list = await api.devicesList(1);
    const list2 = await api.devicesList(2);
    setarrayDevices(list.data.concat(list2.data));
  }



  const deviceList = arrayDevices.map((d) => {
        return (d.attributes?.maintenance.data?.attributes.name)
      
        
  });

  

  var data = {
    labels: ["Se realizaron a tiempo", "No se realizaron a tiempo"],
    datasets: [
      {
        label: "Total de equipos",
        data: [deviceList='yes'.length,deviceList='no'.length,],
        borderWidth: 1,
        backgroundColor: [
          "rgba(81, 100, 219)",
          "rgb(232, 65, 65)"
          
        ],
      },
    ],
  };

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


