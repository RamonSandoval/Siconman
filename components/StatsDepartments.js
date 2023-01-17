import React from 'react'
import {Chart as ChartJS, BarElement,CategoryScale,LinearScale} from 'chart.js'
import {Bar} from 'react-chartjs-2'
import { useState, useEffect,useRef } from "react";
import api from '../services/api'
import { Button, Center } from '@mantine/core';


    ChartJS.register(
    CategoryScale,
    BarElement,
    LinearScale
    )

   

const StatsDepartments = () => {
    const [arrayDataDev, setarrayDataDev] = useState([]);
    const [arrayDevices, setarrayDevices] = useState([]);
    const [arrayDep, setarrayDep] = useState([]);
    const calendarRef = useRef(null);
    const [chart,setChart] = useState({})

    var data = {
      labels: arrayDep && arrayDep.map(data=> data.attributes.department_name ),
      datasets: [{
        label: 'Cantidad de Dispositivos',
        data:  arrayDep && arrayDep.map(data => data.attributes.devices.data.length),
        borderWidth: 1,
        backgroundColor: [
          "rgba(109, 191, 82)",
          "rgb(82, 129, 191)",
          "rgb(166, 191, 82)",
          "rgb(191, 149, 82)",
          "rgb(191, 113, 82)",
          "rgb(191, 82, 82)",
          "rgb(82, 191, 129)",
          "rgb(82, 180, 191)",
          "rgb(70, 80, 141)",
          "rgb(82, 129, 191)",
          "rgb(89, 82, 191)",
        ],
      }]
    }


    var options = {
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true
        }
      },
      legend:{
          labels:{
              fontSize:26
          }

      }
    }
    useEffect(() => {
      init();
    }, []);
  
    async function init() {
      const list = await api.devicesList(1);
      const list2 = await api.devicesList(2);
      setarrayDevices(list.data.concat(list2.data));
      setarrayDataDev(list.data.concat(list2.data));
      const listDepartment = await api.departmentsList(1);
      setarrayDep(listDepartment.data);
      setChart(list)
    }

    /* const departmentsList = arrayDep.map((d) => {
        return(
          d
        );
      });
    */
  return (
    <>
    <Center>
      <h4>Dispositivos por Departamento</h4>
    </Center>
    <div>
        <Bar
            height={100}
            data={data}
            options={options}
        />
    </div>
    </>
  )
}

export default StatsDepartments