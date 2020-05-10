import React, { useState } from "react";
import { dev_url } from '../utils/url';

export default function AgGridCheckbox (props) {  
  const boolValue = props.value;
  const [isChecked, setIsChecked] = useState(boolValue);

  const onChanged = () => {
    props.setValue(!isChecked);
    setIsChecked(!isChecked);
    const json = JSON.stringify(props.data);

    if(props.colName === 'deleted' && props.data.deleted === true) {
      props.setDelID(props.data.id);
      props.delModalToggle();
    } else {
      const httpRequest = new XMLHttpRequest();
      httpRequest.open(
        "PUT",
        `${dev_url}/api/updateData`,
        true
      );
      httpRequest.setRequestHeader('Content-type','application/json; charset=utf-8');
      httpRequest.setRequestHeader('Authorization', localStorage.getItem('token'));
      httpRequest.send(json);
    }
  };

  return (
    <div>
      <input 
        type="checkbox" 
        className={props.colName==='deleted' ? "delete-grid-checkbox" : "grid-checkbox" } 
        checked={isChecked} 
        onChange={onChanged} 
      />
    </div>
  );
}