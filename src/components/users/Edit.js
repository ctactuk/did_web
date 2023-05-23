import {
  Button,
  Checkbox,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FiSave, FiX } from "react-icons/fi";
import whisl_requests from "../../requests/whisl_api.js";

const EditUserModal = ({
  isOpen,
  onOpen,
  onClose,
  title,
  handleUpdateUser,
  data,
}) => {
  const [fullname, setFullname] = useState();
  const [phone, setPhone] = useState();
  const [userEmail, setUserEmail] = useState();
  const [username, setUsername] = useState();

  const handleOnChangeFullName = (event) => {
    setFullname(event.target.value);
  };

  const handleOnchangeEmail = (event) => {
    setUserEmail(event.target.value);
  };

  const handleOnChangePhone = (event) => {
    setPhone(event.target.value);
  };

  const handleOnchangeUsername = (event) => {
    setUsername(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      await whisl_requests.getUserRoles().then((response) => {});
    };

    fetchData();
  }, []);

  useEffect(() => {
    setFullname(data.fullname);
    setUserEmail(data.email);
    setPhone(data.phone_number);
    setUsername(data.username);
  }, [data]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(3px) hue-rotate(40deg)"
        />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div>
              <Text>Name*</Text>
              <Input
                placeholder="Name"
                defaultValue={data.fullname}
                onChange={handleOnChangeFullName}
                size={"sm"}
              />
            </div>
            <div>
              <Text>Email*</Text>
              <Input
                placeholder="Email"
                defaultValue={data.email}
                onChange={handleOnchangeEmail}
                size={"sm"}
              />
            </div>
            <div>
              <Text>Username*</Text>
              <Input
                placeholder="Username"
                defaultValue={data.username}
                onChange={handleOnchangeUsername}
                size={"sm"}
              />
            </div>
            <div>
              <Text>Phone*</Text>
              <Input
                placeholder="Phone"
                defaultValue={data.phone_number}
                onChange={handleOnChangePhone}
                size={"sm"}
              />
            </div>
            <div>
              <Checkbox colorScheme="green" defaultChecked={data.is_active}>
                Checkbox
              </Checkbox>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose} size="sm">
              <FiX />
              Cancel
            </Button>
            <Button
              colorScheme="green"
              onClick={() => {
                data.fullname = fullname;
                data.email = userEmail;
                data.phone_number = phone;
                data.username = username;

                handleUpdateUser(data);
                onClose();
              }}
              size="sm"
            >
              <FiSave />
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditUserModal;
