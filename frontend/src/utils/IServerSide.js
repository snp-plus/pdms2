import { RowNode, IServerSideGetRowsRequest } from "ag-grid-community";

export interface IServerSideDatasource {

  // grid calls this to get rows
  getRows(params: IServerSideGetRowsParams): void;

  // optional destroy method, if your datasource has state it needs to clean up
  destroy: void;
}

export interface IServerSideGetRowsParams {

  // details for the request, simple object, can be converted to JSON
  request: IServerSideGetRowsRequest;

  // the parent row node. is the RootNode (level -1) if request is top level.
  // this is NOT part fo the request as it cannot be serialised to JSON (a rowNode has methods)
  parentNode: RowNode;

  // success callback, pass the rows back the grid asked for.
  // if the total row count is known, provide it via lastRow, so the
  // grid can adjust the scrollbar accordingly.
  successCallback(rowsThisPage: any[], lastRow: number): void;

  // fail callback, tell the grid the call failed so it can adjust its state
  failCallback(): void;
}