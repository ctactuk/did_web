import { useEffect, useState } from "react";
import AdminAccounts from "../components/users/AdminAccounts";
import Customeraccounts from "../components/users/CustomerAccoutns";
import whisl_api from "../requests/whisl_api";
import {
  Button,
  Center,
  Flex,
  SimpleGrid,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import EditUser from "../components/users/Edit";
import { FiPlus } from "react-icons/fi";

const Users = () => {
  const [userCustomer, setUserCustomer] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const [roles, setRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      whisl_api.getAllAccounts().then((response) => {
        if (typeof response.data !== "undefined") {
          setUserCustomer(response.data);
        }
        
      });

      whisl_api.getUserRoles().then((response) => {
        if (typeof response.data !== "undefined") {
          setRoles(response.data);
        }
      });

      setIsLoading(false);
    };

    fetchData();
  }, []);

  const openHandler = (data) => {
    setSelectedUser(data);
    onOpen();
  };

  const handleUpdateUser = (data) => {
    const users = userCustomer.map((user) => {
      if (user.id === data.id) {
        return data;
      }

      return user;
    });

    setUserCustomer(users);
  };

  const handleDeleteUser = (data) => {
    console.log(data);
  };

  return (
    <>
      <Flex>
        <Button colorScheme="blue">
          <FiPlus /> Add new user
        </Button>
      </Flex>
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
              <Text>Loading users...</Text>
            </Center>
          </SimpleGrid>
        </Center>
      ) : (
        <>
          <AdminAccounts
            users={userCustomer.filter((x) => x.role.name === "SuperAdmin")}
            openHandler={openHandler}
            deleteHandler={handleDeleteUser}
          />
          <Customeraccounts
            users={userCustomer.filter((x) => x.role.name !== "SuperAdmin")}
          />
          <EditUser
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            data={selectedUser}
            roles={roles}
            handleUpdateUser={handleUpdateUser}
            title="Edit User"
          />
        </>
      )}
    </>
  );
};

export default Users;
