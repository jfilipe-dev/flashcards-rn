import React, { useCallback, useEffect, useState } from "react";
import { Text } from "react-native";
import { useAuth } from "../../context/useAuth";
import useFlatList from "../../hooks/useFlatlist";

import CollectionItem from "./components/Collection";
import {
  Collection,
  getCollections,
  deleteCollection,
} from "../../services/collections";

import { useTheme } from "styled-components";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import FloatButton from "../../components/FloatButton";

const Home: React.FC = () => {
  const { navigate } = useNavigation();
  const { palette } = useTheme();
  const { currentUser } = useAuth();
  const List = useFlatList<Collection>();

  const [loading, setLoading] = useState(true);

  const [collections, setCollections] = useState<Collection[]>([]);

  const handleDeleteCollection = useCallback(
    async (id: string) => {
      setLoading(true);
      await deleteCollection(id);
      if (currentUser?.email)
        getCollections(currentUser?.email)
          .then(setCollections)
          .finally(() => {
            setLoading(false);
          });
    },
    [currentUser?.email]
  );

  useFocusEffect(
    useCallback(() => {
      if (currentUser?.email)
        getCollections(currentUser?.email)
          .then(setCollections)
          .finally(() => {
            setLoading(false);
          });
    }, [currentUser?.email])
  );

  return (
    <>
      <List
        data={loading ? [] : collections}
        loading={loading}
        loadingText="Carregando coleções..."
        renderItem={({ item }) => (
          <CollectionItem
            data={item}
            deleteCollection={() => handleDeleteCollection(item.id)}
          />
        )}
      />

      <FloatButton
        onPress={() =>
          navigate("Drawer", { screen: "CreateOrUpdateCollection" })
        }
      />
    </>
  );
};
export default Home;
