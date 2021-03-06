import React, { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectors } from 'stores';
import { ErrorPage, LoadingPage, Table, SubTable } from '../components';

const useRebates = () => {
  const memoizeData = useMemo(() => selectors.investor.makeSelectRebates_, []);
  return useSelector(state => memoizeData(state));
};

const FeeRebate = props => {
  const memoizeData = useRebates();
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
        Aggregated: () => null,
        style: {
          width: '50px',
        },
        collapse: true,
      },
      {
        Header: 'Investor ID',
        accessor: 'investorId',
        aggregate: 'count',
        Aggregated: ({ value }) => `${value} investor ids`,
        style: {
          minWidth: '200px',
          whiteSpace: 'nowrap',
        },
      },
      {
        Header: 'Investor Name',
        accessor: 'investorName',
        aggregate: 'count',
        Aggregated: ({ value }) => `${value} investor names`,
        filter: 'fuzzyText',
        style: {
          width: '700px',
          maxWidth: '700px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        },
      },
      {
        Header: 'Setup Date',
        accessor: 'setupDate',
        aggregate: 'count',
        Aggregated: ({ value }) => `${value} setup date`,
        Cell: ({ value }) => new Date(value).toLocaleDateString('en-GB'),
        style: {
          minWidth: '200px',
          //textAlign: 'center',
          whiteSpace: 'nowrap',
        },
      },
    ],
    []
  );

  const renderSubComponent = useCallback(({ row, visibleColumns }) => {
    return <SubTable parentData={row} parentVisibleColumns={visibleColumns} />;
  }, []);

  return memoizeData.cata({
    Success: ({ rebates }) => (
      <Table
        columns={memoizeColumns}
        data={rebates}
        renderSubComponent={renderSubComponent}
      />
    ),
    Failure: err => <ErrorPage message={err} />,
    Loading: () => <LoadingPage />,
    NotAsked: () => <LoadingPage />,
  });
};

export default FeeRebate;
