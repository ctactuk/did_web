import { useEffect, useState } from "react";
import AdminAccounts from "../components/users/AdminAccounts";
import Customeraccounts from "../components/users/CustomerAccoutns";
import whisl_api from "../requests/whisl_api";
import { Button, Flex, useDisclosure } from "@chakra-ui/react";
import EditUser from "../components/users/Edit";
import { FiPlus } from "react-icons/fi";

const Users = () => {
  const [userCustomer, setUserCustomer] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchData = async () => {
      whisl_api.getAllAccounts().then((response) => {
        if (typeof response.data !== "undefined") {
          setUserCustomer(response.data);
        }
      });
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
        handleUpdateUser={handleUpdateUser}
        title="Edit User"
      />
    </>
  );
};

export default Users;
