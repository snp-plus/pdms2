import React, { useState, useEffect, useCallback } from "react";
import Loading from "../components/Loading";
import { useAuth0 } from "../react-auth0-spa";
import { AgGridReact } from 'ag-grid-react';
import { AllModules } from "@ag-grid-enterprise/all-modules";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import './style.css';
import data from './data.json';
import SearchInput from '../components/SearchInput.js';
import { createNewRowData, printResult, createMyDataSource, ServerSideDatasource, getDatePicker, NumericCellEditor, FakeServer } from '../utils/gridFunctions.js';
import AgGridCheckbox from '../components/AgGridCheckbox.js';
// import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";

const Management = () => {
  const { loading, user } = useAuth0();

  const [gridApi, setGridApi] = useState();
  const [modules, setModules] = useState(AllModules);
  const [cacheBlockSize, setCacheBlockSize] = useState(100);
  const [maxBlocksInCache, setMaxBlocksInCache] = useState(10);
  const [rowData, setRowData] = useState(null);
  const [floatingFilter, setFloatingFilter] = useState(true);
  const [rowSelection, setRowSelection] = useState("multiple");
  const [rowModelType, setRowModelType] = useState('serverSide');
  const [components, setComponent] = useState({ numericCellEditor: NumericCellEditor, });

  const  onGridReady = useCallback(
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

  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: 'id', 
      field: 'id', 
      suppressSizeToFit: true, 
      width: 60, 
      filter: false,
      // editable: false,
    },
    {headerName: 'first', field: 'first'},
    {headerName: 'last', field: 'last'},
    {
      headerName: 'degree', 
      field: 'degree',
      cellEditor: "agPopupSelectCellEditor",
      // cellRendererFramework: DegreeRenderer,
      cellEditorParams: {
        values: ["DPM", "MD", "PHD", "PT", "DO", "LAC"],
      }
    },
    {headerName: 'entity', field: 'entity'},
    {
      headerName: 'specialty', 
      field: 'specialty',
      cellEditor: "agPopupSelectCellEditor",
      width: 250,
      cellEditorParams: {
        values: [
          "PRIMARY TREATING PHYSICIAN",
          "ORTHOPEDICS",
          "ORTHOPEDIC",
          "SPINE SURGERY",
          "NEUROLOGY",
          "HAND SURGERY",
          "PODIATRY",
          "OCCUPATIONAL HEALTH CENTER",
          "PODIATRIC SURGERY",
          "PHYSICAL THERAPY",
          "ORTHOPEDIC SURGERY",
          "OCCUPATIONAL MEDICINE",
          "MENTAL HEALTH",
          "ACUPUNCTURE",
          "PSYCHOLOGY"
        ],
      }
    },
    {
      headerName: 'dwc', 
      field: 'dwc',
      width: 150,
    },
    {
      headerName: 'code', 
      field: 'code',
      cellEditor: "agPopupSelectCellEditor",
      cellEditorParams: {
        values: [
          "MISC", 
          "ANC",
          "OCCM",
          "LAC",
          "PTP",
          "ORTHO",
          "ORTHO",
          "ANC15",
          "DC",
          "PMR",
        ],
      }
    },
    {
      headerName: 'address', 
      field: 'address', 
      // cellEditor: LocationSearchInput, 
      cellRendererFramework: SearchInput,
      editable: false,
      width: 250,
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
    {headerName: 'county', field: 'county'},
    {headerName: 'workinghrs', field: 'workinghrs'},
    {headerName: 'priority', field: 'priority'},
    {headerName: 'referral', field: 'referral'},
    {
      headerName: 'mpn0589',
      field: 'mpn0589', 
      editable: false,
      filter: false,
      cellRendererFramework: AgGridCheckbox,
      cellRendererParams: {
        colName: 'mpn0589',
      },
    },
    {
      headerName: 'mpn0701', 
      field: 'mpn0701', 
      editable: false,
      filter: false,
      cellRendererFramework: AgGridCheckbox,
      cellRendererParams: {
        colName: 'mpn0701',
      },
    },
    {
      headerName: 'mpn1203', 
      field: 'mpn1203', 
      editable: false,
      filter: false,
      cellRendererFramework: AgGridCheckbox,
      cellRendererParams: {
        colName: 'mpn1203',
      },
    },
    {
      headerName: 'mpn2079', 
      field: 'mpn2079', 
      editable: false,
      filter: false,
      cellRendererFramework: AgGridCheckbox,
      cellRendererParams: {
        colName: 'mpn2079',
      },
    },
    {
      headerName: 'mpn2125', 
      field: 'mpn2125', 
      editable: false,
      filter: false,
      cellRendererFramework: AgGridCheckbox,
      cellRendererParams: {
        colName: 'mpn2125',
      },
    },
    {
      headerName: 'mpn2126', 
      field: 'mpn2126', 
      editable: false,
      filter: false,
      cellRendererFramework: AgGridCheckbox,
      cellRendererParams: {
        colName: 'mpn2126',
      },
    },
    {
      headerName: 'mpn2128', 
      field: 'mpn2128', 
      editable: false,
      filter: false,
      cellRendererFramework: AgGridCheckbox,
      cellRendererParams: {
        colName: 'mpn2128',
      },
    },
    {
      headerName: 'mpn2347', 
      field: 'mpn2347', 
      editable: false,
      filter: false,
      cellRendererFramework: AgGridCheckbox,
      cellRendererParams: {
        colName: 'mpn2347',
      },
    },
    {
      headerName: 'mpn2376', 
      field: 'mpn2376', 
      editable: false,
      filter: false,
      cellRendererFramework: AgGridCheckbox,
      cellRendererParams: {
        colName: 'mpn2376',
      },
    },
    {
      headerName: 'mpn2394', 
      field: 'mpn2394', 
      editable: false,
      filter: false,
      cellRendererFramework: AgGridCheckbox,
      cellRendererParams: {
        colName: 'mpn2394',
      },
    },
    {
      headerName: 'mpn2451', 
      field: 'mpn2451', 
      editable: false,
      filter: false,
      cellRendererFramework: AgGridCheckbox,
      cellRendererParams: {
        colName: 'mpn2451',
      },
    },
    {
      headerName: 'mpn2452', 
      field: 'mpn2452', 
      editable: false,
      filter: false,
      cellRendererFramework: AgGridCheckbox,
      cellRendererParams: {
        colName: 'mpn2452',
      },
    },
    {
      headerName: 'mpn3091', 
      field: 'mpn3091', 
      editable: false,
      filter: false,
      cellRendererFramework: AgGridCheckbox,
      cellRendererParams: {
        colName: 'mpn3091',
      },
    },
    {
      headerName: 'mpn3095', 
      field: 'mpn3095', 
      editable: false,
      filter: false,
      cellRendererFramework: AgGridCheckbox,
      cellRendererParams: {
        colName: 'mpn3095',
      },
    },
    {
      headerName: 'mpn3096', 
      field: 'mpn3096', 
      editable: false,
      filter: false,
      cellRendererFramework: AgGridCheckbox,
      cellRendererParams: {
        colName: 'mpn3096',
      },
    },
    {
      headerName: 'mpn3097', 
      field: 'mpn3097', 
      editable: false,
      filter: false,
      cellRendererFramework: AgGridCheckbox,
      cellRendererParams: {
        colName: 'mpn3097',
      },
    },
    {
      headerName: 'deleted', 
      field: 'deleted', 
      editable: false,
      filter: false,
      cellRendererFramework: AgGridCheckbox,
      cellRendererParams: {
        colName: 'deleted',
      },
    },
    {
      headerName: 'created', 
      field: 'created',
      editable: false,
      filter: false,
      width: 200,
    },
    // {
    //   headerName: 'deleted_date', 
    //   field: 'deleted_date',
    //   editable: false,
    //   width: 200,
    // },
    // {
    //   headerName: 'deleted_by', 
    //   field: 'deleted_by'
    // },
    {
      headerName: 'newid', 
      field: 'newid',
      editable: true,
      // cellEditor: "numericCellEditor",
    },
  ]);

  const [defaultColDef, setDefaultColDef] = useState({
    editable: true,
    filter: 'agTextColumnFilter',
    resizable: true,
    sortable: true,
    width: 100,
    height: 100,
    undoRedoCellEditing: true,
    undoRedoCellEditingLimit: 20,
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

  if (loading || !user) {
    return <Loading />;
  }


  const onQuickFilterChanged = () => {
    gridApi.api.setQuickFilter(document.getElementById("quickFilter").value);
  }



  const onCellEditingStopped = (event) => {
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

  const getAllData = () => {
    let rowData = [];
    gridApi.api.forEachNode(node => rowData.push(node.data));
    return rowData;
  }

  const addNewRow = () => {
    const allData = getAllData();
    console.log("alldata", allData);
    const position = allData.length;
    allData.splice(position, 0, { id: position + 1 });
    const updateData = data => {
      var server = new FakeServer(data);
      var datasource = new ServerSideDatasource(server);
      gridApi.api.setServerSideDatasource(datasource);
    }
    const httpRequest = new XMLHttpRequest();
    httpRequest.open(
      "POST",
      "http://localhost:4000/api/addNewData",
      true
    );
    httpRequest.setRequestHeader('Content-type','application/json; charset=utf-8');
    httpRequest.send();
    httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        updateData(JSON.parse(httpRequest.responseText));
      }
    };
    // gridApi.api.purgeServerSideCache();
  }

  const onRemoveSelected = () => {
    const allData = getAllData()
    var selectedRows = gridApi.api.getSelectedRows();
    if(!selectedRows || selectedRows.length === 0) return;
    const selectedRowStart = selectedRows[0];
    const selectedLength = selectedRows.length;
    let ids = [];
    selectedRows.map((value) => {
      value.user = user.name
      ids.push(value);
    })

    console.log("^^^^^", allData, gridApi.api, window)
        
    const count = gridApi.api.getDisplayedRowCount();
    for(let i = 0; i < count; i ++) {
      const rowNode = gridApi.api.getDisplayedRowAtIndex(i)
      if(rowNode.data.id === selectedRowStart.id) {
        allData.splice(i, selectedLength);
      }
    }
    const updateData = data => {
      var server = new FakeServer(data);
      var datasource = new ServerSideDatasource(server);
      gridApi.api.setServerSideDatasource(datasource);
    }
    const httpRequest = new XMLHttpRequest();
    const json = JSON.stringify(ids);
    httpRequest.open(
      "DELETE",
      "http://localhost:4000/api/deleteData",
      true
    );
    httpRequest.setRequestHeader('Content-type','application/json; charset=utf-8');
    httpRequest.send(json);
    httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        updateData(JSON.parse(httpRequest.responseText));
      }
    };
    // gridApi.api.purgeServerSideCache();
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
        {/* <LocationSearchInput /> */}
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
    </div>
  );
};

export default Management;


