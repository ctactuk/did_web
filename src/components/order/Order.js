import { Alert, AlertIcon, Button, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FiPhoneCall } from "react-icons/fi";
import OrderNumbers from "./OrderNumbers";
import OrderTable from "./OrdersTable";
import whisl_api from "../../requests/whisl_api.js";

const Order = () => {
  const [createOrder, setCreateOrder] = useState(false);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await whisl_api.getStatesFromProvider().then((response) => {
        if (typeof response.data !== "undefined") {
          setStates(response.data);
        }
      });

      await whisl_api.getCountriesFromProvider().then((response) => {
        if (typeof response.data !== "undefined") {
          setCountries(response.data);
        }
      });
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
      <Flex>
        <Button onClick={handleOrderNumbersClick}>
          Order Numbers
          <FiPhoneCall />
        </Button>
        <Alert status="success" ml={5} mr={2} hidden>
          <AlertIcon />
          Data uploaded to the server. Fire on!
        </Alert>
      </Flex>
      {createOrder ? (
        <>
          <br />
          <OrderNumbers
            cancelButtonClick={handleCancelButtonClick}
            countries={countries}
            states={states}
          />
        </>
      ) : (
        <>
          <br />
          <Text>Orders</Text>
          <OrderTable />
        </>
      )}
    </>
  );
};

export default Order;
