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
const  ProductionAreaStats = () => { 
  const [arrayProd, setArrayProd] = useState([]);
  useEffect(() => {
    init();
  }, []);

  async function init() {
    const listProduction = await api.productionList(1);
    setArrayProd(listProduction.data);
  }
  

  return (
    <>
      <div className={styles.groupContainer}>
      <Table highlightOnHover className={styles.tableProduction}>
        <thead>
          <tr>
            <th>
              <Center>Area de Produccion</Center>
            </th>
            <th>
              <Center>Cantidad de Equipos</Center>
            </th>
          </tr>
        </thead>
        <tbody>
          {arrayProd &&
            arrayProd.map((data) => (
              <tr key={data.name}>
                <td>
                  <Center>{data.attributes.name}</Center>
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

export default ProductionAreaStats;
