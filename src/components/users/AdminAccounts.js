import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { FiEdit } from "react-icons/fi";

const AdminAccounts = ({ users }) => {
  return (
    <Card>
      <CardHeader>
        <Heading size="md">Admin Users</Heading>
      </CardHeader>

      <CardBody>
        <TableContainer>
          <Table variant="striped" colorScheme="telegram" size="sm">
            <Thead>
              <Tr>
                <Th>First Name</Th>
                <Th>Last Name</Th>
                <Th>Email</Th>
                <Th>Active</Th>
                <Th>Phone Number</Th>
                <Th>Edit</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map((user) => (
                <Tr key={user.id}>
                  <Td>{user.firstName}</Td>
                  <Td>{user.lastName}</Td>
                  <Td>{user.email}</Td>
                  <Td>{user.active ? "True" : "False"}</Td>
                  <Td>{user.phoneNumber}</Td>
                  <Td>
                    <FiEdit />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </CardBody>
    </Card>
  );
};

export default AdminAccounts;
