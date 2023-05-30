import { Flex, SimpleGrid, VStack } from "@chakra-ui/react";
import { useState } from "react";
import OrderTableSearch from "./OrderTableSearch.js";
import OrderSearchForm from "./OrderSeachForm.js";
import Loading from "../common/Loading.js";

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
            <Loading mesage="Searching for Numbers..." />
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
