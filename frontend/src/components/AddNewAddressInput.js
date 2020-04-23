import React, { useState } from "react";
import { Input } from 'reactstrap';
import GoogleAddress from './GoogleAddress.js';

const SearchInput = (props) => {

  const [divState, setDivState] = useState(true);
  const [address, setInputAddress] = useState("");

  const onChange = () => {

  }

  if(divState) {
    return (
      <div className="search-input"><Input placeholder="Double click to search address" focus="false" onDoubleClick={() => setDivState(!divState)} bsSize="sm" value={address} onChange={onChange } /></div>
    )
  } else {
    return (
      <GoogleAddress setFunc={props} setInputAddress={setInputAddress} changeDivState={() => setDivState(!divState)} />
    )
  }

}

export default SearchInput;