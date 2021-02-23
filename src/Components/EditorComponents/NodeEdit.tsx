import { useEffect } from 'react';
import Modal from 'react-modal';

import './EditorComponentsStyles/NodeEditStyle.css';

export default function NodeEdit(props: any){
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
          <form>
            <div className="formRow">
              <div className="form__group field">
                <input className="form__field" name="title" placeholder="Title" type="text"/>
                <label className="form__label" >Título</label>
              </div>
              <div className="form__group">
                <textarea className="form__field" placeholder="Descrição" rows={1} style={{resize: 'none', overflow: 'auto'}} onChange={props.onChange}/>
                <label className="form__label">Descrição</label>
              </div>
            </div>
            <div className="formRow">
              <div className="form__group field"> 
                <input className="form__field" name="labels" placeholder="Labels" type="text"/>
                <label className="form__label">Labels</label>
              </div>
              <div className="form__group field">
                <input className="form__field" name="duracao" placeholder="Duração" type="number" />
                <label className="form__label">Duração</label>
              </div>
            </div>
            <div className="formRow">
              <div>
                <p>Node Color:</p>
                <input className="color_front" type="color" />
              </div>
              <div>
                <p>Text Color:</p>
                <input className="color_front" type="color" />
              </div>
              <div>
                <p>Background Color:</p>
                <input className="color_front" type="color" />
              </div>
            </div>
            <div className="form__group field img-inpt">
              <p>Imagem de fundo:</p>
              <input type="file" />
            </div>
           {/* <button onClick={props.closeModal}>close</button> */ }
          </form>
        </Modal>
    );
}