import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useLayoutEffect, useMemo, useState } from "react";
import { DrawerRouteParams } from "../../@types/navigation";
import * as Yup from "yup";
import { addNewCollection, updateCollection } from "../../services/collections";
import { useAuth } from "../../context/useAuth";
import getValiationErros from "../../utils/getValiationErros";
import ScrollContainer from "../../components/ScrollContainer";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "styled-components";
import * as ImagePicker from "expo-image-picker";

import {
  Container,
  Title,
  CancelButton,
  SelectImage,
  SelectImageLabel,
  EmptyImageContainer,
  Image,
} from "./styles";
import { uploadImage } from "../../services/image";

interface Errors {
  name?: string;
  description?: string;
  image?: string;
}

const schema = Yup.object().shape({
  name: Yup.string().required("O nome é obrigatório"),
  description: Yup.string().required("A descrição é obrigatória"),
});

const CreateOrUpdateCollection: React.FC = () => {
  const { palette } = useTheme();
  const { setOptions, goBack } = useNavigation();
  const { params } = useRoute<DrawerRouteParams<"CreateOrUpdateCollection">>();

  const { currentUser } = useAuth();

  const [name, setName] = useState(params?.collection.name || "");
  const [description, setDescription] = useState(
    params?.collection.description || ""
  );
  const [image, setImage] = useState(params?.collection.imageUrl || "");

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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      base64: true,
      quality: 0,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setErrors({});

    const collection = params?.collection;

    const imageName = collection
      ? collection.imageName
      : `${name.toLocaleLowerCase}-${Date.now()}-${currentUser?.email}`;

    const dataToValidade = {
      name,
      description,
    };
    try {
      await schema.validate(dataToValidade, {
        abortEarly: false,
      });

      const imageUrl = await uploadImage(image, imageName);

      const data = {
        ...dataToValidade,
        imageUrl,
        imageName,
      };

      if (params?.collection) {
        await updateCollection(params.collection.id, data);
      } else if (currentUser?.email) {
        await addNewCollection(data, currentUser?.email);
      }

      goBack();
    } catch (error) {
      console.log(
        "🚀 ~ file: index.tsx ~ line 113 ~ handleSubmit ~ error",
        error
      );
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
        <SelectImage onPress={pickImage}>
          <SelectImageLabel>Imagem</SelectImageLabel>

          {image ? (
            <Image source={{ uri: image }} />
          ) : (
            <EmptyImageContainer>
              <MaterialCommunityIcons
                name="image-plus"
                size={48}
                color={palette.gray}
              />
            </EmptyImageContainer>
          )}
        </SelectImage>

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
