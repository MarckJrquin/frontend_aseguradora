import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";

const ConfirmDeleteQuote = ({ open, onClose, onConfirm }) => {
  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      size="lg"
      backdrop="blur"
      scrollBehavior='inside'
    >
      <ModalContent>
        <ModalHeader>
          Confirmar Eliminación
        </ModalHeader>
        <ModalBody>
          ¿Estás seguro de que deseas eliminar esta cotización? Esta acción no se puede deshacer.
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={onClose}>
            Cancelar
          </Button>
          <Button color="danger" onClick={() => { onConfirm(); onClose(); }}>
            Eliminar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmDeleteQuote;
