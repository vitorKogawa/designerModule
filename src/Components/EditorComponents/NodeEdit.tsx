import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import Switch from "react-switch";
import Select from 'react-select';
import MDEditor from '@uiw/react-md-editor';
import { api_url } from '../../public/variables';

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
  const [card1ID, setCard1ID] = useState('');
  const [card2ID, setCard2ID] = useState('');
  const [themeSwitch, setThemeSwitch] = useState('');
  const [theme, setTheme] = useState({value: '', label: ''});
  const [tags, setTags] = useState(Array());
  const [card1, setCard1] = useState('');
  const [card2, setCard2] = useState('');

  
const groupStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};
const groupBadgeStyles = {
  backgroundColor: '#EBECF0',
  borderRadius: '2em',
  color: '#172B4D',
  display: 'inline-block',
  fontSize: 12,
  lineHeight: '1',
  minWidth: 1,
  padding: '0.16666666666667em 0.5em'
};

const options = [
  { value: 'Chocolate', label: 'Chocolate' },
  { value: 'Vanilla', label: 'Vanilla' }
]

  const formatGroupLabel = (data:any) => (
    <div style={groupStyles}>
      <span>{data.label}</span>
      <span style={groupBadgeStyles}>{data.options.length}</span>
    </div>
  );
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

    const getNode = async (id:number, card:number) => {
      const nodeResult = await fetch(api_url+'node/'+id, {
        method: 'GET',
        headers: {
          "Access-Control-Allow-Origin" : "*", 
          'Content-Type': 'application/json'
        }
      });
      const result = await nodeResult.json();
      if(card === 1)
        setCard1(result.gameNode.name);
      else if(card === 2)
        setCard2(result.gameNode.name)
    }

  useEffect(() => {
    if(card1 !== '')
      console.log(card1)
    if(card2 !== '')
      console.log(card2)
  }, [card1, card2])

  useEffect(() => {
      Modal.setAppElement('#root');
      if(props.currentNodeInfo !== null){
        const themeType = {value: props.currentNodeInfo.gameNode.theme, label: props.currentNodeInfo.gameNode.theme}
        setNodeInfo(true);
        setNodeName(props.currentNodeInfo.gameNode.name);
        setTheme(themeType);
        setDuration(props.currentNodeInfo.gameNode.duration);
        setNodeColor(props.currentNodeInfo.gameNode.nodeColor);
        setTextColor(props.currentNodeInfo.gameNode.textColor);
        setBackgroundColor(props.currentNodeInfo.gameNode.backgroundColor);
        setStartNode(props.currentNodeInfo.gameNode.startNode);
        setEndNode(props.currentNodeInfo.gameNode.endNode);
        setTags(props.currentNodeInfo.gameNode.labels);
        if(props.currentNodeInfo.gameNode.nextNodes.length !== 0){
          getNode(props.currentNodeInfo.gameNode.nextNodes[0].id, 1);
          setAlt1(props.currentNodeInfo.gameNode.nextNodes[0].choice);
          setCard1ID(props.currentNodeInfo.gameNode.nextNodes[0].id);
          if(props.currentNodeInfo.gameNode.nextNodes.length === 2){
            getNode(props.currentNodeInfo.gameNode.nextNodes[1].id, 2);
            setAlt2(props.currentNodeInfo.gameNode.nextNodes[1].choice);
            setCard2ID(props.currentNodeInfo.gameNode.nextNodes[1].id);
          }else{
            setAlt2('');
            setCard2('');
          }
        }
        else{
          setAlt1('');
          setCard1('');
          setAlt2('');
          setCard2('');
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
    let x = Array();
    e.map((item:any) => {
      x.push({'label':item.label, 'value': item.label, 'color': item.color});
      setTags(x);
      return 0
    })
    props.handleInputChange(e);
  }

  const onThemeChange = (e:any) => {
    setThemeSwitch(e.value);
    setTheme({value: e.value, label: e.label})
    props.onChangeTheme(e);
  }

  useEffect(() => {
    if(themeSwitch !== ''){
      switch (themeSwitch){
        case 'Chocolate':
          setNodeColor('#a1e346');
          setBackgroundColor('#689b22');
          setTextColor('#73766e')
          break;
        case 'Vanilla':
          setNodeColor('#257488');
          setBackgroundColor('#9bc7d3');
          setTextColor('#1c1c1c')
        break;
      }
    }
  }, [themeSwitch])

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
              <input value={props.currentNodeInfo === 'unsaved' ? undefined : alt1} className="form_field" name="Option" placeholder="Alternativa" type="text" disabled={props.alt1Disabled} onChange={e => setAlt1(e.target.value)} onBlur={e => onAlt1Change(e)}/>
              <label className="form_label">Alternativa</label>
            </div>
            <div className="form_group field">
              <input value={props.currentNodeInfo === 'unsaved' ? undefined : card1} className="form_field" name="Node" placeholder="Nó" type="text" disabled={props.card1Disabled} onChange={e => setCard1(e.target.value)} onBlur={e => onCard1Change(e)} />
              <label className="form_label">Card</label>
            </div>
          </div>
          {/************************************************************************* */}
          <div className="form_row">
            <div className="form_group field"> 
              <input value={props.currentNodeInfo === 'unsaved' ? undefined : alt2} className="form_field" name="Option" placeholder="Alternativa" type="text" disabled={props.alt2Disabled} onChange={e => setAlt2(e.target.value)} onBlur={e => onAlt2Change(e)}/>
              <label className="form_label">Alternativa</label>
            </div>
            <div className="form_group field">
              <input value={props.currentNodeInfo === 'unsaved' ? undefined : card2} className="form_field" name="Node" placeholder="Nó" type="text" disabled={props.card2Disabled} onChange={e => setCard2(e.target.value)} onBlur={e => onCard2Change(e)} />
              <label className="form_label">Card</label>
            </div>
          </div>
          {/************************************************************************* */}
          <div className="form_row">
            <div className="form_group field"> 
              <label className="form_label alone">Tema:</label>  
            </div>
            <div className="form_group field"> 
              <Select
                value={theme.value === undefined ? options[0] : theme}
                options={options}
                formatGroupLabel={formatGroupLabel}
                onChange={(e) => onThemeChange(e)}
              />
            </div>
          </div>
          <div className="form_row">
            <div className="form_group three_cols">
              <p>Node Color:</p>
              <input value={props.currentNodeInfo === 'unsaved' ? undefined : nodeColor} className="color_front" type="color" disabled={true}/>
            </div>
            <div  className="form_group three_cols">
              <p>Text Color:</p>
              <input value={props.currentNodeInfo === 'unsaved' ? undefined : textColor} className="color_front" type="color" disabled={true} />
            </div>
            <div  className="form_group three_cols">
              <p>Background Color:</p>
              <input value={props.currentNodeInfo === 'unsaved' ? undefined : backgroundColor} className="color_front" type="color" disabled={true} />
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
              <input className="inpt_file" type="file" onChange={props.onChangeNodeImage}/>
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