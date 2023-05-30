import {
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import whisl_api from "../requests/whisl_api";
import Loading from "../components/common/Loading";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    whisl_api.getAllClients().then((response) => {
      setCustomers(response.data);
      setIsLoading(false);
    });
  }, []);
  return (
    <>
      {isLoading ? (
        <Loading mesage="Loading customers..." />
      ) : (
        <>
          <Button colorScheme="blue">Add new customer</Button>
          {"  "}
          <TableContainer>
            <Table variant="striped" colorScheme="telegram" size="sm">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Country</Th>
                  <Th>Phone</Th>
                  <Th>Email</Th>
                </Tr>
              </Thead>
              <Tbody>
                {customers.map((customer) => (
                  <Tr key={customer.id}>
                    <Td>{customer.name}</Td>
                    <Td>{customer.country}</Td>
                    <Td>{customer.phone}</Td>
                    <Td>{customer.email}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </>
      )}
    </>
  );
};

export default Customers;
