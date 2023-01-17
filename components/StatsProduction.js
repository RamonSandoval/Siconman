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
        label: '# of Votes',
        data:  arrayProd && arrayProd.map(data => data.attributes.devices.data.length),
        borderWidth: 1
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
      <h4>Dispositivos por Departamento</h4>
    </Center>
    <div>
        <Bar
            height={400}
            data={data}
            options={options}
        />
    </div>
    </>
  )
}

export default StatsProduction