import React, { useState, useEffect } from "react";
import Loading from "../components/Loading";
import { useAuth0 } from "../react-auth0-spa";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import './style.css';
import data from './data.json';
import Degree from '../components/Degree.js';

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
      cellRenderer: 'degreeRenderer',
      cellEditorParams: {
        values: ["bachelor", "doctor"],
      }
    },
    {headerName: 'entity', field: 'entity'},
    {headerName: 'speciality', field: 'speciality'},
    {headerName: 'dwc', field: 'dwc'},
    {headerName: 'code', field: 'code'},
    {headerName: 'address', field: 'address'},
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
    // {headerName: 'Date', field: 'data', type: ['dateColumn', 'nonEditableColumn'], width: 200},
    // {
    //   headerName: 'Medals',
    //   groupId: 'medalsGroup',
    //   children: [
    //     {headerName: 'Gold', field: 'gold', type: 'medalColumn'},
    //     {headerName: 'Silver', field: 'silver', type: 'medalColumn'},
    //     {headerName: 'Bronze', field: 'bronze', type: 'medalColumn'},
    //   ]
    // },
    // {
    //   field: 'gender',
    //   width: 90,
    //   cellRenderer: 'genderCellRenderer',
    //   cellEditor: 'agRichSelectCellEditor',
    //   cellEditorParams: {
    //     values: ['Male', 'Female'],
    //     cellRenderer: 'genderCellRenderer'
    //   }
    // }
  ]);

  const [defaultColDef, setDefaultColDef] = useState({
    editable: true,
    filter: 'agTextColumnFilter',
    resizable: true,
    sortable: true,
  })

  const [frameworkComponents, setFrameworkComponents] = useState({degreeRenderer: Degree})

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

  const onGridReady = params => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const httpRequest = new XMLHttpRequest();
    // const updateData = data => {
    //   this.setState({ rowData: data });
    // };

    // httpRequest.open(
    //   "GET",
    //   "https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/olympicWinnersSmall.json"
    // );
    // httpRequest.send();
    // httpRequest.onreadystatechange = () => {
    //   if (httpRequest.readyState === 4 && httpRequest.status === 200) {
    //     updateData(JSON.parse(httpRequest.responseText));
    //   }
    // };
  };

  const onFirstDataRendered = (params) => {
    params.api.sizeColumnsToFit();
  }

  useEffect(() => {
    setRowData(data);
  })

  if (loading || !user) {
    return <Loading />;
  }

  return (
    <div className="ag-theme-balham management" >
      <AgGridReact
        columnDefs={columnDefs}
        rowData={rowData}
        defaultColDef={defaultColDef}
        defaultColGroupDef={defaultColGroupDef}
        columnTypes={columnTypes}
        floatingFilter={floatingFilter}
        onFirstDataRendered={onFirstDataRendered.bind(this)}
        frameworkComponents={frameworkComponents}
      >
      </AgGridReact>
    </div>
  );
};

export default Management;
