import { ActionIcon, Button, Center, Group, Table } from "@mantine/core";
import React from "react";
import {Chart as ChartJS, BarElement,CategoryScale,LinearScale} from 'chart.js'
import {Bar} from 'react-chartjs-2'
import { useState, useEffect } from "react";
import api from "../../services/api";
import styles from "../../styles/DepartmentAreaStats.module.css"


ChartJS.register(
  CategoryScale,
  BarElement,
  LinearScale
  )
const DepartmentStats = () => {

 
  const [arrayDep, setarrayDep] = useState([]);
  const [arrayProd, setArrayProd] = useState([]);
  useEffect(() => {
    init();
  }, []);

  async function init() {
    const listDepartment = await api.departmentsList(1);
    const listProduction = await api.productionList(1);
    setArrayProd(listProduction.data);
    setarrayDep(listDepartment.data);
  }
  var data = {
    labels: arrayDep && arrayDep.map(data=> data.attributes.department_name ),
    datasets: [{
      label: '# of Votes',
      data:  arrayDep && arrayDep.map(data => data.attributes.devices.data.length),
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

  return (
    <>
      <div className={styles.groupContainer}>
      <Table highlightOnHover className={styles.tableDepartments}>
        <thead>
          <tr>
            <th>
              <Center>Departamento</Center>
            </th>
            <th>
              <Center>Cantidad de Equipos</Center>
            </th>
          </tr>
        </thead>
        <tbody>
          {arrayDep &&
            arrayDep.map((data) => (
              <tr key={data.department_name}>
                <td>
                  <Center>{data.attributes.department_name}</Center>
                </td>
                <td>
                  <Center>{data.attributes.devices.data.length}</Center>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      </div>
    </>
  );
};

export default DepartmentStats;
