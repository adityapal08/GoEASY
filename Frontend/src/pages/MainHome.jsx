import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel.jsx";
import VehiclePanel from "../components/VehiclePanel.jsx";
import ConfirmRide from "../components/ConfirmRide.jsx";
import LookingForDriver from "../components/LookingForDriver.jsx";
import WaitingForDriver from "../components/WaitingForDriver.jsx";

const MainHome = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const vehiclePanelRef = useRef(null);
  const ConfirmRidePanelRef = useRef(null);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);

  // নতুন state: কোন vehicle select হলো
  const [vehicleType, setVehicleType] = useState(null);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setwaitingForDriver] = useState(false);

  // sample fare data
  const fare = { car: 120, moto: 60, auto: 80 };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  // GSAP animations
  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelRef.current, { height: "70%", padding: 25 });
        gsap.to(panelCloseRef.current, { opacity: 1 });
      } else {
        gsap.to(panelRef.current, { height: "0%", padding: 0 });
        gsap.to(panelCloseRef.current, { opacity: 0 });
      }
    },
    [panelOpen]
  );

  useGSAP(
    function () {
      if (vehiclePanel) {
        gsap.to(vehiclePanelRef.current, { transform: "translateY(0)" });
      } else {
        gsap.to(vehiclePanelRef.current, { transform: "translateY(100%)" });
      }
    },
    [vehiclePanel]
  );

  useGSAP(
    function () {
      if (confirmRidePanel) {
        gsap.to(ConfirmRidePanelRef.current, { transform: "translateY(0)" });
      } else {
        gsap.to(ConfirmRidePanelRef.current, { transform: "translateY(100%)" });
      }
    },
    [confirmRidePanel]
  );
  useGSAP(
    function () {
      if (vehicleFound) {
        gsap.to(vehicleFoundRef.current, { transform: "translateY(0)" });
      } else {
        gsap.to(vehicleFoundRef.current, { transform: "translateY(100%)" });
      }
    },
    [vehicleFound]
  );
  useGSAP(
    function () {
      if (waitingForDriver) {
        gsap.to(waitingForDriverRef.current, { transform: "translateY(0)" });
      } else {
        gsap.to(waitingForDriverRef.current, { transform: "translateY(100%)" });
      }
    },
    [waitingForDriver]
  );

  // যখন confirm button চাপা হবে
  const createRide = () => {
    console.log("Ride created with:", {
      pickup,
      destination,
      vehicleType,
      fare: fare[vehicleType],
    });
  };

  return (
    <div className="h-screen relative overflow-hidden">
      <img
        className="w-16 absolute left-5 top-5"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt=""
      />
      <div className="h-screen w-screen">
        <img
          className="h-full w-full object-cover"
          src="https://tse4.mm.bing.net/th/id/OIP.Ait2P0IoB2I1wCLskLuvsQHaFw?pid=Api&P=0&h=180"
          alt=""
        />
      </div>

      {/* Input panel */}
      <div className=" flex flex-col justify-end h-screen absolute top-0 w-full ">
        <div className="h-[30%] p-5 bg-white relative">
          <h5
            ref={panelCloseRef}
            onClick={() => setPanelOpen(false)}
            className="absolute opacity-0 top-6 right-6 text-2xl"
          >
            <i className="ri-arrow-down-s-line"></i>
          </h5>
          <h4 className="text-2xl font-semibold">Find a Trip!</h4>
          <form onSubmit={submitHandler}>
            <div className="line absolute h-16 w-1 top-[55%] left-10 bg-gray-700 rounded-full "></div>
            <input
              onClick={() => setPanelOpen(true)}
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5"
              type="text"
              placeholder="Add a pickup location"
            />
            <input
              onClick={() => setPanelOpen(true)}
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3"
              type="text"
              placeholder="Enter your destination"
            />
          </form>
        </div>
        <div ref={panelRef} className=" bg-white h-0">
          <LocationSearchPanel
            setPanelOpen={setPanelOpen}
            setVehiclePanel={setVehiclePanel}
          />
        </div>
      </div>

      {/* Vehicle panel */}
      <div
        ref={vehiclePanelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white p-3"
      >
        <VehiclePanel
          setVehiclePanel={setVehiclePanel}
          setConfirmRidePanel={setConfirmRidePanel}
          selectVehicle={(type) => setVehicleType(type)}
          fare={fare}
        />
      </div>

      {/* Confirm ride panel */}
      <div
        ref={ConfirmRidePanelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white p-3"
      >
        <ConfirmRide
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehicleFound={setVehicleFound}
          createRide={createRide}
        />
      </div>
      <div
        ref={vehicleFoundRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white p-3"
      >
        <LookingForDriver
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          setVehicleFound={setVehicleFound}
        />
      </div>
      <div
        ref={waitingForDriverRef}
        className="fixed w-full z-10 bottom-0 bg-white p-3"
      >
        <WaitingForDriver setwaitingForDriver={setwaitingForDriver} />
      </div>
    </div>
  );
};

export default MainHome;
