import React, { useMemo } from 'react';
import Table from '../Forms/Table';
import { SelectColumnFilter } from '../components/Filters';

const CimbSplit = props => {
  const memoizeColumns = useMemo(
    () => [
      {
        id: 'expander',
        Header: () => null,
        Cell: ({ row }) => (
          <span {...row.getToggleRowExpandedProps()}>
            {row.isExpanded ? '➖' : '➕'}
          </span>
        ),
        SubCell: () => null,
        style: {
          width: '50px',
        },
        collapse: true,
      },
      {
        Header: 'Effective From',
        accessor: 'effectiveFrom',
        Cell: ({ value }) => new Date(value).toLocaleDateString('en-GB'),
        style: {
          minWidth: '200px',
          whiteSpace: 'nowrap',
        },
      },
      {
        Header: 'Product ID',
        accessor: 'productId',
        style: {
          minWidth: '200px',
          whiteSpace: 'nowrap',
        },
      },
      {
        Header: 'Product Code',
        accessor: 'productCode',
        filter: 'includes',
        Filter: SelectColumnFilter,
        style: {
          minWidth: '200px',
          whiteSpace: 'nowrap',
        },
      },
      {
        Header: 'Product Name',
        accessor: 'productName',
        filter: 'fuzzyText',
        style: {
          maxWidth: '500px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        },
      },
      {
        Header: 'Plan',
        accessor: 'plan',
        style: {
          minWidth: '200px',
          whiteSpace: 'nowrap',
        },
      },
      {
        Header: 'Fee Type',
        accessor: 'feeType',
        style: {
          minWidth: '200px',
          whiteSpace: 'nowrap',
        },
      },
      {
        Header: 'Agent ID',
        accessor: 'agentId',
        style: {
          minWidth: '200px',
          whiteSpace: 'nowrap',
        },
      },
      {
        Header: 'Agent Name',
        accessor: 'agentName',
        filter: 'fuzzyText',
        style: {
          maxWidth: '500px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        },
      },
      {
        Header: 'Investor ID',
        accessor: 'investorId',
        style: {
          minWidth: '200px',
          whiteSpace: 'nowrap',
        },
      },
      {
        Header: 'Investor Name',
        accessor: 'investorName',
        filter: 'fuzzyText',
        style: {
          maxWidth: '500px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        },
      },
      {
        Header: 'Basis',
        accessor: 'basis',
        style: {
          minWidth: '200px',
          whiteSpace: 'nowrap',
        },
      },
      {
        Header: 'Amount From',
        accessor: 'amountFrom',
        style: {
          minWidth: '200px',
          whiteSpace: 'nowrap',
        },
      },
      {
        Header: 'Amount To',
        accessor: 'amountTo',
        style: {
          minWidth: '200px',
          whiteSpace: 'nowrap',
        },
      },
      {
        Header: 'Rate',
        accessor: 'rate',
        style: {
          minWidth: '200px',
          whiteSpace: 'nowrap',
        },
      },
      {
        Header: 'Setup Date',
        accessor: 'setupDate',
        Cell: ({ value }) => new Date(value).toLocaleDateString('en-GB'),
        style: {
          minWidth: '200px',
          whiteSpace: 'nowrap',
        },
      },
    ],
    []
  );

  return <Table columns={memoizeColumns} data={[]} />;
};

export default CimbSplit;
