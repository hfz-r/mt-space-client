import React, { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectors } from 'stores';
import Table from '../Forms/Table';
import InnerTable from '../Forms/InnerTable';
import { Error, Loading } from '../Forms/components';

export const useRebateContext = props => {
  const memoizeData = useMemo(() => selectors.investor.makeSelectRebates, []);
  return useSelector(state => memoizeData(state));
};

const FeeRebate = props => {
  const memoizeData = useRebateContext(props);
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
        accessor: 'parent.investor.investorId',
        aggregate: 'count',
        Aggregated: ({ value }) => `${value} investor ids`,
        style: {
          minWidth: '200px',
          whiteSpace: 'nowrap',
        },
      },
      {
        Header: 'Investor Name',
        accessor: 'parent.investor.investorName',
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
        accessor: 'parent.setupDate',
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
    return <InnerTable data={row} parentVisibleColumns={visibleColumns} />;
  }, []);

  return memoizeData.cata({
    Success: ({ rebates }) => (
      <Table
        columns={memoizeColumns}
        data={rebates}
        renderSubComponent={renderSubComponent}
      />
    ),
    Failure: err => <Error message={err} />,
    Loading: () => <Loading />,
    NotAsked: () => <Loading />,
  });
};

export default FeeRebate;
