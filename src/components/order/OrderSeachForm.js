import {
  Box,
  Button,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import nusoapi from "../../requests/nuso_api_requests.js";
import whisl_api from "../../requests/whisl_api.js";

const OrderSearchForm = ({ cancelButtonClick, countries, states, setIsLoading, setSearchResults, searchResults }) => {
  const [quantity, setQuantity] = useState(10);
  const [consecutiveNumbers, setConsecutiveNumbers] = useState();
  const [numberType, setNumberType] = useState(["Landline"]);
  const [vanityDigits, setVanityDigits] = useState("");
  const [countrySelected, setCountrySelected] = useState("US");
  const [npaResults, setNpaResults] = useState([]);
  const [nxxResults, setNxxResults] = useState([]);
  const [lataResults, setLataResults] = useState([]);
  const [stateSelected, setStateSelected] = useState("");

  const [accountSelected, setAccountSelected] = useState(0);
  const [trunkList, setTrunkList] = useState([]);
  const [trunk, setTrunk] = useState("ORG_WHISL");
  const [npa, setNpa] = useState("");
  const [npx, setNpx] = useState("");
  const [lata, setLata] = useState("");
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

  const onNpaSelect = (event) => {
    setNpa(event.target.value);
  };

  const onNpxSelect = (event) => {
    setNpx(event.target.value);
  };

  const onLataSelect = (event) => {
    setLata(event.target.value);
  };

  const onNumberTypeSelect = (event) => {
    setNumberType(
      event.target.value === "Land Line Mobile"
        ? ["Landline", "Mobile"]
        : [event.target.value]
    );
  };

  const getTrunkByName = () => {
    const trunkObj = trunkList.find(({ alias }) => alias === trunk);
    return trunkObj;
  };

  useEffect(() => {
    const fetchData = async () => {
      const customerAccount = await nusoapi.getCustomerAccount();

      setAccounts(customerAccount.account);
      setTrunkList(customerAccount.trunk);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = [
        {
          searchField: "Country",
          searchText: countrySelected,
        },
        {
          searchField: "Number Type",
          searchText: "Landline",
        },
      ];

      if (stateSelected !== "") {
        data.push({
          searchField: "State",
          searchText: stateSelected,
        });
      }

      if (npa !== "") {
        data.push({
          searchField: "NPA",
          searchText: npa,
        });
      }

      if (npx !== "") {
        data.push({
          searchField: "NXX",
          searchText: npx,
        });
      }

      if (lata !== "") {
        data.push({
          searchField: "LATA",
          searchText: lata,
        });
      }

      await whisl_api
        .getLergDataFromProvider({
          searchItems: data,
        })
        .then((response) => {
          if (typeof response.data !== "undefined") {
            setNpaResults(response.data.npa);
            setNxxResults(response.data.nxx);
            setLataResults(response.data.lata);
          }
        });
    };

    fetchData();
  }, [countrySelected, stateSelected, lata, npa, npx]);

  const onPlaceOrderClick = async (event) => {
    const trunkObj = getTrunkByName();
    const pon = getRandomPon().toString();
    const orderNumbers = searchResults.map((number) => {
      return {
        did: number.did[0].toString(),
        tid: trunkObj?.id,
        accountId: accountSelected,
      };
    });

    const order = {
      pon: "PON-" + pon,
      numbers: orderNumbers,
      reserveOnly: false,
    };
    whisl_api.createOrder(order);
  };

  function getRandomPon() {
    return Math.floor(Math.random() * 1000000);
  }

  const onSearchClick = async (event) => {
    setIsLoading(true);
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

    if (npa !== "") {
      order.npa = npa;
    }

    if (npx !== "") {
      order.nxx = npx;
    }

    if (lata !== "") {
      order.lata = lata;
    }

    setTrunk(numberType[0] === "Toll Free" ? "ORG_WHISL" : "ORG_WHISL_TFT");

    await whisl_api.searchNumbers(order).then((response) => {
      setSearchResults(response.data.tns);

      setIsLoading(false);
    });
  };
  return (
    <Box w="20%">
      <div>
        <Text>Account*</Text>
        <Select
          placeholder="Select account"
          onChange={onAccountChange}
          size="sm"
        >
          {accounts.map((account, idx) => (
            <option key={idx} value={account.id}>
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
          {countries.map((country, idx) => (
            <option key={idx} value={country.isoCode}>
              {country.name} - {country.isoCode}
            </option>
          ))}
        </Select>
      </div>
      <div>
        <Text>State</Text>
        <Select placeholder="Select state" onChange={onStateSelect} size="sm">
          {states.map((state,idx) => (
            <option key={idx} value={state.abbreviation}>
              {state.state} - {state.abbreviation}
            </option>
          ))}
        </Select>
      </div>
      <div>
        <Text>Lata</Text>
        <Select placeholder="Select LATA" size="sm" onChange={onLataSelect}>
          {lataResults.map((lata, idx) => (
            <option key={idx} value={lata.name}>
              {lata.fullName} - {lata.name}
            </option>
          ))}
        </Select>
      </div>
      <div>
        <Text>NPA</Text>
        <Select placeholder="Select NPA" size="sm" onChange={onNpaSelect}>
          {npaResults.map((npa, idx) => (
            <option key={idx} value={npa}>
              {npa}
            </option>
          ))}
        </Select>
      </div>
      <div>
        <Text>NXX</Text>
        <Select placeholder="Select NXX" size="sm" onChange={onNpxSelect}>
          {nxxResults.map((npx,idx) => (
            <option key={idx} value={npx}>
              {npx}
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
      <SimpleGrid gap={2} columns={{ md: 3, sm: 1 }} paddingTop={2}>
        <Button w="100%" onClick={cancelButtonClick}>
          Cancel
        </Button>
        <Button w="100%" onClick={onSearchClick}>
          Search
        </Button>
        <Button
          w="100%"
          onClick={onPlaceOrderClick}
          isDisabled={searchResults.length > 0 ? false : true}
        >
          Place Order
        </Button>
      </SimpleGrid>
    </Box>
  );
};

export default OrderSearchForm;
