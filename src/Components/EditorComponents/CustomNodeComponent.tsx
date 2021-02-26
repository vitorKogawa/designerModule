import { Position, Handle, HandleType } from 'react-flow-renderer';
import { handleRight, handleTop, handleLeft, handleBottom } from './Data/data'
import './EditorComponentsStyles/CustomNodeComponent.css';

function CustomNodeComponent({ data }: any){
 
  return (
    <div className="customNodeContainer">
      {handleLeft.map((item: any, index: any) => {
        return <Handle key={index} type={item.type as HandleType} id={item.id} position={Position.Left} style={{ border: 0, background: 'rgba(0,0,0,0.0)', width: 10, height: 10, top: item.position, borderRadius: '50%' }} />
      })}
      {handleTop.map((item: any, index: any) => {
        return <Handle key={index} type={item.type as HandleType} id={item.id} position={Position.Top} style={{ border: 0, background: 'rgba(0,0,0,0.0)', width: 10, height: 10, left: item.position, borderRadius: '50%' }} />
      })}
      {handleRight.map((item: any, index: any) => {
        return <Handle key={index} type={item.type as HandleType} id={item.id} position={Position.Right} style={{ border: 0, background: 'rgba(0,0,0,0.0)', width: 10, height: 10, top: item.position, borderRadius: '50%' }} />
      })}
      {handleBottom.map((item: any, index: any) => {
        return <Handle key={index} type={item.type as HandleType} id={item.id} position={Position.Bottom} style={{ border: 0, background: 'rgba(0,0,0,0.0)', width: 10, height: 10, left: item.position, borderRadius: '50%' }} />
      })}
      <div>
        <label className="title">{data.title ? data.title : 'Cartão sem nome'}</label>
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