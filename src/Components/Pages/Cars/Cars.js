import React, { useState } from "react";

import { Link, useLoaderData } from "react-router-dom";
import CarBookingModal from "./CarBookingModal";
import CarCard from "./CarCard";

const Cars = () => {
  const cars = useLoaderData();
  const [carDetail, setCarDetail] = useState({});
  console.log(cars);
  const handleReport = (id) => {
    const proceed = window.confirm("Do you want report this item");
    if (proceed) {
      fetch(`http://localhost:5000/allcars/report/${id}`, {
        method: "PUT",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.modifiedCount > 0) {
            alert("Product Reported To Admin");
          }
        });
    }
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {cars?.map((car) => (
        <>
          {car.isAvailable === "yes" && (
            <CarCard
              car={car}
              handleReport={handleReport}
              setCarDetail={setCarDetail}
            ></CarCard>
          )}
        </>
      ))}
      <CarBookingModal carDetail={carDetail}></CarBookingModal>
    </div>
  );
};

export default Cars;
