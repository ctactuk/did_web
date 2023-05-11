import nuso_api from "../../requests/nuso_api_requests";
import { useEffect, useState } from "react";
import AdminAccounts from "./AdminAccounts";
import Customeraccounts from "./CustomerAccoutns";

const Users = () => {
  const [userAccounts, setUserAccounts] = useState([]);
  const [userCustomer, setUserCustomer] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const user = await nuso_api.getUsers();
      setUserAccounts(user.accountLevelUserAccounts);
      setUserCustomer(user.loggendInCustomerUserAccounts);
    };

    fetchData();
  }, []);

  return (
    <>
      <AdminAccounts users={userCustomer} />
      <Customeraccounts users={userAccounts} />
    </>
  );
};

export default Users;
