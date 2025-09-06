import React from "react";

const LocationSearchPanel = (props) => {
  console.log(props);
  //sample array for locations
  const locations = [
    "24B,Kapoor's cafe,Sheryians coding school,Bhopal",
    "24B,Kapoor's cafe,Sheryians coding school,Bhopal",
    "24B,Kapoor's cafe,Sheryians coding school,Bhopal",
    "24B,Kapoor's cafe,Sheryians coding school,Bhopal",
  ];
  return (
    <div>
      {/*This is a sample data*/}
      {locations.map(function (elem, idx) {
        return (
          <div
            key={idx}
            onClick={() => {
              props.setVehiclePanel(true);
              props.setPanelOpen(false);
            }}
            className="flex gap-4 border-2 p-3 border-gray-100 active:border-black rounded-xl items-center my-2 justify-start"
          >
            <h2 className="bg-[#eee] rounded-full w-16 h-10 flex items-center justify-center">
              <i className="ri-map-pin-fill "></i>
            </h2>
            <h4 className="font-medium">{elem}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default LocationSearchPanel;
