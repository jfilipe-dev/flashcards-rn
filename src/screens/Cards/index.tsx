import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { DrawerRouteParams } from "../../@types/navigation";
import FloatButton from "../../components/FloatButton";
import Input from "../../components/Input";
import useFlatList from "../../hooks/useFlatlist";
import { getCards, Card, deleteCard } from "../../services/cards";
import CardItem from "./components/CardItem";

import { PlayButton } from "./styles";

const Cards = () => {
  const { setOptions, navigate } = useNavigation();
  const { params } = useRoute<DrawerRouteParams<"Cards">>();
  const { collection } = params;

  const List = useFlatList<Card>();

  const [cards, setCards] = useState<Card[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const renderHeader = useMemo(() => {
    return (
      <>
        <Input label="Filtro" value={search} onChangeText={setSearch} />
        <PlayButton
          label="Jogar"
          type="success"
          disabled={!cards.length}
          onPress={() => {
            navigate("Drawer", {
              screen: "Play",
              params: {
                cards,
                collection,
              },
            });
          }}
        />
      </>
    );
  }, [search, cards]);

  const data = useMemo(() => {
    if (loading) return [];
    if (!search) return cards;
    return cards?.filter((card) => {
      const searchLower = search.toLowerCase();

      const findFront = card.front.toLowerCase().includes(searchLower);
      const findBack = card.back.toLowerCase().includes(searchLower);

      return findFront || findBack;
    });
  }, [cards, search, loading]);

  const handleDeleteCard = async (id: string) => {
    setLoading(true);
    await deleteCard(id);
    getCards(collection.id)
      .then(setCards)
      .finally(() => setLoading(false));
  };

  useLayoutEffect(() => {
    setOptions({
      headerTitle: `Cartões - ${collection.name}`,
    });
  }, [collection]);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      getCards(collection.id)
        .then(setCards)
        .finally(() => setLoading(false));
    }, [collection])
  );

  return (
    <>
      <List
        data={data}
        renderItem={({ item }) => (
          <CardItem
            data={item}
            deleteCard={() => handleDeleteCard(item.id)}
            collection={collection}
          />
        )}
        loading={loading}
        loadingText="Carregando cartões..."
        emptyText="Você ainda não tem nenhum cartão"
        ListHeaderComponent={renderHeader}
      />

      <FloatButton
        onPress={() =>
          navigate("Drawer", {
            screen: "CreateOrUpdateCard",
            params: { collection },
          })
        }
      />
    </>
  );
};

export default Cards;
