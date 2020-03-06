import React, { useState } from "react";

const Upload = ({ setFile }) => {  
  const [filename, setFilename] = useState('Choose file');

  const handleUploadFile = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  }

  return (
    <div className="csv-input">
      <input className="txt-input" type="file" onChange={handleUploadFile} />
    </div>
  );
}

export default Upload;