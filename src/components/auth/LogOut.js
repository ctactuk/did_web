import { useEffect } from "react";
import { logout } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux";

const LogOut = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logout({ authenticated: false }));
    window.location.replace("/");
  }, [dispatch]);

  return <></>;
};

export default LogOut;
