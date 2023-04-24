import React, { useState } from "react";
import numeral from "numeral";
import CountUp from "react-countup";
import useMapModal from "../hooks/useMapModal";

const Table = ({ countries, changeGraph, changeCoordinates }) => {
  const mapModal = useMapModal();
  const [countUp, setCountUp] = useState(false);
  return (
    <div className="mt-2 overflow-y-scroll text-gray-800 bg-white h-[350px]">
      <table>
        <tbody>
          {countries?.map((country, index) => (
            <tr
              className="flex justify-between hover:cursor-pointer hover:bg-gray-100 hover:rounded-lg p-1"
              onClick={(e) => {
                changeCoordinates(
                  country.countryInfo.lat,
                  country.countryInfo.long
                );
                changeCoordinates(
                  country.countryInfo.lat,
                  country.countryInfo.long
                );
                mapModal.onOpen();
              }}
              key={index}
            >
              <td className="p-1 border-none">{country.country}</td>
              {!countUp && (
                <td className="p-1 border-none">
                  <strong>
                    <CountUp
                      end={country.cases}
                      duration={1}
                      onEnd={() => setCountUp(true)}
                    />
                  </strong>
                </td>
              )}
              {countUp && (
                <td className="p-1 border-none">
                  <strong>{numeral(country.cases).format()}</strong>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
