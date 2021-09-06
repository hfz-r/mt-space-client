import React from 'react';
import Pagination from '@choc-ui/paginator';

const TablePagination = ({
  total,
  gotoPage,
  previousPage,
  nextPage,
  canPreviousPage,
  canNextPage,
  pageCount,
  pageIndex,
  pageOptions,
  pageSize,
  setPageSize,
  fetchPaging,
}) => {
  return (
    <Pagination
      defaultCurrent={pageIndex + 1}
      total={total}
      paginationProps={{ display: 'flex', my: 5, justifyContent: 'center' }}
      current={pageIndex + 1}
      onChange={page => gotoPage(page - 1)}
      colorScheme="blue"
      pageNeighbours={1}
      showSizeChanger
      defaultPageSize={10}
      pageSize={pageSize}
      pageSizeOptions={[10, 20, 30, 40, 50]}
      onShowSizeChange={(page, size) => setPageSize(Number(size))}
      responsive={{ activePage: true, pageSize: true }}
    />
  );
};

export default TablePagination;
