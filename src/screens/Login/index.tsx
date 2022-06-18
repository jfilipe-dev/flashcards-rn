import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import ScrollContainer from "../../components/ScrollContainer";
import * as Yup from "yup";
import { useAuth } from "../../context/useAuth";
import getValiationErros from "../../utils/getValiationErros";
import { Container, RegisterButton, Image } from "./styles";
import LoginIcon from "../../assets/LoginIcon.png";

interface Errors {
  email?: string;
  password?: string;
}

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Insira um e-mail válido")
    .required("O e-mail é obrigatório"),
  password: Yup.string()
    .min(8, "A senha deve ter ao menos 8 caracteres")
    .required("A senha é obrigatória"),
});

const Login: React.FC = () => {
  const { reset, navigate } = useNavigation();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<Errors>({});

  async function handleSubmit() {
    setLoading(true);
    setErrors({});

    const data = {
      email,
      password,
    };

    try {
      await schema.validate(data, {
        abortEarly: false,
      });

      await login(email, password);
      reset({
        routes: [{ name: "Drawer" }],
      });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errorsValidate = getValiationErros(error);
        setErrors(errorsValidate);
      } else {
        setErrors({
          password:
            "Senha inválida. Por favor, verifique se o endereço de e-mail e/ou a senha são válidos.",
        });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollContainer bounces={false}>
      <Image source={LoginIcon} />

      <Container>
        <Input
          label="E-mail"
          value={email}
          onChangeText={setEmail}
          error={errors.email}
          autoCapitalize="none"
        />
        <Input
          label="Senha"
          password
          value={password}
          onChangeText={setPassword}
          error={errors.password}
        />

        <Button label="ENTRAR" onPress={handleSubmit} loading={loading} />
      </Container>

      <RegisterButton
        label="CADASTRE-SE"
        type="secondary"
        onPress={() => navigate("Register")}
      />
    </ScrollContainer>
  );
};

export default Login;
