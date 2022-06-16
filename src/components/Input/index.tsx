import React, { useRef, useState } from "react";
import { View, TextInput, TextInputProps } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import {
  Container,
  InputText,
  ErrorText,
  Label,
  Content,
  Wrapper,
} from "./styles";

interface Props extends TextInputProps {
  label: string;
  error?: string;
  password?: boolean;
}

const Input = ({ label, error, password, style, ...rest }: Props) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const handleFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <Wrapper style={style}>
      <Container isFocused={isFocused} activeOpacity={1} onPress={handleFocus}>
        <Content>
          {!!label && <Label>{label}</Label>}
          <InputText
            ref={inputRef}
            onBlur={() => setIsFocused(false)}
            onFocus={() => setIsFocused(true)}
            secureTextEntry={password && !passwordVisible}
            {...rest}
          />
        </Content>
        {password && (
          <Ionicons
            name={passwordVisible ? "eye-off" : "eye"}
            size={22}
            onPress={() => setPasswordVisible(!passwordVisible)}
          />
        )}
      </Container>
      {!!error && <ErrorText>{error}</ErrorText>}
    </Wrapper>
  );
};

export default Input;
