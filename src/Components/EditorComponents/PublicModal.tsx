import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import Switch from "react-switch";

import './EditorComponentsStyles/NodeEditStyle.css';

export default function PublicModal(props: any){

  const customStyles = {
      overlay: {
          zIndex: 1000,
          height: '100vh',
          backgroundColor: 'rgba(0, 2, 5, 0.8)'
      },
      content : {
        borderRadius: '5%',
        border: '0',
        overflowy: 'auto',
        maxHeight: '90vh',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        boxShadow: '0 0 30px 0 rgba(0, 0, 0, 0.25)',
        paddingBottom: '20px',
        backgroundColor: '#262626',
        color: '#8b927d',
      }
    };

  useEffect(() => {
      Modal.setAppElement('#root');
  })

  return(
      <Modal
        isOpen={props.openModal}
        onRequestClose={props.closeModal}
        style={customStyles}
      >
        {props.children}
      </Modal>
  );
}