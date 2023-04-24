import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
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

  const { data: all, isSuccess: isSuccessAll } = useQuery({
    queryKey: ["all"],
    queryFn: () =>
      axios.get("https://disease.sh/v3/covid-19/all").then((res) => res.data),
  });

  const { data: countries, isSuccess: isSuccessCountries } = useQuery({
    queryKey: ["countries"],
    queryFn: () =>
      axios
        .get("https://disease.sh/v3/covid-19/countries")
        .then((res) => sortData(res.data)),
  });

  let tableData = countries;
  let mapCountries = countries;

  return (
    <>
      <div className="flex justify-between">
        <h1 className="font-black text-4xl text-red-400">Charts and Maps</h1>
      </div>
      {isSuccessAll && (
        <div className="md:flex block justify-between p-1 rounded-lg">
          <InfoBox
            onClick={(e) => setCasesType("cases")}
            title="Coronavirus Cases"
            isRed
            active={casesType === "cases"}
            cases={prettyPrintStat(all.todayCases)}
            total={numeral(all.cases).format("0.0a")}
          />
          <InfoBox
            isRed={false}
            onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            active={casesType === "recovered"}
            cases={prettyPrintStat(all.todayRecovered)}
            total={numeral(all.recovered).format("0.0a")}
          />
          <InfoBox
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            isRed
            active={casesType === "deaths"}
            cases={prettyPrintStat(all.todayDeaths)}
            total={numeral(all.deaths).format("0.0a")}
          />
        </div>
      )}

      {isSuccessCountries && (
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
                <Table
                  countries={tableData}
                  changeCoordinates={(lat, long) => setMapCenter([lat, long])}
                />
              </div>
            </CardContent>
          </Card>
        </>
      )}

      <MapModal
        mapZoom={mapZoom}
        mapCenter={mapCenter}
        mapCountries={mapCountries}
      />
    </>
  );
}

export default MapsAndCharts;
