import { ActionIcon, Button, Center } from "@mantine/core";
import { IconRotateClockwise2, IconTool } from "@tabler/icons";
import { useState, useEffect, useRef } from "react";
import api from "../services/api";
import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Legend,
  Tooltip,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const QualityStats = () => {
  const [arrayDevices, setarrayDevices] = useState([]);
  const calendarRef = useRef(null);
  const [chart, setChart] = useState({});
  const [arrayDep, setarrayDep] = useState([]);

  useEffect(() => {
    init();
  }, []);

  async function init() {
    const list = await api.devicesList(1);
    const list2 = await api.devicesList(2);
    setarrayDevices(list.data.concat(list2.data));
    const listDepartment = await api.departmentsList(1);
    setarrayDep(listDepartment.data);
  }
  const deviceList = arrayDevices.map((d) => {
        const cca = d.attributes?.maintenance.data?.attributes.maintenance_eval
        if(cca === 'yes'){
            return cca.length
        }
        
    
    
  });

  const [chupapi,setChupapi] = useState('')
  

  var data = {
    labels: ["Se realizaron a tiempo", "No se realizaron a tiempo"],
    datasets: [
      {
        label: "# of Votes",
        data: [ '324','21'],
        /*       data: arrayDevices && arrayDevices.map(data => data.attributes?.maintenance.data?.attributes.maintenance_eval.length),
         */ //   data:  arrayDep && arrayDep.map(data => data.attributes.devices.data.length),
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
          "rgb(82, 129, 191)",
          "rgb(89, 82, 191)",
        ],
      },
    ],
  };

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

  return (
    <>
    <Button onClick={()=> console.log(deviceList.toString)}/>
    <Center>
        <h4>Cantidad de mantenimientos realizados en tiempo y forma</h4>
    </Center>
      <div>
        <Doughnut data={data} height={400} options={options} />
      </div>
      {/* {deviceList &&
        deviceList.map((data, index) => (
          <tr key={data.device_id}>
            <td>
              <Center>{data.attributes.device_id}</Center>
            </td>

            <td>
              <Center>
                {data.attributes.maintenance?.data?.attributes.maintenance_eval}
              </Center>
            </td>
          </tr>
        ))}
       */}
    </>
  );
};

export default QualityStats;
