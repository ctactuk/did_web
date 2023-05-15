import {
  Flex,
  SimpleGrid,
  Text,
  VStack,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { useState } from "react";
import OrderTableSearch from "./OrderTableSearch.js";
import OrderSearchForm from "./OrderSeachForm.js";

const OrderNumbers = ({ cancelButtonClick, countries, states }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  return (
    <>
      <Flex>
        <OrderSearchForm
          countries={countries}
          states={states}
          cancelButtonClick={cancelButtonClick}
          setIsLoading={setIsLoading}
          setSearchResults={setSearchResults}
          searchResults={searchResults}
        />
        <SimpleGrid columns={1} w="80%">
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
                  <Text>Searching for Numbers...</Text>
                </Center>
              </SimpleGrid>
            </Center>
          ) : (
            <VStack w="100%">
              <OrderTableSearch searchResults={searchResults} />
            </VStack>
          )}
        </SimpleGrid>
      </Flex>
    </>
  );
};

export default OrderNumbers;
