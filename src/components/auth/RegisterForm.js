import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";

import requests from "../../requests/auth_requests.js";

const RegisterForm = ({ onBackClick }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    requests.register(email, password);
  };

  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const onConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  return (
    <Box
      bg="white"
      rounded="lg"
      boxShadow="lg"
      p={8}
      maxW="sm"
      w="full"
      textAlign="center"
    >
      <Heading>Register</Heading>
      <Text mt={4}>Please enter your email and password to register.</Text>
      <Box mt={8}>
        <form onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={onEmailChange}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={onPasswordChange}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Confirm password</FormLabel>
            <Input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={onConfirmPasswordChange}
            />
          </FormControl>
          <Button
            colorScheme="blue"
            width="full"
            mt={4}
            type="submit"
            isLoading={false}
          >
            Register
          </Button>
          <Text mt={4}>
            Already have an account?{" "}
            <Button colorScheme="blue" variant="link" onClick={onBackClick}>
              Back to login
            </Button>
          </Text>
        </form>
      </Box>
    </Box>
  );
};

export default RegisterForm;
