import {
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { FiEdit, FiTrash } from "react-icons/fi";

const AdminAccounts = ({ users, openHandler, deleteHandler }) => {
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
                <Th>Full Name</Th>
                <Th>Email</Th>
                <Th>Active</Th>
                <Th>Phone Number</Th>
                <Th>Edit</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map((user) => (
                <Tr key={user.id}>
                  <Td>{user.fullname}</Td>
                  <Td>{user.email}</Td>
                  <Td>{user.is_active ? "True" : "False"}</Td>
                  <Td>{user.phone_number}</Td>
                  <Td>
                    <Flex>
                      <FiEdit
                        onClick={() => openHandler(user)}
                        style={{ cursor: "pointer" }}
                      />
                      <FiTrash
                        onClick={() => deleteHandler(user)}
                        style={{ cursor: "pointer" }}
                      />
                    </Flex>
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
