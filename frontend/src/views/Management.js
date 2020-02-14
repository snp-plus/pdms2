import React, { useState, useEffect, useCallback } from "react";
import Loading from "../components/Loading";
import { useAuth0 } from "../react-auth0-spa";
import { AgGridReact } from 'ag-grid-react';
import { AllModules } from "@ag-grid-enterprise/all-modules";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import './style.css';
import data from './data.json';
import LocationSearchInput from '../components/LocationSearchInput.js';
import { createNewRowData, printResult, createMyDataSource, FakeServer, ServerSideDatasource } from '../utils/gridFunctions.js';
import AgGridCheckbox from '../components/AgGridCheckbox.js';

const Management = () => {
  const { loading, user } = useAuth0();

  const [gridApi, setGridApi] = useState();
  const [modules, setModules] = useState(AllModules);
  const [cacheBlockSize, setCacheBlockSize] = useState(100);
  const [maxBlocksInCache, setMaxBlocksInCache] = useState(10);

  const onGridReady = useCallback(
    (params) => {
      const { api, columnApi } = params;
      setGridApi({ api, columnApi });

      const httpRequest = new XMLHttpRequest();
      const updateData = data => {
        const datasource = createMyDataSource(data);
        params.api.setServerSideDatasource(datasource);
      };

      httpRequest.open(
        "GET",
        "http://localhost:4000/api/getAllData"
      );
      httpRequest.send();
      httpRequest.onreadystatechange = () => {
        console.log(httpRequest.responseText)
        if (httpRequest.readyState === 4 && httpRequest.status === 200) {
          console.log("update area")
          updateData(JSON.parse(httpRequest.responseText));
        }
      };
    },
    []
  );

  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: 'id', 
      field: 'id', 
      suppressSizeToFit: true, 
      width: 50, 
      filter: false,
      editable: false,
    },
    {headerName: 'first', field: 'first'},
    {headerName: 'last', field: 'last'},
    {
      headerName: 'degree', 
      field: 'degree',
      cellEditor: "agPopupSelectCellEditor",
      // cellRendererFramework: DegreeRenderer,
      cellEditorParams: {
        values: ["bachelor", "doctor"],
      }
    },
    {headerName: 'entity', field: 'entity'},
    {
      headerName: 'specialty', 
      field: 'specialty',
      cellEditor: "agPopupSelectCellEditor",
      cellEditorParams: {
        values: ["bachelor", "doctor"],
      }
    },
    {headerName: 'dwc', field: 'dwc'},
    {
      headerName: 'code', 
      field: 'code',
      cellEditor: "agPopupSelectCellEditor",
      cellEditorParams: {
        values: ["bachelor", "doctor"],
      }
    },
    {
      headerName: 'address', 
      field: 'address', 
      cellEditor: LocationSearchInput, 
      cellRendererFramework: LocationSearchInput,
      editable: false,
      width: 150,
    },
    {headerName: 'suite', field: 'suite'},
    {headerName: 'city', field: 'city'},
    {headerName: 'state', field: 'state'},
    {headerName: 'zip', field: 'zip'},
    {headerName: 'phone', field: 'phone'},
    {headerName: 'fax', field: 'fax'},
    {headerName: 'latitude', field: 'latitude'},
    {headerName: 'longitude', field: 'longitude'},
    {headerName: 'taxid', field: 'taxid'},
    {headerName: 'statelicensenumber', field: 'statelicensenumber'},
    {headerName: 'country', field: 'country'},
    {headerName: 'workinghrs', field: 'workinghrs'},
    {headerName: 'priority', field: 'priority'},
    {headerName: 'referral', field: 'referral'},
    {
      headerName: 'mpn0589',
      field: 'mpn0589', 
      editable: true,
      cellRendererFramework: AgGridCheckbox,
    },
    {
      headerName: 'mpn0701', 
      field: 'mpn0701', 
      editable: true,
      cellRendererFramework: AgGridCheckbox,
    },
    {
      headerName: 'mpn1203', 
      field: 'mpn1203', 
      editable: true,
      cellRendererFramework: AgGridCheckbox,
    },
    {
      headerName: 'mpn2079', 
      field: 'mpn2079', 
      editable: true,
      cellRendererFramework: AgGridCheckbox,
    },
    {
      headerName: 'mpn2125', 
      field: 'mpn2125', 
      editable: true,
      cellRendererFramework: AgGridCheckbox,
    },
    {
      headerName: 'mpn2126', 
      field: 'mpn2126', 
      editable: true,
      cellRendererFramework: AgGridCheckbox,
    },
    {
      headerName: 'mpn2128', 
      field: 'mpn2128', 
      editable: true,
      cellRendererFramework: AgGridCheckbox,
    },
    {
      headerName: 'mpn2347', 
      field: 'mpn2347', 
      editable: true,
      cellRendererFramework: AgGridCheckbox,
    },
    {
      headerName: 'mpn2376', 
      field: 'mpn2376', 
      editable: true,
      cellRendererFramework: AgGridCheckbox,
    },
    {
      headerName: 'mpn2394', 
      field: 'mpn2394', 
      editable: true,
      cellRendererFramework: AgGridCheckbox,
    },
    {
      headerName: 'mpn2451', 
      field: 'mpn2451', 
      editable: true,
      cellRendererFramework: AgGridCheckbox,
    },
    {
      headerName: 'mpn2452', 
      field: 'mpn2452', 
      editable: true,
      cellRendererFramework: AgGridCheckbox,
    },
    {
      headerName: 'mpn3091', 
      field: 'mpn3091', 
      editable: true,
      cellRendererFramework: AgGridCheckbox,
    },
    {
      headerName: 'mpn3095', 
      field: 'mpn3095', 
      editable: true,
      cellRendererFramework: AgGridCheckbox,
    },
    {
      headerName: 'mpn3096', 
      field: 'mpn3096', 
      editable: true,
      cellRendererFramework: AgGridCheckbox,
    },
    {
      headerName: 'mpn3097', 
      field: 'mpn3097', 
      editable: true,
      cellRendererFramework: AgGridCheckbox,
    },
    {
      headerName: 'deleted', 
      field: 'deleted', 
      editable: true,
      cellRendererFramework: AgGridCheckbox,
    },
    {
      headerName: 'created', 
      field: 'created'
    },
    {
      headerName: 'delete_date', 
      field: 'delete_date'
    },
    {
      headerName: 'deleted_by', 
      field: 'deleted_by'
    },
    {
      headerName: 'newid', 
      field: 'newid'
    },
  ]);

  const [defaultColDef, setDefaultColDef] = useState({
    editable: true,
    filter: 'agTextColumnFilter',
    resizable: true,
    sortable: true,
    width: 100,
    undoRedoCellEditing: true,
    undoRedoCellEditingLimit: 20
  })

  const [defaultColGroupDef, setDefaultColGroupDef] = useState({marryChildren: true});

  const [columnTypes, setColumnTypes] = useState({
    numberColumn: {width: 83, filter: 'agNumberColumnFilter'},
    medalColumn: {width: 100, columnGroupShow: 'open', filter: false},
    nonEditableColumn: {editable: false},
    dateColumn: {
      filter: 'agDateColumnFilter',
      filterParams: {
        comparator: function(filterLocalDateAtMidnight, cellValue) {
          var dateParts = cellValue.split('/');
          var day = Number(dateParts[0]);
          var month = Number(dateParts[1]) - 1;
          var year = Number(dateParts[2]);
          var cellDate = new Date(year, month, day);

          if(cellDate < filterLocalDateAtMidnight) {
            return -1;
          } else if(cellDate > filterLocalDateAtMidnight) {
            return 1;
          } else {
            return 0;
          }
        }
      }
    }
  })

  const [rowData, setRowData] = useState(null);
  const [floatingFilter, setFloatingFilter] = useState(true);
  const [rowSelection, setRowSelection] = useState("multiple");
  const [rowModelType, setRowModelType] = useState('serverSide');

  if (loading || !user) {
    return <Loading />;
  }


  const onQuickFilterChanged = () => {
    console.log("gridAPI1", gridApi)
    gridApi.api.setQuickFilter(document.getElementById("quickFilter").value);
  }

  const onRowEditingStarted = (event) => {
    console.log("onROwEditing Started", event)
  }

  const onRowEditingStopped = (event) => {
    console.log("onROwEditing STopted*****", event)
  }

  const onCellEditingStarted = (event) => {
    console.log("onCellEditing Started", event)
  }

  const onCellEditingStopped = (event) => {
    console.log("onCellEditing Stopped", event)
    const json = JSON.stringify(event.data);

    const httpRequest = new XMLHttpRequest();

    httpRequest.open(
      "PUT",
      "http://localhost:4000/api/updateData",
      true
    );
    httpRequest.setRequestHeader('Content-type','application/json; charset=utf-8');
    httpRequest.send(json);
  }

  const addNewRow = () => {
    const position = window.rowDataServerSide.length;
    window.rowDataServerSide.splice(position, 0, { id: position + 1 }); //should change first parameter
    gridApi.api.purgeServerSideCache();
  }

  const onRemoveSelected = () => {
    var selectedRows = gridApi.api.getSelectedRows();
    if(!selectedRows || selectedRows.length === 0) return;
    console.log("selectedRows", selectedRows, window.rowDataServerSide)
    const selectedRowStart = selectedRows[0];
    const selectedLength = selectedRows.length;
    console.log("+++++", selectedRowStart, selectedLength)
    window.rowDataServerSide.splice(selectedRowStart.rowIndex, selectedLength);
    gridApi.api.purgeServerSideCache();
  }

  return (
    <div className="ag-theme-balham management" >
      <div className="search-area">
        <button className="deletebutton" onClick={() => onRemoveSelected()}>Remove Row</button> 
        <button className="addbutton" onClick={() => addNewRow()}>Add Row</button>
        <input
          className="filterbox"
          type="text"
          onInput={() => onQuickFilterChanged()}
          id="quickFilter"
          placeholder="quick filter..."
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
        onRowEditingStarted={onRowEditingStarted}
        onRowEditingStopped={onRowEditingStopped}
        onCellEditingStarted={onCellEditingStarted}
        onCellEditingStopped={onCellEditingStopped}
      >
      </AgGridReact>
    </div>
  );
};

export default Management;


