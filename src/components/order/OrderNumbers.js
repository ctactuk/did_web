import {
  Button,
  Flex,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
  SimpleGrid,
  Text,
  VStack,
  Input,
  Box,
  Grid,
  GridItem,
  TableContainer,
  // Checkbox,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import nusoapi from "../../requests/nuso_api_requests.js";

const OrderNumbers = ({ cancelButtonClick, countries, states }) => {
  const [quantity, setQuantity] = useState(10);
  const [consecutiveNumbers, setConsecutiveNumbers] = useState();
  const [numberType, setNumberType] = useState(["Landline"]);
  const [vanityDigits, setVanityDigits] = useState("");
  const [countrySelected, setCountrySelected] = useState("US");
  const [stateSelected, setStateSelected] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [accountSelected, setAccountSelected] = useState(0);
  const [trunk, setTrunk] = useState("ORG_WHISL");
  const [accounts, setAccounts] = useState([]);

  const onConsecutiveNumberChange = (event) => {
    setConsecutiveNumbers(event.target.value);
  };

  const onQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const onVanityDigitsChange = (event) => {
    setVanityDigits(event.target.value);
  };

  const onCountrySelect = (event) => {
    setCountrySelected(event.target.value);
  };

  const onAccountChange = (event) => {
    setAccountSelected(event.target.value);
  };

  const onStateSelect = (event) => {
    setStateSelected(event.target.value);
  };

  const onNumberTypeSelect = (event) => {
    setNumberType(
      event.target.value === "Land Line Mobile"
        ? ["Landline", "Mobile"]
        : [event.target.value]
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      const customerAccount = await nusoapi.getCustomerAccount();
      setAccounts(customerAccount.account);
    };

    fetchData();
  }, []);

  const onPlaceOrderClick = async (event) => {
    const order = {
      didTypes: numberType,
      country: countrySelected,
      quantity: quantity,
      trunk: trunk,
      account: accountSelected,
    };

    console.log(order);
  };

  const onSearchClick = async (event) => {
    const order = {
      didTypes: numberType,
      country: countrySelected,
    };

    if (quantity !== 0) {
      order.quantity = quantity;
    }

    if (stateSelected !== "") {
      order.state = stateSelected;
    }

    if (vanityDigits !== "") {
      order.vanityDigits = vanityDigits;
    }

    if (consecutiveNumbers !== 0) {
      order.consecutive = consecutiveNumbers;
    }

    setTrunk(order.didTypes === "Toll Free" ? "ORG_WHISL_TFT" : "ORG_WHISL");

    const result = await nusoapi.searchNumbers(order);
    setSearchResults(result.tns);
  };

  return (
    <>
      <Flex>
        <Box w="20%">
          <div>
            <Text>Account*</Text>
            <Select
              placeholder="Select account"
              onChange={onAccountChange}
              size="sm"
            >
              {accounts.map((account) => (
                <option key={account.id} value={account.id}>
                  {" "}
                  {account.name}{" "}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Text>Number Type*</Text>
            <Select
              placeholder="Select number type"
              onChange={onNumberTypeSelect}
              defaultValue="Landline"
              size="sm"
            >
              <option value="Landline">Landline</option>
              <option value="Mobile">Mobile</option>
              <option value="Land Line Mobile">Landline + Mobile</option>
              <option value="Toll Free">Toll Free</option>
            </Select>
          </div>
          <div>
            <Text>Country*</Text>
            <Select
              required
              placeholder="Select country"
              onChange={onCountrySelect}
              defaultValue="US"
              size="sm"
            >
              {countries.map((country) => (
                <option key={country.isoCode} value={country.isoCode}>
                  {country.name} - {country.isoCode}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Text>State</Text>
            <Select
              placeholder="Select state"
              onChange={onStateSelect}
              size="sm"
            >
              {states.map((state) => (
                <option key={state.id} value={state.abbreviation}>
                  {state.state} - {state.abbreviation}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Text>Quantity *</Text>
            <NumberInput defaultValue={quantity} min={0} max={1000} size="sm">
              <NumberInputField onChange={onQuantityChange} />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </div>
          <div>
            <Text>Consecutive #'s</Text>
            <NumberInput
              defaultValue={consecutiveNumbers}
              min={0}
              max={1000}
              size="sm"
            >
              <NumberInputField onChange={onConsecutiveNumberChange} />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </div>
          <div>
            <Text>Vanity Digits</Text>
            <Input onChange={onVanityDigitsChange} size="sm" />
          </div>
          <div>
            <Text>Trunk</Text>
            <Input value={trunk} isReadOnly isDisabled size="sm" />
          </div>
          <Grid templateColumns="repeat(3, 1fr)" gap={2} w="15%" paddingTop={2}>
            <GridItem w="100%" h="10">
              <Button w="100%" onClick={cancelButtonClick}>
                Cancel
              </Button>
            </GridItem>
            <GridItem w="100%" h="10">
              <Button w="100%" onClick={onSearchClick}>
                Search
              </Button>
            </GridItem>
            <GridItem w="100%" h="10">
              <Button
                w="100%"
                onClick={onPlaceOrderClick}
                isDisabled={searchResults.length > 0 ? false : true}
              >
                Place Order
              </Button>
            </GridItem>
          </Grid>
        </Box>
        <SimpleGrid columns={1} w="80%">
          <VStack w="100%">
            <TableContainer w="95%">
              <Table
                variant="striped"
                colorScheme="telegram"
                size="sm"
                w="100%"
              >
                <Thead>
                  <Tr>
                    <Th>NPA</Th>
                    <Th>NXX</Th>
                    <Th>ST</Th>
                    <Th>LATA</Th>
                    <Th>DID</Th>
                    <Th>Type</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {searchResults.map((result) => (
                    <Tr key={result.did}>
                      <Td>{result.npa}</Td>
                      <Td>{result.nxx}</Td>
                      <Td>{result.snStart}</Td>
                      <Td>{result.lata}</Td>
                      <Td>{result.did}</Td>
                      <Td>{result.didType}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </VStack>
        </SimpleGrid>
      </Flex>
    </>
  );
};

export default OrderNumbers;
