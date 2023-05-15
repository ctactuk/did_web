import {
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";

const OrderTableSearch = ({ searchResults }) => {
  return (
    <TableContainer w="95%">
      <Table
        variant="striped"
        colorScheme="telegram"
        size={{ base: "sm", md: "sm", lg: "sm", sm: "xsm" }}
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
  );
};

export default OrderTableSearch;
