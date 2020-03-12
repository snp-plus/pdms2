import React from "react";

const Upload = ({ setFile }) => {
  const handleUploadFile = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
  }

  return (
    <div className="csv-input">
      <input className="txt-input" type="file" onChange={handleUploadFile} />
    </div>
  );
}

export default Upload;