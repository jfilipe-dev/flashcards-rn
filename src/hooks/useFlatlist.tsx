import React, { memo, useCallback, useMemo } from "react";
import { FlatList, FlatListProps, StyleProp, ViewStyle } from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";
import styled from "styled-components/native";
import EmptyPage from "../components/EmptyPage";
import LoadingPage from "../components/LoadingPage";

interface ListProps<T> extends FlatListProps<T> {
  loading?: boolean;
  loadingText?: string;
  emptyText?: string;
}

function useFlatList<T = any>() {
  const List = styled(
    FlatList as new (props: FlatListProps<T>) => FlatList<T>
  ).attrs(
    () =>
      ({
        contentContainerStyle: {
          flexGrow: 1,
          padding: 20,
          paddingBottom: getBottomSpace() + 20 + 100,
        },
      } as StyleProp<ViewStyle>)
  )`
    background-color: ${({ theme }) => theme.palette.background};
  `;

  const Separator = styled.View`
    height: 20px;
  `;

  const keyExtractor = useCallback((item: T, index: number) => `${index}`, []);

  return useCallback(
    (props: ListProps<T>) => {
      const { loading, loadingText, emptyText, ...rest } = props;

      return (
        <List
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <Separator />}
          ListEmptyComponent={() => {
            if (loading) {
              return <LoadingPage title={loadingText} />;
            }

            if (emptyText) {
              return <EmptyPage title={emptyText} />;
            }

            return null;
          }}
          {...rest}
        />
      );
    },
    [keyExtractor]
  );
}

export default useFlatList;
