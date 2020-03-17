import { ServerSideDatasource, FakeServer } from './gridFunctions.js';

export const onQuickFilterChanged = (gridApi, value) => {
  const json = JSON.stringify({value: value});
  const updateData = data => {
    var server = new FakeServer(data);
    var datasource = new ServerSideDatasource(server);
    gridApi.api.setServerSideDatasource(datasource);
  }
  const httpRequest = new XMLHttpRequest();
  httpRequest.open(
    "POST",
    "http://localhost:4000/api/quicksearch",
    true
  );
  httpRequest.setRequestHeader('Content-type','application/json; charset=utf-8');
  httpRequest.send(json);
  httpRequest.onreadystatechange = () => {
    if (httpRequest.readyState === 4 && httpRequest.status === 200) {
      updateData(JSON.parse(httpRequest.responseText));
    }
  };
}

export const onCellEditingStopped = (event) => {
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

export const getAllData = (gridApi) => {
  let rowData = [];
  gridApi.api.forEachNode(node => rowData.push(node.data));
  return rowData;
}

export const addNewRow = (gridApi) => {
  const allData = getAllData(gridApi);
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
}

export const updateData = (gridApi, data) => {
  var server = new FakeServer(data);
  var datasource = new ServerSideDatasource(server);
  gridApi.api.setServerSideDatasource(datasource);
}

export const onRemoveSelected = (gridApi, user) => {
  var selectedRows = gridApi.api.getSelectedRows();
  if(selectedRows.length === 0) return;
  let ids = [];
  selectedRows.map((value) => {
    value.user = user.name
    ids.push(value);
    return 0;
  })

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
}

export const onUpdateDatebase = (gridApi, data, isUpdate) => {
  if(!data ||  data.length === 0) return;
  const updateData = data => {
    var server = new FakeServer(data);
    var datasource = new ServerSideDatasource(server);
    gridApi.api.setServerSideDatasource(datasource);
  }
  const httpRequest = new XMLHttpRequest();
  const json = JSON.stringify(data);
  const url = isUpdate ? "http://localhost:4000/api/updateFromCSV" : "http://localhost:4000/api/addFromCSV"
  httpRequest.open(
    "POST",
    url,
    true
  );
  httpRequest.setRequestHeader('Content-type','application/json; charset=utf-8');
  httpRequest.send(json);
  httpRequest.onreadystatechange = () => {
    if (httpRequest.readyState === 4 && httpRequest.status === 200) {
      updateData(JSON.parse(httpRequest.responseText));
    }
  }
}