import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import CarBookingModal from "../Cars/CarBookingModal";
import { data } from "autoprefixer";
const AdvertisedProduct = () => {
  const [carDetail, setCarDetail] = useState({});
  const { data: cars = [], refetch } = useQuery({
    queryKey: ["cars"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/advertised?isAdvertised=yes&isAvailable=yes`
        );
        const data = await res.json();
        return data;
      } catch (error) { }
    },
  });

  return (
    <div className="my-10">
      {data.length === 0 && (
        <h3 className="text-center text-2xl">No Product</h3>
      )}
      <h3 className="text-5xl font-bold text-center">All Products</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {cars?.map((car) => (
          <div
            key={car._id}
            className="flex flex-col items-center justify-center w-full max-w-sm mx-auto my-5"
          >
            <div className="w-full h-64 bg-gray-300 bg-center bg-cover rounded-lg shadow-md">
              <img src={car.img} alt="" />
            </div>

            <div className="w-56 -mt-10 overflow-hidden bg-white rounded-lg shadow-lg md:w-64 dark:bg-gray-800">
              <h3 className="py-2 font-bold tracking-wide text-center text-gray-800 uppercase dark:text-white">
                {car.carName}
              </h3>

              <div className=" bg-gray-700 text-white text-center text ">
                <p className="pt-3">
                  {" "}
                  Original Price : {car.originalPrice} $
                </p>
                <p className="my-3 font-semibold">
                  {" "}
                  Selling Price{" "}
                  <p className="text-3xl"> {car.sellPrice} $</p>
                </p>
                <p>Condition : {car.condition}</p>
                <p>Description : {car.description}</p>
                <p>Used : {car.used} Year(s)</p>
                <div className="">
                  <p className=" text-xs my-3">
                    {" "}
                    Added By : {car?.sellerName} on {car?.time}
                  </p>
                </div>

                <button className=" ">
                  <label
                    htmlFor="car-booking-modal"
                    className="btn"
                    onClick={() => setCarDetail(car)}
                  >
                    Book Now
                  </label>
                </button>
              </div>
            </div>
            <CarBookingModal carDetail={carDetail}></CarBookingModal>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdvertisedProduct;
