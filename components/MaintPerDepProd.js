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

const MaintPerDepProd = () => {
  const [arrayDevices, setarrayDevices] = useState([]);
  const [arrayProd, setArrayProd] = useState([]);

  useEffect(() => {
    init();
  }, []);

  async function init() {
    const listProduction = await api.productionList(1);
    setArrayProd(listProduction.data);
    const list = await api.devicesList(1);
    const list2 = await api.devicesList(2);
    setarrayDevices(list.data.concat(list2.data));
  }



  const deviceList = arrayDevices.map((d) => {
        return (d.attributes?.maintenance.data?.attributes.name)
      
        
  });

  

  var data = {
    labels:  arrayProd && arrayProd.map(data=> data.attributes.name),
    datasets: [
      {
        label: "Total de equipos",
        data: arrayProd && arrayProd.map(data => data.attributes.devices.data.length),
        borderWidth: 1,
        backgroundColor: [
            "rgba(128,0,0)",
            "rgb(220,20,60)",
            "rgb(240,128,128)",
            "rgb(255,69,0)",
            "rgb(255,215,0)",
            "rgb(154,205,50)",
            "rgb(0,255,255)",
            "rgb(138,43,226)",
            "rgb(139,0,139)",
            "rgb(255,182,193)",
            "rgb(245,245,220)",
            "rgb(124,252,0)",
            "rgb(220,220,220)"
          
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
        <h4>Mantenimientos realizados por departamento</h4>
    </Center>
      <div>
        <Doughnut data={data} height={900} options={options} />
      </div>
      <Button onClick={()=>console.log(deviceList)}/>


    <Center>
        <h4>Mantenimientos realizados por Area de Produccion</h4>
    </Center>
      <div>
        <Doughnut data={data} height={900} options={options} />
      </div>
      <Button onClick={()=>console.log(deviceList)}/>
    </>
  );
};

export default MaintPerDepProd;


