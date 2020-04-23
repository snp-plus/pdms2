import React, { useState, useCallback } from "react";
import Loading from "../components/Loading";
import { useAuth0 } from "../react-auth0-spa";
import { AgGridReact } from 'ag-grid-react';
import { ServerSideDatasource, NumericCellEditor, FakeServer } from '../utils/gridFunctions';
//import { defalutColumnDefs } from '../utils/defalutColumnDefs';
import ImportModal from '../components/ImportModal';
import AddNewRow from '../components/AddNewRow';
import DelModal from '../components/DelModal';
import AgGridCheckbox from '../components/AgGridCheckbox.js';
import SearchInput from '../components/SearchInput.js';
import FilterPandel from '../components/FilterPanel';
import { 
  onQuickFilterChanged, 
  onCellEditingStopped,
  onRemoveSelected,
  onUpdateDatebase,
} from '../utils/gridActions';
import { MdLibraryAdd, MdDelete, MdImportExport } from 'react-icons/md';
import { FaFilter } from 'react-icons/fa';
import {  
  Input, 
  Dropdown, 
  DropdownToggle, 
  DropdownMenu, 
  DropdownItem,
  Collapse,
  Card,
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
  // const [floatingFilter] = useState(true);
  const [rowSelection] = useState("multiple");
  const [rowModelType] = useState('serverSide');
  const [components] = useState({ numericCellEditor: NumericCellEditor, });
  const [defaultColGroupDef] = useState({marryChildren: true});
  const [columnTypes] = useState({
    numberColumn: {width: 83},    
    nonEditableColumn: {editable: false},
  });  
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [collapse, setCollapse] = useState(false);
  const [delModal, setDelModal] = useState(false);
  const [openFilterPanel, setOpenFilterPanel] = useState(false);
  const [delID, setDelID] = useState(0);

  const modalToggle = () => setModal(!modal);
  const toggle = () => setDropdownOpen(prevState => !prevState);
  const toggle_collapse = () => {
    setCollapse(!collapse);
  }
  const onFilterToggle = () => {
    setOpenFilterPanel(!openFilterPanel);
  }
  const delModalToggle = () => setDelModal(!delModal);
  const defalutColumnDefs = [
    {
      headerName: 'id', 
      field: 'id', 
      suppressSizeToFit: true, 
      width: 60, 
      
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
    {
      headerName: 'county', 
      field: 'county'
    },
    {headerName: 'workinghrs', field: 'workinghrs'},
    {headerName: 'priority', field: 'priority'},
    {
      headerName: 'referral',
      field: 'referral', 
      editable: false,
      
      cellRendererFramework: AgGridCheckbox,
      cellRendererParams: {
        colName: 'referral',
      },
    },
    {
      headerName: 'mpn0589',
      field: 'mpn0589', 
      editable: false,
      
      cellRendererFramework: AgGridCheckbox,
      cellRendererParams: {
        colName: 'mpn0589',
      },
    },
    {
      headerName: 'mpn0701', 
      field: 'mpn0701', 
      editable: false,
      
      cellRendererFramework: AgGridCheckbox,
      cellRendererParams: {
        colName: 'mpn0701',
      },
    },
    {
      headerName: 'mpn1203', 
      field: 'mpn1203', 
      editable: false,
      
      cellRendererFramework: AgGridCheckbox,
      cellRendererParams: {
        colName: 'mpn1203',
      },
    },
    {
      headerName: 'mpn2079', 
      field: 'mpn2079', 
      editable: false,
      
      cellRendererFramework: AgGridCheckbox,
      cellRendererParams: {
        colName: 'mpn2079',
      },
    },
    {
      headerName: 'mpn2125', 
      field: 'mpn2125', 
      editable: false,
      
      cellRendererFramework: AgGridCheckbox,
      cellRendererParams: {
        colName: 'mpn2125',
      },
    },
    {
      headerName: 'mpn2126', 
      field: 'mpn2126', 
      editable: false,
      
      cellRendererFramework: AgGridCheckbox,
      cellRendererParams: {
        colName: 'mpn2126',
      },
    },
    {
      headerName: 'mpn2128', 
      field: 'mpn2128', 
      editable: false,
      
      cellRendererFramework: AgGridCheckbox,
      cellRendererParams: {
        colName: 'mpn2128',
      },
    },
    {
      headerName: 'mpn2347', 
      field: 'mpn2347', 
      editable: false,
      
      cellRendererFramework: AgGridCheckbox,
      cellRendererParams: {
        colName: 'mpn2347',
      },
    },
    {
      headerName: 'mpn2376', 
      field: 'mpn2376', 
      editable: false,
      
      cellRendererFramework: AgGridCheckbox,
      cellRendererParams: {
        colName: 'mpn2376',
      },
    },
    {
      headerName: 'mpn2394', 
      field: 'mpn2394', 
      editable: false,
      
      cellRendererFramework: AgGridCheckbox,
      cellRendererParams: {
        colName: 'mpn2394',
      },
    },
    {
      headerName: 'mpn2451', 
      field: 'mpn2451', 
      editable: false,
      
      cellRendererFramework: AgGridCheckbox,
      cellRendererParams: {
        colName: 'mpn2451',
      },
    },
    {
      headerName: 'mpn2452', 
      field: 'mpn2452', 
      editable: false,
      
      cellRendererFramework: AgGridCheckbox,
      cellRendererParams: {
        colName: 'mpn2452',
      },
    },
    {
      headerName: 'mpn3091', 
      field: 'mpn3091', 
      editable: false,
      
      cellRendererFramework: AgGridCheckbox,
      cellRendererParams: {
        colName: 'mpn3091',
      },
    },
    {
      headerName: 'mpn3095', 
      field: 'mpn3095', 
      editable: false,
      
      cellRendererFramework: AgGridCheckbox,
      cellRendererParams: {
        colName: 'mpn3095',
      },
    },
    {
      headerName: 'mpn3096', 
      field: 'mpn3096', 
      editable: false,
      
      cellRendererFramework: AgGridCheckbox,
      cellRendererParams: {
        colName: 'mpn3096',
      },
    },
    {
      headerName: 'mpn3097', 
      field: 'mpn3097', 
      editable: false,
      
      cellRendererFramework: AgGridCheckbox,
      cellRendererParams: {
        colName: 'mpn3097',
      },
    },
    {
      headerName: 'deleted', 
      field: 'deleted', 
      editable: false,
      
      cellRendererFramework: AgGridCheckbox,
      cellRendererParams: {
        colName: 'deleted',
        delModalToggle: delModalToggle,
        setDelID: setDelID
      },
    },
    // {
    //   headerName: 'created', 
    //   field: 'created',
    //   editable: false,
    //   
    //   width: 200,
    // },
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
    },
  ];
  const [columnDefs] = useState(defalutColumnDefs);

  const [defaultColDef] = useState({
    editable: true,
    resizable: true,
    sortable: true,
    width: 100,
    height: 100,
    undoRedoCellEditing: true,
    undoRedoCellEditingLimit: 20,
  });

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
        "https://pdms.snp-plus.com:4000/api/getAllData"
        // "http://localhost:4000/api/getAllData"
      );
      httpRequest.setRequestHeader('Authorization', localStorage.getItem('token'));
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
    // const firstDisplayedId = gridApi.api.getFirstDisplayedRow();
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
        <MdLibraryAdd className="grid-button add_button" onClick={() => toggle_collapse()} />  {/* addNewRow(gridApi) */}
        <FaFilter className="grid-button filter_button" onClick={() => onFilterToggle()} />
        <Input
          className="filterbox global_search"
          type="text"
          onChange={(event) => onQuickFilterChanged(gridApi, event.target.value)}
          id="quickFilter"
          placeholder="global search..."
        />
      </div>
      <Collapse isOpen={collapse}>
        <Card>
         <AddNewRow gridApi={gridApi} toggle_collapse={toggle_collapse} />
        </Card>
      </Collapse>
      <Collapse isOpen={openFilterPanel}>
        <Card>
         <FilterPandel gridApi={gridApi} onFilterToggle={onFilterToggle} />
        </Card>
      </Collapse>
      <AgGridReact
        columnDefs={columnDefs}
        rowData={rowData}
        defaultColDef={defaultColDef}
        defaultColGroupDef={defaultColGroupDef}
        columnTypes={columnTypes}
        // floatingFilter={floatingFilter}
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
      {
        delModal && 
        <DelModal 
          isOpen={delModal}
          delModalToggle={delModalToggle}
          parentGridApi={gridApi}
          delID={delID}
        />
      }
    </div>
  );
};

export default Management;