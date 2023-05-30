import { Center, SimpleGrid, Spinner, Text } from "@chakra-ui/react";

const Loading = ({ mesage }) => {
  return (
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
          <Text>{mesage}</Text>
        </Center>
      </SimpleGrid>
    </Center>
  );
};

export default Loading;
