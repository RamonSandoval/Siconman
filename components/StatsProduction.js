import React from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useState, useEffect} from "react";
import api from "../services/api";
import {Center } from "@mantine/core";

/* Registering the chart.js plugins. */
ChartJS.register(CategoryScale, BarElement, LinearScale);

/**
 * A function that returns a JSX element.
 */
const StatsProduction = () => {
  const [arrayProd, setArrayProd] = useState([]);

  /* Creating the data for the chart. */
  var data = {
    labels: arrayProd && arrayProd.map((data) => data.attributes.name),
    datasets: [
      {
        label: "Cantidad de Equipos",
        data:
          arrayProd &&
          arrayProd.map((data) => data.attributes.devices.data.length),
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
          "rgb(220,220,220)",
          "rgb(255, 205, 210)",
          "rgb(183, 28, 28)",
          "rgb(244, 143, 177)",
          "rgb(136, 14, 79)",
          "rgb(186, 104, 200)",
          "rgb(106, 27, 154)",
          "rgb(103, 58, 183)",
          "rgb(13, 71, 161)",
          "rgb(121, 85, 72)",
        ],
      },
    ],
  };

  /* The options for the chart. */
  var options = {
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
  useEffect(() => {
    init();
  }, []);

  /**
   * When the page loads, get the list of productions from the API and store them in the arrayProd
   * variable.
   */
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
  /* Returning the JSX element. */
  return (
    <>
      <Center>
        <h4>Equipos por Area de Produccion</h4>
      </Center>
      <div>
        <Bar height={100} data={data} options={options} />
      </div>
    </>
  );
};

export default StatsProduction;
