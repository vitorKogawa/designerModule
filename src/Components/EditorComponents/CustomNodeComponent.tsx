import { Position, Handle, HandleType } from 'react-flow-renderer';
import { handleRight, handleTop, handleLeft, handleBottom } from './Data/data'
import './EditorComponentsStyles/CustomNodeComponent.css';

function CustomNodeComponent({ data }: any){
 
  return (
    <div className="customNodeContainer">
        <Handle type='target' id='a' position={Position.Left} style={{border: 0, background: 'rgba(0,0,0,0.0)', width: 10, height: 10, borderRadius: '50%' }} />
        <Handle type='source' id='b' position={Position.Right} style={{border: 0, background: 'rgba(0,0,0,0.0)', width: 10, height: 10, top: '40%', borderRadius: '50%' }} />
        <Handle type='source' id='c' position={Position.Right} style={{border: 0, background: 'rgba(0,0,0,0.0)', width: 10, height: 10, top: '60%', borderRadius: '50%' }} />
      <div>
        <label className="title">{data.title? data.title : 'Cartão sem nome'}</label>
        <p className="description">{data.history ? data.history : 'Descrição do cartão - clique em editar.'}</p>
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