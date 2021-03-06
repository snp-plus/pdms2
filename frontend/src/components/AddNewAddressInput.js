import React, { useState } from "react";
import { Input } from 'reactstrap';
import GoogleAddress from './GoogleAddress.js';

const AddNewAddressInput = (props) => {
  const {divState, setDivState} = props;
  const [address, setInputAddress] = useState("");

  const onChange = () => {
  }

  if(divState) {
    return (
      <div className="search-input"><Input placeholder="Double click to search address" focus="false" onDoubleClick={() => setDivState(!divState)} bsSize="sm" value={props.address} /></div>
    )
  } else {
    return (
      <GoogleAddress setFunc={props} setInputAddress={setInputAddress} changeDivState={() => setDivState(!divState)} />
    )
  }
}

export default AddNewAddressInput;