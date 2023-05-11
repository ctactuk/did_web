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
import login from "../../requests/auth_requests";
import { login as loggin } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import requests from "../../requests/whisl_api";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const access_token = await login.login(email, password);
    const login_user = await requests.loginUser("ctactuk", password);

    dispatch(
      loggin({
        authenticated: true,
        token: login_user.access_token,
        user_info: {},
        nuso_access_token: access_token,
      })
    );
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleRegisterClick = (event) => {
    event.preventDefault();
    setShowRegisterForm(true);
  };

  const handleEmailChange = (e) => {
    const { value } = e.target;
    setEmail(value);
    if (!validateEmail(value)) {
      console.log("Invalid email format");
    }
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
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
