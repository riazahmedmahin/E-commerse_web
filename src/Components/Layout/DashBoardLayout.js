import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../../Context/UserContext";
import useAdmin from "../../Hooks/useAdmin";
import useSeller from "../../Hooks/useSeller";
import Footer from "../Shared/Footer";
import Nav from "../Shared/Nav";

const DashBoardLayout = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email);
  const [isSeller] = useSeller(user?.email);
  console.log(isAdmin, isSeller);
  return (
    <div className=" max-w-[1440px] mx-auto">
      <Nav></Nav>
      <div className="drawer drawer-mobile drawer-end">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content ">
          <Outlet></Outlet>
        </div>
        <div className="drawer-side">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 ">
            {isAdmin && (
              <>
                <li className=" bg-slate-800 my-5 text-white">
                  <Link to="allbuyers">All Buyers</Link>
                </li>
                <li className=" bg-secondary my-5 text-white">
                  <Link to="allsellers">All Sellers</Link>
                </li>
              </>
            )}
            {isSeller && (
              <>
                <li className=" bg-red-900 my-5 text-white">
                  <Link to="addproduct"> Add Products</Link>
                </li>
                <li className="bg-primary my-5 text-white">
                  <Link to="myproducts">My Products</Link>
                </li>
              </>
            )}
            <>
              {!isAdmin && !isSeller && (
                <li className=" bg-amber-500 my-5 text-white">
                  <Link to="mybooking">My Orders</Link>
                </li>
              )}
            </>
            {/* )} */}
          </ul>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default DashBoardLayout;
