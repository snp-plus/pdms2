import React, { useState, useCallback } from 'react';
import $ from 'jquery';
import { 
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  Button
} from 'reactstrap';
import { defalutColumnDefs } from '../utils/defalutColumnDefs.js';
import CSVReader from "react-csv-reader";
import Upload from './upload';
import axios from 'axios';
import { updateData } from '../utils/gridActions';
import { AgGridReact } from 'ag-grid-react';
import { NumericCellEditor } from '../utils/gridFunctions.js';
import { AllCommunityModules } from "@ag-grid-community/all-modules";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

const ImportModal = (props) => {
  const {
    isOpen,
    modalToggle,
    parentGridApi,
    onUpdateDatebase,
  } = props;

  const [gridApi, setGridApi] = useState();
  
  const [modules] = useState(AllCommunityModules);
  const [cacheBlockSize] = useState(80);
  const [maxBlocksInCache] = useState(10);
  const [rowData, setRowData] = useState(null);
  const [floatingFilter] = useState(true);
  const [rowSelection] = useState("multiple");
  
  const [components] = useState({ numericCellEditor: NumericCellEditor, });
  const [columnDefs] = useState(defalutColumnDefs);
  const [defaultColDef] = useState({
    editable: true,
    filter: 'agTextColumnFilter',
    resizable: true,
    sortable: true,
    width: 100,
    height: 100,
    undoRedoCellEditing: true,
    undoRedoCellEditingLimit: 20, 
  });
  const [defaultColGroupDef] = useState({marryChildren: true});
  const [columnTypes] = useState({
    numberColumn: {width: 83, filter: 'agNumberColumnFilter'},    
    nonEditableColumn: {editable: false},
  });

  const onGridReady = useCallback(
    params => {
      const { api, columnApi } = params;
      setGridApi({ api, columnApi });
    },
    []
  );

  const handleForce = data => {
    const importRowData = [];

    data.shift();
    data.pop();

    data.map(row => {
      const node = {};
      defalutColumnDefs.map((field, index) => {
        if(row[index] === 'true') row[index] = 1;
        if(row[index] === 'false') row[index] = 0;
        node[field.field] = row[index];
        return 0;
      })
      importRowData.push(node);
      return 0;
    })
    setRowData(importRowData);
    gridApi.api.updateRowData({ add: [importRowData] });
  };

  const onClickChooseFile = () => {
    $('.txt-input').click();
  }

  // const onUpdateDatabase = () => {
  //   onUpdateDatebase(parentGridApi, rowData, true);
  //   modalToggle();
  // }

  // const onAddToDatabase = () => {
  //   onUpdateDatebase(parentGridApi, rowData, false);
  //   modalToggle();
  // }

  const onUpdateDatabase = () => {
    uploadFile('updateDatabase');
    modalToggle();
  }

  const onAddToDatabase = () => {
    uploadFile('addToDatabase');
    modalToggle();
  }

  const [file, setFile] = useState('');

  const uploadFile = async (url) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post(`http://localhost:4000/api/${url}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log("res", res)

      if(res.status === 200) updateData(gridApi, res.data);

    } catch(err) {
      console.log(err);
    }

    // const httpRequest = new XMLHttpRequest();
    // httpRequest.open(
    //   "POST",
    //   `http://localhost:4000/api/${url}`,
    //   true
    // );
    // console.log("file", formData)
    // httpRequest.setRequestHeader("Content-Type","multipart/form-data");
    // httpRequest.send(formData);
    // httpRequest.onreadystatechange = () => {
    //   if (httpRequest.readyState === 4 && httpRequest.status === 200) {
    //     // updateData(JSON.parse(httpRequest.responseText));
    //   }
    // };
  }

  return (
    <Modal isOpen={isOpen} toggle={modalToggle} size="lg" className="importModal" >
      <ModalHeader toggle={modalToggle}>Import Data</ModalHeader>
      <ModalBody>
        {/* <div className="ag-theme-balham modal-management" >
          <AgGridReact
            columnDefs={columnDefs}
            rowData={rowData}
            defaultColDef={defaultColDef}
            defaultColGroupDef={defaultColGroupDef}
            columnTypes={columnTypes}
            floatingFilter={floatingFilter}
            rowSelection={rowSelection}
            animateRows={true}
            modules={modules}
            cacheBlockSize={cacheBlockSize}
            maxBlocksInCache={maxBlocksInCache}
            components={components}
            onGridReady={onGridReady}
          >
          </AgGridReact>
        </div> */}
        <Button color="primary" onClick={() => onClickChooseFile()}>Choose File</Button>
        <div>{"sdfsdfsfsdf.txt"}</div>
      </ModalBody>
      <ModalFooter>
        {/* <CSVReader
          cssClass="react-csv-input"
          onFileLoaded={handleForce}
        /> */}
        <Upload setFile={setFile} />
        {' '}
        <Button color="primary" onClick={() => onUpdateDatabase()}>Update Database</Button>{' '}
        <Button color="primary" onClick={() => onAddToDatabase()}>Add to Database</Button>{' '}
        <Button color="primary" onClick={modalToggle}>Cancel</Button>
        
      </ModalFooter>
    </Modal>
  );
}

export default ImportModal;