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
  {headerName: 'npi', field: 'npi'},
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
    headerName: 'mpn2127', 
    field: 'mpn2127', 
    editable: false,
    filter: false,
    cellRendererFramework: AgGridCheckbox,
    cellRendererParams: {
      colName: 'mpn2127',
    },
  },
  {
    headerName: 'mpn2129', 
    field: 'mpn2129', 
    editable: false,
    filter: false,
    cellRendererFramework: AgGridCheckbox,
    cellRendererParams: {
      colName: 'mpn2129',
    },
  },
  {
    headerName: 'mpn2130', 
    field: 'mpn2130', 
    editable: false,
    filter: false,
    cellRendererFramework: AgGridCheckbox,
    cellRendererParams: {
      colName: 'mpn2130',
    },
  },
  {
    headerName: 'mpn2173', 
    field: 'mpn2173', 
    editable: false,
    filter: false,
    cellRendererFramework: AgGridCheckbox,
    cellRendererParams: {
      colName: 'mpn2173',
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
    headerName: 'mpn1635', 
    field: 'mpn1635', 
    editable: false,
    filter: false,
    cellRendererFramework: AgGridCheckbox,
    cellRendererParams: {
      colName: 'mpn1635',
    },
  },
  {
    headerName: 'mpn1636', 
    field: 'mpn1636', 
    editable: false,
    filter: false,
    cellRendererFramework: AgGridCheckbox,
    cellRendererParams: {
      colName: 'mpn1636',
    },
  },
  {
    headerName: 'mpn1637', 
    field: 'mpn1637', 
    editable: false,
    filter: false,
    cellRendererFramework: AgGridCheckbox,
    cellRendererParams: {
      colName: 'mpn1637',
    },
  },
  {
    headerName: 'mpn2474', 
    field: 'mpn2474', 
    editable: false,
    filter: false,
    cellRendererFramework: AgGridCheckbox,
    cellRendererParams: {
      colName: 'mpn2474',
    },
  },
  {
    headerName: 'mpn2473', 
    field: 'mpn2473', 
    editable: false,
    filter: false,
    cellRendererFramework: AgGridCheckbox,
    cellRendererParams: {
      colName: 'mpn2473',
    },
  },
  {
    headerName: 'mpn0598', 
    field: 'mpn0598', 
    editable: false,
    filter: false,
    cellRendererFramework: AgGridCheckbox,
    cellRendererParams: {
      colName: 'mpn0598',
    },
  },
  {
    headerName: 'mpn2502', 
    field: 'mpn2502', 
    editable: false,
    filter: false,
    cellRendererFramework: AgGridCheckbox,
    cellRendererParams: {
      colName: 'mpn2502',
    },
  },
  {
    headerName: 'mpn2469', 
    field: 'mpn2469', 
    editable: false,
    filter: false,
    cellRendererFramework: AgGridCheckbox,
    cellRendererParams: {
      colName: 'mpn2469',
    },
  },
  {
    headerName: 'mpn2468', 
    field: 'mpn2468', 
    editable: false,
    filter: false,
    cellRendererFramework: AgGridCheckbox,
    cellRendererParams: {
      colName: 'mpn2468',
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
    headerName: 'mpn3104', 
    field: 'mpn3104', 
    editable: false,
    filter: false,
    cellRendererFramework: AgGridCheckbox,
    cellRendererParams: {
      colName: 'mpn3104',
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
