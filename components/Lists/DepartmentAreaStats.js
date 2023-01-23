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

ChartJS.register(CategoryScale, BarElement, LinearScale);
const DepartmentStats = () => {
  const [arrayDep, setarrayDep] = useState([]);
  const [arrayProd, setArrayProd] = useState([]);
  useEffect(() => {
    init();
  }, []);

  /**
   * When the page loads, get the list of departments and productions from the API and store them in
   * the state variables arrayDep and arrayProd.
   */
  async function init() {
    const listDepartment = await api.departmentsList(1);
    const listProduction = await api.productionList(1);
    setArrayProd(listProduction.data);
    setarrayDep(listDepartment.data);
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
              arrayDep.sort(minMax).map((data) => (
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
