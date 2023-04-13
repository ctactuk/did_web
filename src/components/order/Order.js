import { Button, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FiPhoneCall } from "react-icons/fi";
import OrderNumbers from "./OrderNumbers";
import OrderTable from "./OrdersTable";
import nusoapi from "../../requests/nuso_api_requests.js";

const Order = () => {
  const [createOrder, setCreateOrder] = useState(false);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const countries_request = await nusoapi.getCountries();
      const states_request = await nusoapi.getStates();
      setCountries(countries_request);
      setStates(states_request);
    };

    fetchData();
  }, []);

  const handleOrderNumbersClick = (event) => {
    setCreateOrder(true);
  };

  const handleCancelButtonClick = (event) => {
    setCreateOrder(false);
  };

  return (
    <>
      <Button onClick={handleOrderNumbersClick}>
        Order Numbers
        <FiPhoneCall />
      </Button>
      {createOrder ? (
        <>
          <br />
          <br />
          <OrderNumbers cancelButtonClick={handleCancelButtonClick} countries={countries} states={states}/>
        </>
      ) : (
        <>
          <br />
          <br />
          <Text>Orders</Text>
          <OrderTable />
        </>
      )}
    </>
  );
};

export default Order;
