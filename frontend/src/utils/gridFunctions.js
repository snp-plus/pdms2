export function createNewRowData() {
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
    mpn0589: "",
    mpn0701: "",
    mpn1203: "",
    mpn2079: "",
    mpn2125: "",
    mpn2126: "",
    mpn2128: "",
    mpn2347: "",
    mpn2376: "",
    mpn2394: "",
    mpn2451: "",
    mpn2452: "",
    mpn3091: "",
    mpn3095: "",
    mpn3096: "",
    mpn3097: "",
    deleted: "",
    created: "",
    delete_date: "",
    deleted_by: "",
    newid: "",
  };

  return newData;
}

export function printResult(res) {
  if (res.add) {
    res.add.forEach(function(rowNode) {
      console.log("Added Row Node", rowNode);
    });
  }
  if (res.remove) {
    res.remove.forEach(function(rowNode) {
      console.log("Removed Row Node", rowNode);
    });
  }
  if (res.update) {
    res.update.forEach(function(rowNode) {
      console.log("Updated Row Node", rowNode);
    });
  }
}

export function createMyDataSource(data) {
  window.rowDataServerSide = data;
  function MyDatasource() {}
  MyDatasource.prototype.getRows = function(params) {
    var rowsThisPage = data.slice(params.startRow, params.endRow);
    params.successCallback(rowsThisPage, window.rowDataServerSide.length);
  };
  return new MyDatasource();
}

export function FakeServer(allData) {
  return {
    getResponse: function(request) {
      console.log("asking for rows: " + request.startRow + " to " + request.endRow);
      var rowsThisPage = allData.slice(request.startRow, request.endRow);
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