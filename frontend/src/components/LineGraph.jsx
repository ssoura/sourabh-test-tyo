import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import numeral from "numeral";
import axios from "axios";
import { ScaleLoader } from "react-spinners";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
);

const options = {
  responsive: true,
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.data).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return numeral(value).format("0 a");
          },
        },
      },
    ],
  },
};

const buildChartData = (data, casesType) => {
  let chartData = [];
  let lastDataPoint;
  for (let date in data.cases) {
    if (lastDataPoint) {
      let newDataPoint = {
        x: date,
        y: data[casesType][date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[casesType][date];
  }
  return chartData;
};

function LineGraph({ countryCode = "worldwide", casesType = "cases" }) {
  const [data, setData] = useState({});
  const [loadAnimation, setLoadAnimation] = useState(true);
  const [prevCountryCode, setPrevCountryCode] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (prevCountryCode !== countryCode) setLoadAnimation(true);
      const url =
        countryCode === "worldwide"
          ? "https://disease.sh/v3/covid-19/historical/all?lastdays=120"
          : `https://disease.sh/v3/covid-19/historical/${countryCode}?lastdays=200`;
      axios.get(url).then((response) => {
        const details = response.data.timeline
          ? response.data.timeline
          : response.data;
        let chartData = buildChartData(details, casesType);
        setData(chartData);
        setLoadAnimation(false);
        setPrevCountryCode(countryCode);
      });
    };
    fetchData();
  }, [casesType, countryCode, prevCountryCode]);

  return (
    <div>
      {loadAnimation ? (
        <div className="flex items-center flex-col mt-">
          <ScaleLoader color="rgb(248, 131, 121)" />
        </div>
      ) : data?.length > 0 ? (
        <Line
          data={{
            datasets: [
              {
                backgroundColor: "rgba(204, 16, 52, 0.5)",
                borderColor: "rgb(248, 131, 121)",
                data: data,
              },
            ],
          }}
          options={options}
        />
      ) : (
        <h5 style={{ textAlign: "center", marginTop: "10px" }}>
          No Data Available
        </h5>
      )}
    </div>
  );
}

export default LineGraph;
