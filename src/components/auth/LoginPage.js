import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import logo from "./logo.png";
import RegisterForm from "./RegisterForm";
import { login as loggin } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import requests from "../../requests/whisl_api";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const login_user = await requests.loginUser(username, password);

    dispatch(
      loggin({
        authenticated: true,
        token: login_user.access_token,
      })
    );
  };

  const handleRegisterClick = (event) => {
    event.preventDefault();
    setShowRegisterForm(true);
  };

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setPassword(value);
  };

  const handleUserNameChange = (e) => {
    const { value } = e.target;
    setUsername(value);
  };

  return (
    <Box
      bg="gray.100"
      minH="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Image src={logo} alt="Logo" mb={8} width={200} />
      {showRegisterForm ? (
        <RegisterForm onBackClick={() => setShowRegisterForm(false)} />
      ) : (
        <Box
          bg="white"
          rounded="lg"
          boxShadow="lg"
          p={8}
          maxW="sm"
          w="full"
          textAlign="center"
        >
          <Heading>Login</Heading>
          <Text mt={4}>Please enter your email and password to login.</Text>
          <Box mt={8}>
            <form onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={handleUserNameChange}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </FormControl>
              <Button
                colorScheme="blue"
                width="full"
                mt={4}
                type="submit"
                isLoading={false}
              >
                Login
              </Button>
              <Text mt={4}>
                Don't have an account?{" "}
                <Button
                  colorScheme="blue"
                  variant="link"
                  onClick={handleRegisterClick}
                >
                  Register now
                </Button>
              </Text>
            </form>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default LoginPage;
