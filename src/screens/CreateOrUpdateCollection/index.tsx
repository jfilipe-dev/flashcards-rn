import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useLayoutEffect, useMemo, useState } from "react";
import { DrawerRouteParams } from "../../@types/navigation";
import * as Yup from "yup";
import { addNewCollection, updateCollection } from "../../services/collections";
import { useAuth } from "../../context/useAuth";
import getValiationErros from "../../utils/getValiationErros";
import ScrollContainer from "../../components/ScrollContainer";

import { Container, Title, CancelButton } from "./styles";
import Input from "../../components/Input";
import Button from "../../components/Button";

interface Errors {
  name?: string;
  description?: string;
  image?: string;
}

const schema = Yup.object().shape({
  name: Yup.string().required("O nome é obrigatório"),
  description: Yup.string().required("A descrição é obrigatória"),
  image: Yup.string().required("A imagem é obrigatória"),
});

const CreateOrUpdateCollection: React.FC = () => {
  const { setOptions, goBack } = useNavigation();
  const { params } = useRoute<DrawerRouteParams<"CreateOrUpdateCollection">>();

  const { currentUser } = useAuth();

  const [name, setName] = useState(params?.collection.name || "");
  const [description, setDescription] = useState(
    params?.collection.description || ""
  );
  const [image, setImage] = useState(params?.collection.image || "");

  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  const pageTitle = useMemo(() => {
    const title = "Preencha os dados referentes à coleção a ser ";

    if (params?.collection) {
      return title + "atualizada";
    }

    return title + "criada";
  }, [params?.collection]);

  const buttonLabel = useMemo(() => {
    if (params?.collection) {
      return "Salvar alterações";
    }

    return "Cadastrar";
  }, [params?.collection]);

  const handleSubmit = async () => {
    setLoading(true);
    setErrors({});

    const data = {
      name,
      description,
      image,
    };

    try {
      await schema.validate(data, {
        abortEarly: false,
      });

      if (params?.collection) {
        await updateCollection(params.collection.id, data);
      } else if (currentUser?.email) {
        await addNewCollection(data, currentUser?.email);
      }

      goBack();
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errorsValidate = getValiationErros(error);
        setErrors(errorsValidate);
      }
    } finally {
      setLoading(false);
    }
  };

  useLayoutEffect(() => {
    if (params?.collection) {
      setOptions({
        headerTitle: "Editar coleção",
      });
    }
  }, [params?.collection]);

  return (
    <ScrollContainer full={false}>
      <Title>{pageTitle}</Title>

      <Container>
        <Input
          label="Nome"
          value={name}
          onChangeText={setName}
          error={errors.name}
        />
        <Input
          label="Descrição"
          value={description}
          onChangeText={setDescription}
          error={errors.description}
        />
        <Input
          label="Imagem"
          value={image}
          onChangeText={setImage}
          error={errors.image}
        />

        <Button label={buttonLabel} onPress={handleSubmit} loading={loading} />
      </Container>

      <CancelButton
        label="Cancelar"
        type="outline"
        onPress={goBack}
        disabled={loading}
      />
    </ScrollContainer>
  );
};

export default CreateOrUpdateCollection;
