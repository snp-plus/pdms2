import React, { useState } from 'react';
import $ from 'jquery';
import { 
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  Button,
} from 'reactstrap';
import Upload from './upload';
import axios from 'axios';
import { updateData } from '../utils/gridActions';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

const ImportModal = (props) => {
  const {
    isOpen,
    modalToggle,
    parentGridApi,
  } = props;

  const onClickChooseFile = () => {
    setAlert(false);
    $('.txt-input').click();
  }

  const onUpdateDatabase = () => {
    uploadFile('updateDatabase');
    setFile('');
  }

  const onAddToDatabase = () => {
    uploadFile('addToDatabase');
    setFile('');
  }

  const [file, setFile] = useState('');
  const [alert, setAlert] = useState(false);

  const uploadFile = async (url) => {
    const formData = new FormData();
    if(!file.name) return;
    const ext = file.name.split('.').pop();
    if(ext === 'csv' || ext === 'txt') {
      setAlert(false);
      formData.append('file', file);

      try {
        const res = await axios.post(`https://api.snp-plus.com/api/${url}`, formData, {
        // const res = await axios.post(`http://localhost:4000/api/${url}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': localStorage.getItem('token')
          }
        });

        if(res.status === 200) updateData(parentGridApi, res.data);

      } catch(err) {
        console.log(err);
      }
      modalToggle();
    }
    else {
      setAlert(true);
      return;
    }
  }

  return (
    <Modal isOpen={isOpen} toggle={modalToggle} size="lg" className="importModal" >
      <ModalHeader toggle={modalToggle}>Import Data</ModalHeader>
      <ModalBody>
        <Button outline color="secondary" onClick={() => onClickChooseFile()}>Choose File</Button>
        <input type="text" className="choosed_file form-control" value={file.name ? file.name : ''}  placeholder={"Selected file"} disabled/>
        {alert && <div className="alertEXT">You choosed a wrong file.</div>}
      </ModalBody>
      <ModalFooter>
        <Upload setFile={setFile} />
        {' '}
        <Button color="primary" onClick={() => onUpdateDatabase()}>Update Database</Button>{' '}
        <Button color="success" onClick={() => onAddToDatabase()}>Add to Database</Button>{' '}
        <Button color="danger" onClick={modalToggle}>Cancel</Button>        
      </ModalFooter>
    </Modal>
  );
}

export default ImportModal;