import { useEffect } from 'react';
import Modal from 'react-modal';

export default function NodeEdit(props: any){
    const customStyles = {
        overlay: {
            zIndex: 1000
        },
        content : {
          top                   : '50%',
          left                  : '50%',
          right                 : 'auto',
          bottom                : 'auto',
          marginRight           : '-50%',
          transform             : 'translate(-50%, -50%)'
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
          <h2>{props.title}</h2>
          <button onClick={props.closeModal}>close</button>
          <form>
            <p>Title:</p>
            <input type="text"/>
            <p>Descrição:</p>
            <textarea onChange={props.onChange}/>
            <p>Imagem:</p>
            <input type="file" />
            <p>Imagem de fundo:</p>
            <input type="file" />
          </form>
        </Modal>
    );
}