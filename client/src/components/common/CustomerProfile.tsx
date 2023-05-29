import { Link, NavLink } from "react-router-dom";
import "../../scss/styleactive.scss";
import { useEffect, useState } from "react";
import authApi from "../../api/authApi";
import { any } from "prop-types";

import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { error } from "console";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import orderApi from "../../api/orderApi";
import LoadingPage from "./LoadingPage";
import Container from "@mui/material/Container";

const CustomerProfile = () => {
  const navigate = useNavigate();
  let [orders, setOrders] = useState([]);
  let [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(() => {
    const user = localStorage.getItem("user");
    const userJson = user ? JSON.parse(user) : null;

    return userJson;
  });

  const LogoutToken = () => {
    authApi
      .logout()
      .then((res) => {
        if (res.status === 200) {
          Cookies.remove("accessToken");
          Cookies.remove("refreshToken");

          navigate("/");
        }
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    orderApi
      .getCurrentUserOrders()
      .then((res) => setOrders(res.data?.orders))
      .catch((e) => console.log(e))
      .finally(() => setIsLoading(false));
  }, []);

  const { email, name } = user;
  return (
    <div>
      <Container maxWidth="md">
        {isLoading ? (
          <LoadingPage />
        ) : (
          <div className=" box-border mx-9 h-screen ">
            <header className="py-8  mt-24">
              <h1 className=" text-center text-6xl">My Account</h1>
            </header>
            <div className="">
              <div className="">
                <div className="flex max-[700px]:block">
                  <div className="w-2/5 max-[700px]:w-full">
                    <p className="h-2/4 border flex items-center p-6 text-xl bg-orange-900 text-white">
                      Dashboard
                    </p>

                    <p
                      onClick={LogoutToken}
                      className="cursor-pointer  flex items-center h-2/4 border text-xl p-6"
                    >
                      Log out
                    </p>
                  </div>
                  <div className="w-3/5 mx-9 max-[700px]:w-full max-[700px]:mx-0  max-[700px]:pt-4  ">
                    <div className="page-account__welcome">
                      <p className="mb-4  text-xl text-slate-500">
                        Hello <strong>{name}</strong> ( not{" "}
                        <strong>{name}</strong>?
                        <span
                          onClick={LogoutToken}
                          className="cursor-pointer text-red-500"
                        >
                          Log Out
                        </span>
                        )
                      </p>
                      <p className=" text-xl text-slate-500">
                        Email: <strong>{email}</strong>
                      </p>
                    </div>
                    <div className="page-account__order">
                      <h1 className="box-account__heading">Order History</h1>
                      <div className="box-account__content">
                        {orders?.length > 0 ? (
                          <div className=" text-xl text-slate-500">
                            <i className="fa-solid fa-clock mr-4 text-orange-400 text-2xl"></i>
                            <Link
                              to="/account/orders"
                              onClick={() => {
                                window.scrollTo(0, 0);
                              }}
                              className="text-orange-400 mr-2"
                            >
                              SHOW YOUR ORDERS
                            </Link>
                            You have {orders.length} order(s)
                          </div>
                        ) : (
                          <div className=" text-xl text-slate-500">
                            <i className="fa-solid fa-circle-exclamation mr-4 text-lime-600 text-2xl"></i>
                            <Link
                              to="/products"
                              onClick={() => {
                                window.scrollTo(0, 0);
                              }}
                              className="text-lime-600 mr-2"
                            >
                              CREARTE YOUR FISRST ORDER
                            </Link>
                            You haven't placed any orders yet.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};
export default CustomerProfile;
