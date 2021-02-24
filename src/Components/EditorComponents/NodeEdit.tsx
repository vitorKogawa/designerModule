import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import Switch from "react-switch";

import './EditorComponentsStyles/NodeEditStyle.css';

export default function NodeEdit(props: any){
  const [checkedStart, setCheckedStart] = useState(false);
  const [checkedEnd, setCheckedEnd] = useState(false);

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
          <div className="form_row">
            <div className="form_group field">
              <input className="form_field" name="title" placeholder="Title" type="text" onChange={props.onChangeTitle}/>
              <label className="form_label" >Título</label>
            </div>
            <div className="form_group">
              <textarea className="form_field" placeholder="Descrição" rows={1} style={{resize: 'none', overflow: 'auto'}} onChange={props.onChangeDescription}/>
              <label className="form_label">Descrição</label>
            </div>
          </div>
          <div className="form_row">
            <div className="form_group field"> 
              <input className="form_field" name="labels" placeholder="Labels" type="text"/>
              <label className="form_label">Labels</label>
            </div>
            <div className="form_group field">
              <input className="form_field" name="duracao" placeholder="Duração" type="number" />
              <label className="form_label">Duração</label>
            </div>
          </div>
          <div className="form_row">
            <div className="form_group three_cols">
              <p>Node Color:</p>
              <input className="color_front" type="color" />
            </div>
            <div  className="form_group three_cols">
              <p>Text Color:</p>
              <input className="color_front" type="color" />
            </div>
            <div  className="form_group three_cols">
              <p>Background Color:</p>
              <input className="color_front" type="color" />
            </div>
          </div>
          <div className="form_row">
            <div  className="form_group three_cols">
              <p>Cartão de início</p>
              <Switch onChange={() => {setCheckedStart(!checkedStart)}} checked={checkedStart} />
            </div>
            <div  className="form_group three_cols">
              <p>Cartão final</p>
              <Switch onChange={() => {setCheckedEnd(!checkedEnd)}} checked={checkedEnd} />
            </div>
            <div  className="form_group three_cols">
              <p>Imagem de fundo:</p>
              <input className="inpt_file" type="file" />
            </div>
          </div>
          <hr></hr>
          <div className="form_row right end">
            <span className="cancel" onClick={props.closeModal}>Cancelar</span> 
            <span className="button_style" onClick={props.closeModal}>Salvar</span> 
          </div>
        </form>
      </Modal>
  );
}