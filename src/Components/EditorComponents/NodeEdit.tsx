import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import Switch from "react-switch";
import Select from 'react-select';
import MDEditor from '@uiw/react-md-editor';

import './EditorComponentsStyles/NodeEditStyle.css';

export default function NodeEdit(props: any){
  
  const [nodeInfo, setNodeInfo] = useState(false);
  const [nodeName, setNodeName] = useState('');
  const [duration, setDuration] = useState(0);
  const [nodeColor, setNodeColor] = useState('');
  const [textColor, setTextColor] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('');
  const [startNode, setStartNode] = useState(false);
  const [endNode, setEndNode] = useState(false);
  const [alt1, setAlt1] = useState('');
  const [alt2, setAlt2] = useState('');
  const [card1, setCard1] = useState('');
  const [card2, setCard2] = useState('');
  const [tags, setTags] = useState(Array());


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
      if(props.currentNodeInfo !== null){
        setNodeInfo(true);
        setNodeName(props.currentNodeInfo.gameNode.name);
        setDuration(props.currentNodeInfo.gameNode.duration);
        setNodeColor(props.currentNodeInfo.gameNode.nodeColor);
        setTextColor(props.currentNodeInfo.gameNode.textColor);
        setBackgroundColor(props.currentNodeInfo.gameNode.backgroundColor);
        setStartNode(props.currentNodeInfo.gameNode.startNode);
        setEndNode(props.currentNodeInfo.gameNode.endNode);
        setTags(props.currentNodeInfo.gameNode.labels);
        if(props.currentNodeInfo.gameNode.nextNodes.length !== 0){
          setAlt1(props.currentNodeInfo.gameNode.nextNodes[0].choice);
          setAlt2(props.currentNodeInfo.gameNode.nextNodes[1].choice);
          setCard1(props.currentNodeInfo.gameNode.nextNodes[0].id);
          setCard2(props.currentNodeInfo.gameNode.nextNodes[1].id);
        }
      }    
  }, [props.currentNodeInfo])

  const onNameChange = (event:any) => {
    setNodeName(event.target.value);
    props.onChangeTitle(event);
  }
  const onDurationChange = (event:any) => {
    setDuration(event.target.value);
    props.onChangeDuration(event)
  }
  const onNodeColorChange = (event:any) => {
    setNodeColor(event.target.value);
    props.onChangeNodeColor(event);
  }
  const onTextColorChange = (event:any) => {
    setTextColor(event.target.value);
    props.onChangeTextColor(event);
  }
  const onBgColorChange = (event:any) => {
    setBackgroundColor(event.target.value);
    props.onChangeBgColor(event);
  }
  const onStartNodechange = () => {
    setStartNode(!startNode);
    props.onChangeNodeStart();
  }
  const onEndNodechange = () => {
    setEndNode(!endNode);
    props.onChangeNodeEnd();
  }
  const onAlt1Change = (event:any) => {
  //  setAlt1(event.target.value);
    props.onChangeOption(event);
  }
  const onAlt2Change = (event:any) => {
   // setAlt2(event.target.value);
    props.onChangeOption(event);
  }
  const onCard1Change = (event:any) => {
  //  setCard1(event.target.value);
    props.onChangeNoLigacao(event);
  }
  const onCard2Change = (event:any) => {
   // setCard2(event.target.value);
    props.onChangeNoLigacao(event);
  }

  const onTagsChange = (e:any) => {
    setTags(tags.splice(0, tags.length))
    let x = Array();
    e.map((item:any) => {
      x.push({'label':item.label, 'value': item.label, 'color': item.color});
      setTags(x);
      return 0
    })
    props.handleInputChange(e);
  }

  return(
      <Modal
        isOpen={props.openModal}
        onRequestClose={props.closeModal}
        style={customStyles}
      >
        {!nodeInfo ? 
          <span>Loading...</span>
        :
        <form>
          <div className="form_row">
            <div className="form_group one">
              <MDEditor
                value={props.currentNodeInfo === 'unsaved' ? '' : props.currentNodeInfo.gameNode.markdownContent}
                onChange={props.onChangeDescription}
                style={{marginTop: '20px'}}
              />
              <label className="form_label alone">Descrição</label>
            </div>
          </div>
          <div className="form_row">
            <div className="form_group field">
              <input className="form_field" value={props.currentNodeInfo === 'unsaved' ? undefined : nodeName} name="title" placeholder="Title" type="text" onChange={e => onNameChange(e)}/>
              <label className="form_label" >Título</label>
            </div>
            <div className="form_group field">
              <input className="form_field" value={props.currentNodeInfo === 'unsaved' ? undefined : duration} name="duracao" placeholder="Duração" type="number" onChange={e => onDurationChange(e)}/>
              <label className="form_label">Duração</label>
            </div>
          </div>
          <div className="form_row">
            <div className="form_group field"> 
              <label className="form_label alone">Tags:</label>  
            </div>
            <div className="form_group field"> 
              <Select
                value={props.currentNodeInfo === 'unsaved' ? undefined : tags}
                isMulti
                name="colors"
                options={props.tagOptions}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={(e) => onTagsChange(e)}
              />
            </div>
          </div>
          <div className="form_row">
            <div className="form_group field"> 
              <input value={props.currentNodeInfo === 'unsaved' ? undefined : alt1} className="form_field" name="Option" placeholder="Alternativa" type="text" onChange={e => setAlt1(e.target.value)} onBlur={e => onAlt1Change(e)}/>
              <label className="form_label">Alternativa</label>
            </div>
            <div className="form_group field">
              <input value={props.currentNodeInfo === 'unsaved' ? undefined : card1} className="form_field" name="Node" placeholder="Nó" type="text" onChange={e => setCard1(e.target.value)} onBlur={e => onCard1Change(e)} />
              <label className="form_label">Card</label>
            </div>
          </div>
          {/************************************************************************* */}
          <div className="form_row">
            <div className="form_group field"> 
              <input value={props.currentNodeInfo === 'unsaved' ? undefined : alt2} className="form_field" name="Option" placeholder="Alternativa" type="text" onChange={e => setAlt2(e.target.value)} onBlur={e => onAlt2Change(e)}/>
              <label className="form_label">Alternativa</label>
            </div>
            <div className="form_group field">
              <input value={props.currentNodeInfo === 'unsaved' ? undefined : card2} className="form_field" name="Node" placeholder="Nó" type="text" onChange={e => setCard2(e.target.value)} onBlur={e => onCard2Change(e)} />
              <label className="form_label">Card</label>
            </div>
          </div>
          {/************************************************************************* */}
          <div className="form_row">
            <div className="form_group three_cols">
              <p>Node Color:</p>
              <input value={props.currentNodeInfo === 'unsaved' ? undefined : nodeColor} className="color_front" type="color" onChange={e => onNodeColorChange(e)}/>
            </div>
            <div  className="form_group three_cols">
              <p>Text Color:</p>
              <input value={props.currentNodeInfo === 'unsaved' ? undefined : textColor} className="color_front" type="color" onChange={e => onTextColorChange(e)} />
            </div>
            <div  className="form_group three_cols">
              <p>Background Color:</p>
              <input value={props.currentNodeInfo === 'unsaved' ? undefined : backgroundColor} className="color_front" type="color" onChange={e => onBgColorChange(e)} />
            </div>
          </div>
          <div className="form_row">
            <div  className="form_group three_cols">
              <p>Cartão de início</p>
              <Switch checked={props.currentNodeInfo === 'unsaved' ? props.checkedStart : startNode} onChange={() => onStartNodechange()} />
            </div>
            <div  className="form_group three_cols">
              <p>Cartão final</p>
              <Switch checked={props.currentNodeInfo === 'unsaved' ? props.checkedEnd : endNode} onChange={() => onEndNodechange()}/>
            </div>
            <div  className="form_group three_cols">
              <p>Imagem de fundo:</p>
              <input className="inpt_file" type="file" />
            </div>
          </div>
          <hr></hr>
          <div className="form_row right end">
            <span className="cancel" onClick={props.closeModal}>Cancelar</span> 
            <span className="button_style" onClick={props.onSaveChanges}>Salvar</span> 
          </div>
        </form>
         }
      </Modal>
  );
}