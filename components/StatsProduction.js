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

   

const StatsProduction = () => {
    const [arrayProd, setArrayProd] = useState([]);
    const calendarRef = useRef(null);
    const [chart,setChart] = useState({})


    var data = {
      labels: arrayProd && arrayProd.map(data=> data.attributes.name),
      datasets: [{
        label: 'Cantidad de dispositivos',
        data:  arrayProd && arrayProd.map(data => data.attributes.devices.data.length),
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
        const listProduction = await api.productionList(1);
        setArrayProd(listProduction.data);
    }

    /* const departmentsList = arrayProd.map((d) => {
        return(
          d
        );
      });
    */
  return (
    <>
    <Center>
      <h4>Dispositivos por Area de Produccion</h4>
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

export default StatsProduction