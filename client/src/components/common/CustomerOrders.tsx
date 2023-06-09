import * as React from "react";
import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import orderApi from "../../api/orderApi";
import { CustomerOrders } from "../../interfaces/order";
import CustomerSingleOrder from "./CustomerSingleOrder";
import SkeletonOrder from "./skeleton/Order";

export interface ICustomerOrdersProps {}

export default function CustomerOrderList(props: ICustomerOrdersProps) {
  let [isLoading, setIsLoading] = useState(false);
  let [orders, setOrders] = useState<CustomerOrders[]>([]);
  useEffect(() => {
    setIsLoading(true);
    orderApi
      .getCurrentUserOrders()
      .then((res) => setOrders(res.data?.orders))
      .catch((e) => console.log(e))
      .finally(() => setIsLoading(false));
  }, []);
  return (
    <>
      {!isLoading ? (
        <div className="bg-gray-100 mt-[86.8px] py-20">
          <Container maxWidth="md">
            <div className="text-3xl mb-5">Your orders</div>
            {orders?.map((order: CustomerOrders) => {
              return <CustomerSingleOrder key={order._id} order={order} />;
            })}
          </Container>
        </div>
      ) : (
        <SkeletonOrder></SkeletonOrder>
      )}
    </>
  );
}
