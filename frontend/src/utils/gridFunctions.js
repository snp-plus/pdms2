export function createNewRowData() {
  let today = new Date();
  var newData = {
    id: "",
    last: "",
    degree: "",
    entity: "",
    specialty: "",
    dwc: "",
    code: "",
    address: "",
    suite: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    fax: "",
    latitude: "",
    longitude: "",
    taxid: "",
    statelicensenumber: "",
    country: "",
    workinghrs: "",
    priority: "",
    referral: "",
    mpn3095: "",
    mpn3096: "",
    mpn3097: "",
    mpn0701: "",
    mpn2347: "",
    mpn2125: "",
    mpn2128: "",
    mpn2126: "",
    mpn2127: "",
    mpn2129: "",
    mpn2130: "",
    mpn2173: "",
    mpn2079: "",
    mpn1635: "",
    mpn1636: "",
    mpn1637: "",
    mpn2474: "",
    mpn2473: "",
    mpn0598: "",
    mpn2502: "",
    mpn2469: "",
    mpn2468: "",
    mpn2376: "",
    mpn2394: "",
    mpn1203: "",
    mpn3104: "",
    deleted: "",
    created: today,
    delete_date: "",
    deleted_by: "",
    newid: "",
  };

  return newData;
}

function sortAndFilter(allOfTheData, sortModel, filterModel) {
  return sortData(sortModel, filterData(filterModel, allOfTheData));
}

function sortData(sortModel, data) {
  var sortPresent = sortModel && sortModel.length > 0;
  if (!sortPresent) {
    return data;
  }
  var resultOfSort = data.slice();
  resultOfSort.sort(function(a, b) {
    for (var k = 0; k < sortModel.length; k++) {
      var sortColModel = sortModel[k];
      var valueA = a[sortColModel.colId];
      var valueB = b[sortColModel.colId];
      if (valueA === valueB) {
        continue;
      }
      var sortDirection = sortColModel.sort === "asc" ? 1 : -1;
      if (valueA > valueB) {
        return sortDirection;
      } else {
        return sortDirection * -1;
      }
    }
    return 0;
  });
  return resultOfSort;
}

function filterData(filterModel, data) {
  var filterPresent = filterModel && Object.keys(filterModel).length > 0;
  if (!filterPresent) {
    return data;
  }
  var resultOfFilter = [];
  for (var i = 0; i < data.length; i++) {
    var item = data[i];
    if (item.first && filterModel.first && item.first.includes(filterModel.first.filter) ) {
      resultOfFilter.push(item);
      continue;
    }
    
    if (item.last && filterModel.last && item.last.includes(filterModel.last.filter) ) {
      resultOfFilter.push(item);
      continue;
    }
    if (item.degree && filterModel.degree && item.degree.includes(filterModel.degree.filter) ) {
      resultOfFilter.push(item);
      continue;
    }
    if (item.entity && filterModel.entity && item.entity.includes(filterModel.entity.filter) ) {
      resultOfFilter.push(item);
      continue;
    }
    if (item.specialty && filterModel.specialty && item.specialty.includes(filterModel.specialty.filter) ) {
      resultOfFilter.push(item);
      continue;
    }
    if (item.dwc && filterModel.dwc && item.dwc.includes(filterModel.dwc.filter) ) {
      resultOfFilter.push(item);
      continue;
    }
    if (item.code && filterModel.code && item.code.includes(filterModel.code.filter) ) {
      resultOfFilter.push(item);
      continue;
    }
    if (item.address && filterModel.address && item.address.includes(filterModel.address.filter) ) {
      resultOfFilter.push(item);
      continue;
    }
    if (item.suite && filterModel.suite && item.suite.includes(filterModel.suite.filter) ) {
      resultOfFilter.push(item);
      continue;
    }
    if (item.city && filterModel.city && item.city.includes(filterModel.city.filter) ) {
      resultOfFilter.push(item);
      continue;
    }
    if (item.state && filterModel.state && item.state.includes(filterModel.state.filter) ) {
      resultOfFilter.push(item);
      continue;
    }
    if (item.zip && filterModel.zip && item.zip.includes(filterModel.zip.filter) ) {
      resultOfFilter.push(item);
      continue;
    }
    if (item.phone && filterModel.phone && item.phone.includes(filterModel.phone.filter) ) {
      resultOfFilter.push(item);
      continue;
    }
    if (item.fax && filterModel.fax && item.fax.includes(filterModel.fax.filter) ) {
      resultOfFilter.push(item);
      continue;
    }
    if (item.latitude && filterModel.latitude && item.latitude.includes(filterModel.latitude.filter) ) {
      resultOfFilter.push(item);
      continue;
    }
    if (item.longitude && filterModel.longitude && item.longitude.includes(filterModel.longitude.filter) ) {
      resultOfFilter.push(item);
      continue;
    }
    if (item.taxid && filterModel.taxid && item.taxid.includes(filterModel.taxid.filter) ) {
      resultOfFilter.push(item);
      continue;
    }
    if (item.statelicensenumber && filterModel.statelicensenumber && item.statelicensenumber.includes(filterModel.statelicensenumber.filter) ) {
      resultOfFilter.push(item);
      continue;
    }
    if (item.county && filterModel.county && item.county.includes(filterModel.county.filter) ) {
      resultOfFilter.push(item);
      continue;
    }
    if (item.workinghrs && filterModel.workinghrs && item.workinghrs.includes(filterModel.workinghrs.filter) ) {
      resultOfFilter.push(item);
      continue;
    }
    if (item.priority && filterModel.priority && item.priority.includes(filterModel.priority.filter) ) {
      resultOfFilter.push(item);
      continue;
    }
    if (item.referral && filterModel.referral && item.referral.includes(filterModel.referral.filter) ) {
      resultOfFilter.push(item);
      continue;
    }
    if (item.newid && filterModel.newid && item.newid.includes(filterModel.newid.filter) ) {
      resultOfFilter.push(item);
      continue;
    }
  }
  return resultOfFilter;
}

