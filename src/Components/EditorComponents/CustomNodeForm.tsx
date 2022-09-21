import { Position, Handle } from 'react-flow-renderer';
import './EditorComponentsStyles/CustomNodeComponent.css';
import Select from 'react-select';
import { useEffect, useState } from 'react';
import PublicModal from './PublicModal';
import { api_url } from '../../public/variables';

function CustomNodeComponent({ data }: any){

    const [formType, setFormType] = useState({value: '', label: ''});
    const [title, setTitle] = useState("");
    const [card, setCard] = useState("");
    const [currentID, setCurrentID] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [update, setUpdate] = useState(0);
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const onRequestClose = () => {
      setOpenModal(false);
    }

    const handleClick = () => {
      setUpdate(update => update = update+1);
      onRequestClose();
    }

    const onNameChange = (e:any) => {
      setTitle(e.target.value)
    }
    
    const onCardChange = (e: any) => {
      setCard(e.target.value)
    }

    const apiEditFormNode = async (name:string, targetID:string, currentID:string) => {
      try{
        await fetch(`${api_url}node/edit/${currentID}`, {
          method: 'PUT',
          headers: {
            "Access-Control-Allow-Origin" : "*", 
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
            name: name
          })
        })
        data.onFormSaveClick()
      } catch(err){
          console.log("erro ao criar card: "+err)
      }
    }

    const apiEditNextNodes = async (targetID:string, currentID:string) => {
      await fetch(`${api_url}node/edit/nextnodes/${currentID}`, {
        method: 'PUT',
        headers: {
          "Access-Control-Allow-Origin" : "*", 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          nextNodes: Array({id:targetID, choice:""})
        })
      });
    }

    const getNodes = async () => {
      const gamesResult = await fetch(api_url+'game/'+urlParams.get('game'), {
        method: 'GET',
        headers: {
          "Access-Control-Allow-Origin" : "*", 
          'Content-Type': 'application/json'
        }
      });

      return gamesResult;
    }

    const getLastConnection = async (id:any) => {
      const gamesResult = await fetch(api_url+'connection/current/'+id, {
        method: 'GET',
        headers: {
          "Access-Control-Allow-Origin" : "*", 
          'Content-Type': 'application/json'
        }
      });
      return await gamesResult.json();
    }

    useEffect(() => { 
      async function createNextNodes(){
        const gamesResult = await getNodes();
        const elements = await gamesResult.json();
        let cID = "";
        let tID = "";
        let count = 0;
        console.log(elements.game.nodes)
          if(card !== ''){
            elements.game.nodes.forEach((element: any) => {
              if(element._id.search('react') === -1){
                console.log(element.name+" == "+data.title)
                if(element.name === data.title){
                  cID = element._id;
                  setCurrentID(element._id);
                }
                if(element.name === card){
                  count = 1;
                  tID = element._id;
                }
              }
            });
          }
          apiEditFormNode(title, tID, data.id);
          if(card !== ""){
            if(count === 1)
              createConn(data.id, tID);
            else{
              data.createNodeConnectionForm(card)
              setTimeout(async () => {
              const lastConnTarget = await getLastConnection(data.id)
              apiEditNextNodes(lastConnTarget.nodeLastConnection[0].target, data.id)
              data.onFormSaveClick()
              }, 5000)
            }
          }
      }
      if(update > 0)
        createNextNodes();
    },[update])

    const createConn = async (cID: string, tID:string) => {
      apiEditNextNodes(tID, cID);     
        await fetch(api_url+'connection/create', {
          method: 'POST',
          headers: {
            "Access-Control-Allow-Origin" : "*", 
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
            _id: 'react' + cID + '-' + tID, 
            source: cID,
            target: tID,
            gameId: urlParams.get('game')
          })
        });
    }

    const formatGroupLabel = (data:any) => (
        <div style={groupStyles}>
          <span>{data.label}</span>
          <span style={groupBadgeStyles}>{data.options.length}</span>
        </div>
      );
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
      
  const onFormTypeChange = (e:any) => {
    setFormType({value: e.value, label: e.label})
  }

  useEffect(() => {
    // getForms();
    setTitle(data.title)
  //  updateNodeForm()
  }, [])

  const getForms = async () => {
    const connectionsResult = await fetch('https://analyticsmodule-papiroproject.herokuapp.com/questionnaires/templates/GUESS-18/LDhkmZP2tkXBTmrB4TNjKQQtXftJBJT337YZVumerK4ensx6Z4afxLy3kuQPJZGFEqW7jnLNYJFYKefbWUhp24MtzGa5T2fDg3Nvnp3DfPXhc27cW7kXZQ3SpJ2XGMxv', {
      method: 'GET',
      headers: {
        "Access-Control-Allow-Origin" : "*", 
        'Content-Type': 'application/json'
      }
    });
  
    return connectionsResult;
  }

  const updateNodeForm = async () => {
    const formulario = await getForms();
    const formularioJson = await formulario.json().toString();
    await fetch(`${api_url}node/edit/form/${data.id}`, {
      method: 'PUT',
      headers: {
        "Access-Control-Allow-Origin" : "*"
      },
      body: JSON.stringify({ 
        form: [{'result':true, 'count':42}, {'result':false, 'count':62}]
      })
    });
  }

  return (
    <div className="customNodeContainer">
        <Handle type='target' id='a' position={Position.Left} style={{border: 0, background: 'rgba(0,0,0,0.0)', width: 10, height: 10, borderRadius: '50%' }} />
        <Handle type='source' id='b' position={Position.Right} style={{border: 0, background: 'rgba(0,0,0,0.0)', width: 10, height: 10, top: '40%', borderRadius: '50%' }} />
        <Handle type='source' id='c' position={Position.Right} style={{border: 0, background: 'rgba(0,0,0,0.0)', width: 10, height: 10, top: '60%', borderRadius: '50%' }} />
        <div className="body_container">
            <label className="title">{data.title ? data.title : 'Cartão Sem Nome'}</label>
            <Select
                value={formType.value === undefined ? options[0] : formType}
                options={options}
                formatGroupLabel={formatGroupLabel}
                onChange={(e) => onFormTypeChange(e)}
              />
        </div>
        <div className="edit_container">
        <div className="edit_button" onClick={() => {setOpenModal(true)}}>
          <span>editar</span>
        </div> 
      </div> 
      <PublicModal openModal={openModal} closeModal={onRequestClose}>
 
        <div className="form_row">
          <div className="form_group field">
            <input className="form_field" value={title} name="title" placeholder="Title" type="text" onChange={e => onNameChange(e)}/>
            <label className="form_label" >Título</label>
          </div>
          <div className="form_group field">
            <input className="form_field" name="Node" placeholder="Nó" type="text" onChange={e => onCardChange(e)}/>
            <label className="form_label">Próximo Card</label>
          </div>
        </div>
        <div className="form_buttons">
          <span className="cancel" onClick={onRequestClose}>Cancelar</span> 
          <span className="button_style" onClick={handleClick}>Salvar</span> 
        </div>
      </PublicModal>     
    </div>
  );
};

export default CustomNodeComponent;