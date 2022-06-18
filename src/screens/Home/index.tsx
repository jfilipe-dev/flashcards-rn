import React, { useCallback, useState } from "react";
import { useAuth } from "../../context/useAuth";
import useFlatList from "../../hooks/useFlatlist";

import {
  Collection,
  deleteCollection,
  getCollections,
} from "../../services/collections";
import CollectionItem from "./components/Collection";

import { useFocusEffect, useNavigation } from "@react-navigation/native";
import FloatButton from "../../components/FloatButton";

const Home: React.FC = () => {
  const { navigate } = useNavigation();
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
        emptyText="Você ainda não tem nenhuma coleção"
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
