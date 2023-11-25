export type PaginationRequest = {
  page: number;
  pageSize: number;
}

export type PaginationResponse = {
  Page: number;
  PageSize: number;
  TotalCount: number;
};