export function FakeServer(allData) {
  return {
    getResponse: function(request) {
      var dataAfterSortingAndFiltering = sortAndFilter(allData, request.sortModel, request.filterModel);
      var rowsThisPage = dataAfterSortingAndFiltering.slice(request.startRow, request.endRow);
      var lastRow = allData.length <= request.endRow ? allData.length : -1;
      return {
        success: true,
        rows: rowsThisPage,
        lastRow: lastRow
      };
    }
  };
}

export function ServerSideDatasource(server) {
  return {
    getRows: function(params) {
      setTimeout(function() {
        var response = server.getResponse(params.request);
        if (response.success) {
          params.successCallback(response.rows, response.lastRow);
        } else {
          params.failCallback();
        }
      }, 500);
    }
  };
}

export function NumericCellEditor() {
}

function getCharCodeFromEvent(event) {
  event = event || window.event;
  return (typeof event.which == "undefined") ? event.keyCode : event.which;
}

function isCharNumeric(charStr) {
  return !!/\d/.test(charStr);
}

function isKeyPressedNumeric(event) {
  var charCode = getCharCodeFromEvent(event);
  var charStr = String.fromCharCode(charCode);
  return isCharNumeric(charStr);
}

// gets called once before the renderer is used
NumericCellEditor.prototype.init = function (params) {
    // create the cell
    this.eInput = document.createElement('input');

    if (isCharNumeric(params.charPress)) {
        this.eInput.value = params.charPress;
    } else {
        if (params.value !== undefined && params.value !== null) {
            this.eInput.value = params.value;
        }
    }

    var that = this;
    this.eInput.addEventListener('keypress', function (event) {
        if (!isKeyPressedNumeric(event)) {
            that.eInput.focus();
            if (event.preventDefault) event.preventDefault();
        } else if (that.isKeyPressedNavigation(event)){
            event.stopPropagation();
        }
    });

    // only start edit if key pressed is a number, not a letter
    var charPressIsNotANumber = params.charPress && ('1234567890'.indexOf(params.charPress) < 0);
    this.cancelBeforeStart = charPressIsNotANumber;
};

NumericCellEditor.prototype.isKeyPressedNavigation = function (event){
    return event.keyCode===39
        || event.keyCode===37;
};


// gets called once when grid ready to insert the element
NumericCellEditor.prototype.getGui = function () {
    return this.eInput;
};

// focus and select can be done after the gui is attached
NumericCellEditor.prototype.afterGuiAttached = function () {
    this.eInput.focus();
};

// returns the new value after editing
NumericCellEditor.prototype.isCancelBeforeStart = function () {
    return this.cancelBeforeStart;
};

// example - will reject the number if it contains the value 007
// - not very practical, but demonstrates the method.
NumericCellEditor.prototype.isCancelAfterEnd = function () {
    var value = this.getValue();
    return value.indexOf('007') >= 0;
};

// returns the new value after editing
NumericCellEditor.prototype.getValue = function () {
    return this.eInput.value;
};

// any cleanup we need to be done here
NumericCellEditor.prototype.destroy = function () {
    // but this example is simple, no cleanup, we could  even leave this method out as it's optional
};

// if true, then this editor will appear in a popup 
NumericCellEditor.prototype.isPopup = function () {
    // and we could leave this method out also, false is the default
    return false;
};
