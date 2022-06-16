import React, { useCallback } from "react";
import { FlatList, FlatListProps, StyleProp, ViewStyle } from "react-native";
import styled from "styled-components/native";

function useFlatList<T = any>() {
  const List = styled(
    FlatList as new (props: FlatListProps<T>) => FlatList<T>
  ).attrs(
    () =>
      ({
        contentContainerStyle: {
          flexGrow: 1,
          padding: 20,
        },
      } as StyleProp<ViewStyle>)
  )`
    background-color: ${({ theme }) => theme.palette.background};
  `;

  const Separator = styled.View`
    height: 20px;
  `;

  const keyExtractor = useCallback((item: T, index: number) => `${index}`, []);

  return (props: FlatListProps<T>) => (
    <List
      keyExtractor={keyExtractor}
      ItemSeparatorComponent={() => <Separator />}
      {...props}
    />
  );
}

export default useFlatList;
