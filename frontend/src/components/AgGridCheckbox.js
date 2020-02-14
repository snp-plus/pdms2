import React, { useState, useEffect, useCallback } from "react";

export default function AgGridCheckbox (props) {
  const boolValue = props.value && props.value.toString() === 'true';
  const [isChecked, setIsChecked] = useState(boolValue);
  const onChanged = () => {
    props.setValue(!isChecked);
    setIsChecked(!isChecked);
  };
  return (
    <div>
      <input type="checkbox" className="grid-checkbox" checked={isChecked} onChange={onChanged} />
    </div>
  );
}