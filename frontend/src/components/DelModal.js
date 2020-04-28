import React from 'react';
import { 
  Modal,
  ModalHeader, 
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from 'reactstrap';
import { updateData } from '../utils/gridActions';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

const DelModal = (props) => {
  const {
    isOpen,
    delModalToggle,
    parentGridApi,
    delID,
  } = props;

  const onDelete = () => {
    const reason = document.getElementById("del_reason").value;
    const httpRequest = new XMLHttpRequest();
      httpRequest.open(
        "POST",
        // "https://api.snp-plus.com/api/insertDelReason",
        "http://localhost:4000/api/insertDelReason",
        true
      );
      httpRequest.setRequestHeader('Content-type','application/json; charset=utf-8');
      httpRequest.setRequestHeader('Authorization', localStorage.getItem('token'));
      const reqString = JSON.stringify({id: delID, reason: reason});
      httpRequest.send(reqString);
      httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === 4 && httpRequest.status === 200) {
          updateData(parentGridApi, JSON.parse(httpRequest.responseText));
        }
      };
    delModalToggle();
  }

  const onCancel = () => {
    delModalToggle();
  }

  return (
    <Modal isOpen={isOpen} toggle={delModalToggle} size="lg" className="delModal" >
      <ModalHeader toggle={delModalToggle}>Why do you delete?</ModalHeader>
      <ModalBody>
        <Input type="textarea" name="text" id="del_reason" />
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={onDelete}>Delete</Button>{' '}
        <Button color="secondary" onClick={onCancel}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
}

export default DelModal;