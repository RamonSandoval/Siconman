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

const MaintStats = () => {
  const [arrayDevices, setarrayDevices] = useState([]);
  var contadorYes = 0
  var contadorNo = 0


  useEffect(() => {
    init();
  }, []);

  async function init() {
    const list = await api.devicesList(1);
    const list2 = await api.devicesList(2);
    setarrayDevices(list.data.concat(list2.data))
  }


    //opcion #1 
    var cantidadYes = arrayDevices.filter(data => data.attributes.maintenance?.data?.attributes.type_maint == "Correctivo")
    var cantidadNo = arrayDevices.filter(data => data.attributes.maintenance?.data?.attributes.type_maint == "Preventivo")
    //opcion #2
    arrayDevices.map((data) => {
      data.attributes.maintenance?.data?.attributes.type_maint == "Correctivo" ? contadorYes++ : (data.attributes.maintenance?.data?.attributes.type_maint=== "Preventivo" ? contadorNo++ : null)})
    
      
  var data = {
    labels: [contadorYes+ " Mantenimientos Correctivos", contadorNo+ " Mantenimientos Preventivos"],
    datasets: [
      {
        label: "Total de equipos",
        data: [contadorYes,contadorNo],
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
        <h4>Tipos de Mantenimientos realizados </h4>
    </Center>
      <div>
        <Doughnut data={data} height={900} options={options} />
      </div>
      
    </>
  );
};

export default MaintStats;
