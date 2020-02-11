import React, { useState, useEffect } from "react";
import Loading from "../components/Loading";
import { useAuth0 } from "../react-auth0-spa";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import './style.css';
import data from './data.json';
import LocationSearchInput from '../components/LocationSearchInput.js';
import DegreeRenderer from '../components/Degree';

function AgGridCheckbox (props) {
  const boolValue = props.value && props.value.toString() === 'true';
  const [isChecked, setIsChecked] = useState(boolValue);
  const onChanged = () => {
    props.setValue(!isChecked);
    setIsChecked(!isChecked);
  };
  return (
    <div>
      <input type="checkbox" className="grid-checkbox" checked={isChecked} onChange={onChanged} />
    </div>
  );
}

const Management = () => {
  const { loading, user } = useAuth0();

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
    {headerName: 'latitude', field: 'longitude'},
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
  // const [rowSelection, setRowSelection] = useState("single");
  // const [rowModelType, setRowModelType] = useState('serverSide');

  // const onGridReady = params => {
  //   this.gridApi = params.api;
  //   this.gridColumnApi = params.columnApi;

  //   const httpRequest = new XMLHttpRequest();
  //   const updateData = data => {
  //     var datasource = createMyDataSource(data);
  //     params.api.setServerSideDatasource(datasource);
  //   };

    // httpRequest.open(
    //   "GET",
    //   "https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/olympicWinners.json"
    // );
    // httpRequest.send();
    // httpRequest.onreadystatechange = () => {
    //   if (httpRequest.readyState === 4 && httpRequest.status === 200) {
    //     updateData(JSON.parse(httpRequest.responseText));
    //   }
    // };
  // };

  const onFirstDataRendered = (params) => {
    params.api.sizeColumnsToFit();
  }

  useEffect(() => {
    setRowData(data);
  })

  if (loading || !user) {
    return <Loading />;
  }

  // const onBtAdd = () => {
  //   var selectedRows = this.gridApi.getSelectedNodes();
  //   if (!selectedRows || selectedRows.length === 0) {
  //     return;
  //   }
  //   var selectedRow = selectedRows[0];
  //   window.rowDataServerSide.splice(selectedRow.rowIndex, 0, { athlete: "New Item" + newItemCount });
  //   newItemCount++;
  //   this.gridApi.purgeServerSideCache();
  // }

  // const onBtRemove = () => {
  //   var selectedRows = this.gridApi.getSelectedNodes();
  //   if (!selectedRows || selectedRows.length === 0) {
  //     return;
  //   }
  //   var selectedRow = selectedRows[0];
  //   window.rowDataServerSide.splice(selectedRow.rowIndex, 1);
  //   this.gridApi.purgeServerSideCache();
  // }

  return (
    <div className="ag-theme-balham management" >
      <div style={{ marginBottom: "5px" }}>
        {/* <button onClick={onBtAdd.bind(this)}>Add Row</button>
        <button onClick={onBtRemove.bind(this)}>Remove Row</button> */}
      </div>
      <AgGridReact
        columnDefs={columnDefs}
        rowData={rowData}
        defaultColDef={defaultColDef}
        defaultColGroupDef={defaultColGroupDef}
        columnTypes={columnTypes}
        floatingFilter={floatingFilter}
        // rowSelection={rowSelection}
        // rowModelType={rowModelType}
        // onGridReady={onGridReady}
      >
      </AgGridReact>
    </div>
  );
};

// var newItemCount = 0;
// function createMyDataSource(data) {
//   window.rowDataServerSide = data;
//   function MyDatasource() {}
//   MyDatasource.prototype.getRows = function(params) {
//     var rowsThisPage = data.slice(params.startRow, params.endRow);
//     params.successCallback(rowsThisPage, window.rowDataServerSide.length);
//   };
//   return new MyDatasource();
// }


export default Management;
