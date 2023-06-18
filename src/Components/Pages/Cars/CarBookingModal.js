import React, { useContext } from "react";

import { AuthContext } from "../../../Context/UserContext";

const CarBookingModal = ({ carDetail }) => {
  const { user } = useContext(AuthContext);
  const { carName, sellPrice, _id } = carDetail;
  const handleBooking = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const price = form.price.value;
    const phone = form.phone.value;
    const location = form.location.value;
    const booking = {
      product: carName,
      name: name,
      email: email,
      price: price,
      phone: phone,
      location: location,
      isAvailable: "yes",
      productID: _id,
    };
    fetch("http://localhost:5000/bookings", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          alert("Booking confirmed");
        } else {
          alert(data.message);
        }
      });
  };

  return (
    <div>
      <input type="checkbox" id="car-booking-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="car-booking-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">Product : {carName}</h3>
          <form
            onSubmit={handleBooking}
            className="grid grid-cols-1 gap-3 mt-10"
          >
            <input
              name="name"
              type="text"
              placeholder="Your Name"
              className="input w-full input-bordered"
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              className="input w-full input-bordered"
              defaultValue={user?.email}
              disabled
              required
            />

            <input
              type="text"
              disabled
              name="price"
              value={sellPrice}
              className="input w-full input-bordered "
              required
            />

            <input
              name="phone"
              type="text"
              placeholder="Phone Number"
              className="input w-full input-bordered"
              required
            />
            <input
              name="location"
              type="text"
              placeholder="Meet Up Location"
              className="input w-full input-bordered"
              required
            />
            <br />
            <input
              className="btn btn-accent w-full"
              type="submit"
              value="Submit"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default CarBookingModal;
