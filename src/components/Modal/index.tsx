import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import Modal from "react-native-modal";

import { Container, Title, Footer, Button, ButtonText } from "./styles";

interface Props {
  title: string;
  onConfirm: () => void;
}

export interface CustomModalRef {
  show: () => void;
}

const CustomModal = forwardRef<CustomModalRef, Props>(
  ({ onConfirm, title }, ref) => {
    const [isVisible, setIsVisible] = useState(false);

    const shouldConfirm = useRef(false);

    useImperativeHandle(
      ref,
      () => ({
        show: () => setIsVisible(true),
      }),
      []
    );

    const handleConfirm = () => {
      if (shouldConfirm.current) {
        onConfirm();
        shouldConfirm.current = false;
      }
    };

    const hideToConfirm = () => {
      shouldConfirm.current = true;
      setIsVisible(false);
    };

    return (
      <Modal isVisible={isVisible} onModalHide={handleConfirm}>
        <Container>
          <Title>{title}</Title>

          <Footer>
            <Button onPress={hideToConfirm}>
              <ButtonText>SIM</ButtonText>
            </Button>

            <Button onPress={() => setIsVisible(false)}>
              <ButtonText>CANCELAR</ButtonText>
            </Button>
          </Footer>
        </Container>
      </Modal>
    );
  }
);

export default CustomModal;
