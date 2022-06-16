import React from "react";
import { Text } from "react-native";
import useFlatList from "../../hooks/useFlatlist";

// import { Container } from './styles';

const Home: React.FC = () => {
  const data = [
    "true",
    "true",
    "true",
    "true",
    "true",
    "true",
    "true",
    "true",
    "true",
    "true",
  ];

  const List = useFlatList<string>();

  return (
    <List
      data={data}
      renderItem={({ item }) => <Text>{item}</Text>}
      ListHeaderComponent={<Text>item</Text>}
    />
  );
};
export default Home;
