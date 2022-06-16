import React, { useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import ScrollContainer from "../../components/ScrollContainer";
import * as Yup from "yup";
import { useAuth } from "../../context/useAuth";
import getValiationErros from "../../utils/getValiationErros";
import { useNavigation } from "@react-navigation/native";
import { Title } from "./styles";

interface Errors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Insira um e-mail válido")
    .required("O e-mail é obrigatório"),
  password: Yup.string()
    .min(8, "A senha deve ter ao menos 8 caracteres")
    .required("A senha é obrigatória"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Senha não confere")
    .required("Confirmação da senha é obrigatório"),
});

const Register: React.FC = () => {
  const { reset } = useNavigation();
  const { register } = useAuth();

  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function handleSubmit() {
    setLoading(true);
    setErrors({});

    const data = {
      email,
      password,
      confirmPassword,
    };

    try {
      await schema.validate(data, {
        abortEarly: false,
      });

      await register(email, password);

      reset({
        routes: [{ name: "Drawer" }],
      });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errorsValidate = getValiationErros(error);
        setErrors(errorsValidate);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollContainer bounces={false}>
      <Title>Preencha os dados do seu cadastro</Title>

      <Input
        label="E-mail"
        value={email}
        onChangeText={setEmail}
        error={errors.email}
        autoCapitalize="none"
      />
      <Input
        label="Senha"
        value={password}
        onChangeText={setPassword}
        error={errors.password}
        password
      />
      <Input
        label="Repetir senha"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        error={errors.confirmPassword}
        password
      />

      <Button label="CADASTRAR" onPress={handleSubmit} loading={loading} />
    </ScrollContainer>
  );
};

export default Register;
