import React from 'react';
import styles from './modalCreateOrder.module.css';
import { Modal, Button } from '@mantine/core';

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const ModalCreateOrder: React.FC<Props> = ({ isOpen, setIsOpen }) => {

  const onCloseModal = () => {
    setIsOpen(false)
  }

  return (
    <>
      <Modal opened={isOpen} onClose={onCloseModal} title="Crear nueva orden" centered className={styles.responsiveModal}>
        {/* Modal content */}
      </Modal>
    </>
  );

}

export default ModalCreateOrder;