import React, { useState } from "react";
import LocationSearchInput from '../components/LocationSearchInput.js';

const SearchInput = (props) => {

  const [state, setState] = useState(true);
  const [address, setAddress] = useState(props.value)

  const changeAddress = (addr) => {
    setAddress(addr);
  }

  const changeState = () => {
    setState(!state);
  } 

  if(state) {
    return (
      <div className="search-input" onDoubleClick={changeState}>{address}</div>
    )
  } else {
    return (
      <LocationSearchInput params={props} changeAddress={changeAddress} changeState={changeState} oldAddress={address} />
    )
  }

}

export default SearchInput;