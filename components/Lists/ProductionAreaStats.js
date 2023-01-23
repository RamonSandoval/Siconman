import { Center, Table } from "@mantine/core";
import React from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { useState, useEffect } from "react";
import api from "../../services/api";
import styles from "../../styles/DepartmentAreaStats.module.css";

/* Registering the plugins that you are using. */
ChartJS.register(CategoryScale, BarElement, LinearScale);

/**
 * When the component mounts, call the init function.
 */
const ProductionAreaStats = () => {
  const [arrayProd, setArrayProd] = useState([]);
  useEffect(() => {
    init();
  }, []);

 /**
  * When the component mounts, call the api.productionList function, and when it resolves, set the
  * state of the arrayProd variable to the data returned from the api call.
  */
  async function init() {
    const listProduction = await api.productionList(1);
    setArrayProd(listProduction.data);
  }

  /**
   * If the length of the devices array in the first object is greater than the length of the devices
   * array in the second object, return -1. If the length of the devices array in the first object is
   * less than the length of the devices array in the second object, return 1. If the length of the
   * devices array in the first object is equal to the length of the devices array in the second
   * object, return 0.
   * 
   * @param a The first element being compared.
   * @param b the current item being iterated over
   * 
   * @return a number.
   */
  function minMax(a, b) {
    if (a.attributes?.devices.data.length > b.attributes?.devices.data.length) {
      return -1;
    }
    if (a.attributes?.devices.data.length < b.attributes?.devices.data.length) {
      return 1;
    }
    return 0;
  }

  /* Returning the table. */
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
              arrayProd.sort(minMax).map((data) => (
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

/* Exporting the component. */
export default ProductionAreaStats;
