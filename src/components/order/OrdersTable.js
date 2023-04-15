import {
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  Center,
  Text,
  SimpleGrid,
} from "@chakra-ui/react";

import nuso_requests from "../../requests/nuso_api_requests.js";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiEye } from "react-icons/fi";

const OrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const orders_request = await nuso_requests.getOrderList();
      setOrders(orders_request.orders);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const getOrderDetail = async (orderId) => {
    await nuso_requests.getOrderInfo(orderId);
  };

  return (
    <>
      {isLoading ? (
        <Center>
          <SimpleGrid columns={1}>
            <Center>
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            </Center>
            <Center>
              <Text>Loading orders...</Text>
            </Center>
          </SimpleGrid>
        </Center>
      ) : (
        <TableContainer>
          <Table variant="striped" colorScheme="telegram" size="sm">
            <Thead>
              <Tr>
                <Th>OrderId</Th>
                <Th>Numbers Ordered</Th>
                <Th>Placed By</Th>
                <Th>Customer</Th>
                <Th>Date</Th>
                <Th>Supplier</Th>
                <Th>Status</Th>
                <Th>Option</Th>
              </Tr>
            </Thead>
            <Tbody>
              {orders.map((order) => (
                <Tr key={order.orderId}>
                  <Td>{order.orderId}</Td>
                  <Td>{order.size}</Td>
                  <Td>{order.placedBy}</Td>
                  <Td>{order.customer}</Td>
                  <Td>{order.date}</Td>
                  <Td>{order.supplier ? order.supplier.name : ""}</Td>
                  <Td>{order.status}</Td>
                  <Td>
                    <Link onClick={() => getOrderDetail(order.orderId)}>
                      <FiEye />
                    </Link>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default OrderTable;
