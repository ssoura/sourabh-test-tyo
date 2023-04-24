import Modal from "../Modal";
import useMapModal from "../../hooks/useMapModal";

import Map from "../Map";

type MapProps = {
  mapZoom: any;
  mapCenter: any;
  mapCountries: any;
};

const MapModal = ({ mapZoom, mapCenter, mapCountries }: MapProps) => {
  const mapModal = useMapModal();

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <div className="flex justify-evenly ">
        <div className="flex-1">
          <Map
            countries={mapCountries}
            // casesType={casesType}
            center={mapCenter}
            zoom={mapZoom}
          />
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={mapModal.isOpen}
      title="Map"
      onClose={mapModal.onClose}
      body={bodyContent}
    />
  );
};

export default MapModal;
