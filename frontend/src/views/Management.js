import React, { useState, useCallback } from "react";
import Loading from "../components/Loading";
import { useAuth0 } from "../react-auth0-spa";
import { AgGridReact } from 'ag-grid-react';
import { ServerSideDatasource, NumericCellEditor, FakeServer } from '../utils/gridFunctions.js';
import { defalutColumnDefs } from '../utils/defalutColumnDefs.js';
import ImportModal from '../components/ImportModal.js';
import { 
  onQuickFilterChanged, 
  onCellEditingStopped, 
  addNewRow, 
  onRemoveSelected,
  onUpdateDatebase,
} from '../utils/gridActions.js';
import { MdLibraryAdd, MdDelete, MdImportExport } from 'react-icons/md';
import {  
  Input, 
  Dropdown, 
  DropdownToggle, 
  DropdownMenu, 
  DropdownItem,
} from 'reactstrap';
import { AllModules } from "@ag-grid-enterprise/all-modules";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import './style.css';

const Management = () => {
  const { loading, user } = useAuth0();

  const [gridApi, setGridApi] = useState();
  const [modules] = useState(AllModules);
  const [cacheBlockSize] = useState(100);
  const [maxBlocksInCache] = useState(10);
  const [rowData] = useState(null);
  const [floatingFilter] = useState(true);
  const [rowSelection] = useState("multiple");
  const [rowModelType] = useState('serverSide');
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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modal, setModal] = useState(false);

  const modalToggle = () => setModal(!modal);
  const toggle = () => setDropdownOpen(prevState => !prevState);

  const onGridReady = useCallback(
    (params) => {
      const { api, columnApi } = params;
      setGridApi({ api, columnApi });

      const updateData = data => {
        var server = new FakeServer(data);
        var datasource = new ServerSideDatasource(server);
        params.api.setServerSideDatasource(datasource);
      }
      const httpRequest = new XMLHttpRequest();
      httpRequest.open(
        "GET",
        "http://localhost:4000/api/getAllData"
      );
      httpRequest.send();
      httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === 4 && httpRequest.status === 200) {
          updateData(JSON.parse(httpRequest.responseText));
        }
      };
    },
    []
  );

  const onExportCSV = () => {
    const params = {
      fileName: 'csv'
    }
    gridApi.api.exportDataAsCsv(params);
  }

  const onImportCSV = () => {
    modalToggle();
  }

  if (loading || !user) {
    return <Loading />;
  }

  return (
    <div className="ag-theme-balham management" >
      <div className="search-area">
        <Dropdown isOpen={dropdownOpen} toggle={toggle} size="sm">
          <DropdownToggle>
            <MdImportExport className="grid-button import_export" />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={() => onImportCSV(gridApi)}>import</DropdownItem>
            <DropdownItem onClick={() => onExportCSV()}>export</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <MdDelete className="grid-button delete_button" onClick={() => onRemoveSelected(gridApi, user)} />
        <MdLibraryAdd className="grid-button add_button" onClick={() => addNewRow(gridApi)} />
        <Input
          className="filterbox global_search"
          type="text"
          onChange={(event) => onQuickFilterChanged(gridApi, event.target.value)}
          id="quickFilter"
          placeholder="global search..."
        />
      </div>
      <AgGridReact
        columnDefs={columnDefs}
        rowData={rowData}
        defaultColDef={defaultColDef}
        defaultColGroupDef={defaultColGroupDef}
        columnTypes={columnTypes}
        floatingFilter={floatingFilter}
        rowSelection={rowSelection}
        rowModelType={rowModelType}
        onGridReady={onGridReady}
        animateRows={true}
        modules={modules}
        cacheBlockSize={cacheBlockSize}
        maxBlocksInCache={maxBlocksInCache}
        onCellEditingStopped={onCellEditingStopped}
        components={components}
      >
      </AgGridReact>
      {
        modal && 
        <ImportModal 
          isOpen={modal}  
          modalToggle={modalToggle} 
          parentGridApi={gridApi}
          onUpdateDatebase={onUpdateDatebase}
        />
      }
    </div>
  );
};

export default Management;