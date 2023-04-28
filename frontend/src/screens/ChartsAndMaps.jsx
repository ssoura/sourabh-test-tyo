import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ScaleLoader } from "react-spinners";
import { Card, CardContent } from "@mui/material";

import MapModal from "../components/modals/MapModal";
import LineGraph from "../components/LineGraph";
import Table from "../components/Table";

import InfoBox from "../components/InfoBox";

import { sortData, prettyPrintStat } from "../helpers/util";
import "leaflet/dist/leaflet.css";
import numeral from "numeral";

function MapsAndCharts() {
  const [casesType, setCasesType] = useState("cases");
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom] = useState(3);

  const all = useQuery({
    queryKey: ["all"],
    queryFn: () =>
      axios.get("https://disease.sh/v3/covid-19/all").then((res) => res.data),
  });

  const countries = useQuery({
    queryKey: ["countries"],
    queryFn: () =>
      axios
        .get("https://disease.sh/v3/covid-19/countries")
        .then((res) => sortData(res.data)),
  });

  let tableData = countries.data;
  let mapCountries = countries.data;

  return (
    <>
      <div className="flex justify-between">
        <h1 className="font-black text-4xl text-red-400">Charts and Maps</h1>
      </div>
      <div className="md:flex block justify-between p-1 rounded-lg">
        {all.isLoading && (
          <div className="flex mx-auto justify-center items-center p-4">
            <ScaleLoader color="rgb(248, 131, 121)" />
          </div>
        )}
        {all.isSuccess && (
          <>
            <InfoBox
              onClick={(e) => setCasesType("cases")}
              title="Coronavirus Cases"
              isRed
              active={casesType === "cases"}
              cases={prettyPrintStat(all.data.todayCases)}
              total={numeral(all.data.cases).format("0.0a")}
            />
            <InfoBox
              isRed={false}
              onClick={(e) => setCasesType("recovered")}
              title="Recovered"
              active={casesType === "recovered"}
              cases={prettyPrintStat(all.data.todayRecovered)}
              total={numeral(all.data.recovered).format("0.0a")}
            />
            <InfoBox
              onClick={(e) => setCasesType("deaths")}
              title="Deaths"
              isRed
              active={casesType === "deaths"}
              cases={prettyPrintStat(all.data.todayDeaths)}
              total={numeral(all.data.deaths).format("0.0a")}
            />
          </>
        )}
      </div>

      <>
        <Card className="flex flex-col gap-2 p-4 mt-2">
          {/* chart */}
          <LineGraph />
          <h6 className="text-xs italic mx-auto text-slate-800">
            Crona Cases WorldWide
          </h6>
          {/* List */}
          <CardContent>
            <div className="">
              <h3 className="font-semibold text-slate-800 bg-gray-100 p-2 ">
                Live Cases by Country
              </h3>
              {countries.isSuccess && (
                <Table
                  countries={tableData}
                  changeCoordinates={(lat, long) => setMapCenter([lat, long])}
                />
              )}
              {countries.isLoading && (
                <div className="flex mx-auto justify-center items-center p-4">
                  <ScaleLoader color="rgb(248, 131, 121)" />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </>

      <MapModal
        mapZoom={mapZoom}
        mapCenter={mapCenter}
        mapCountries={mapCountries}
      />
    </>
  );
}

export default MapsAndCharts;
