import { Position, Handle } from 'react-flow-renderer';
import './EditorComponentsStyles/CustomNodeComponent.css';
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import Select from 'react-select';
import { useEffect, useState } from 'react';

function CustomNodeComponent({ data }: any){

    const [formType, setFormType] = useState({value: '', label: ''});

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
    getForms();
  }, [])

  const getForms = async () => {
    const connectionsResult = await fetch('https://analyticsmodule-papiroproject.herokuapp.com/questionnaires/templates/GUESS-18/LDhkmZP2tkXBTmrB4TNjKQQtXftJBJT337YZVumerK4ensx6Z4afxLy3kuQPJZGFEqW7jnLNYJFYKefbWUhp24MtzGa5T2fDg3Nvnp3DfPXhc27cW7kXZQ3SpJ2XGMxv', {
      method: 'GET',
      headers: {
        "Access-Control-Allow-Origin" : "*", 
        'Content-Type': 'application/json'
      }
    });
    console.log('AAAa: ',connectionsResult.json());
    return connectionsResult;
  }

  return (
    <div className="customNodeContainer">
        <Handle type='target' id='a' position={Position.Left} style={{border: 0, background: 'rgba(0,0,0,0.0)', width: 10, height: 10, borderRadius: '50%' }} />
        <Handle type='source' id='b' position={Position.Right} style={{border: 0, background: 'rgba(0,0,0,0.0)', width: 10, height: 10, top: '40%', borderRadius: '50%' }} />
        <Handle type='source' id='c' position={Position.Right} style={{border: 0, background: 'rgba(0,0,0,0.0)', width: 10, height: 10, top: '60%', borderRadius: '50%' }} />
        <div className="body_container">
            <label className="title">{data.title? data.title : 'Cartão sem nome'}</label>
            <Select
                value={formType.value === undefined ? options[0] : formType}
                options={options}
                formatGroupLabel={formatGroupLabel}
                onChange={(e) => onFormTypeChange(e)}
              />
        </div>
        <div className="edit_container">
            <div className="edit_button" onClick={data.onEditClick}>
                <span>editar</span>
            </div> 
        </div>
      
    </div>
  );
};

export default CustomNodeComponent;