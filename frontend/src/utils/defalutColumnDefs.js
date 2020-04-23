import AgGridCheckbox from '../components/AgGridCheckbox.js';
import SearchInput from '../components/SearchInput.js';

export const defalutColumnDefs = [
  {
    headerName: 'id', 
    field: 'id', 
    suppressSizeToFit: true, 
    width: 60, 
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
    filter: false,
    cellRendererFramework: AgGridCheckbox,
    cellRendererParams: {
      colName: 'referral',
    },
  },
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
  // {
  //   headerName: 'created', 
  //   field: 'created',
  //   editable: false,
  //   filter: false,
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
