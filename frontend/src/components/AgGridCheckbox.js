import React, { useState, useEffect, useCallback } from "react";

export default function AgGridCheckbox (props) {
  
  
  const boolValue = props.value;
  const [isChecked, setIsChecked] = useState(boolValue);
  
  const onChanged = () => {
    props.setValue(!isChecked);
    setIsChecked(!isChecked);
    const json = JSON.stringify(props.data);
    const httpRequest = new XMLHttpRequest();
    httpRequest.open(
      "PUT",
      "http://localhost:4000/api/updateData",
      true
    );
    httpRequest.setRequestHeader('Content-type','application/json; charset=utf-8');
    httpRequest.send(json);
  };
  return (
    <div>
      <input type="checkbox" className="grid-checkbox" checked={isChecked} onChange={onChanged} />
    </div>
  );
}