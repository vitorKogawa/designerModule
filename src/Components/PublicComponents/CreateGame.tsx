import { useEffect } from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom'
import Switch from "react-switch";
import '../EditorComponents/EditorComponentsStyles/NodeEditStyle.css';

export default function CreateGame(props: any){

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
              <input className="form_field" name="title" placeholder="Title" type="text"/>
              <label className="form_label" >Título</label>
            </div>
            <div className="form_group">
              <textarea className="form_field" placeholder="Descrição" rows={1} style={{resize: 'none', overflow: 'auto'}} />
              <label className="form_label">Descrição</label>
            </div>
          </div>
          <div className="form_row">
            <div className="form_group field"> 
              <input className="form_field" name="labels" placeholder="Labels" type="text"/>
              <label className="form_label">Labels</label>
            </div>
            <div className="form_group field"> 
              <input className="form_field" name="attributes" placeholder="Atributos" type="text"/>
              <label className="form_label">Atributos</label>
            </div>
          </div>
          <div className="form_row">
            <div className="form_group three_cols">
              <p>Default Node Color:</p>
              <input className="color_front" type="color" />
            </div>
            <div  className="form_group three_cols">
              <p>Default Text Color:</p>
              <input className="color_front" type="color" />
            </div>
            <div  className="form_group three_cols">
              <p>Default Background Color:</p>
              <input className="color_front" type="color" />
            </div>
          </div>
          <div className="form_row">
            <div  className="form_group three_cols">
              <p>Imagem de fundo</p>
              <input className="inpt_file" type="file" />
            </div>
            <div  className="form_group three_cols">
              <p>Template</p>
              <Switch onChange={props.onChangeIsTemplate} checked={props.isTemplate} />
            </div>
            <div  className="form_group three_cols">
              <p>Logo do jogo</p>
              <input className="inpt_file" type="file" />
            </div>
          </div>
          <hr></hr>
          <div className="form_row right end">
            <span className="cancel" onClick={props.closeModal}>Cancelar</span> 
            <Link to="/editor" className="button_style">Criar</Link>
          </div>
        </form>
      </Modal>
  );
}