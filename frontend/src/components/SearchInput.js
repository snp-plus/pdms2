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
    // console.log("div++++++++++++++++++++++++++")
    return (
      <div className="search-input" onDoubleClick={() => changeState()}>{address}</div>
    )
  } else {
    // console.log("location++++++++++++++++++++++++++")
    return (
      <LocationSearchInput params={props} changeAddress={() => changeAddress()} changeState={() => changeState()} />
    )
  }

}

export default SearchInput;