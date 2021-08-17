import React, { useCallback, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectors } from 'stores';
import Remote from 'utils/remote';
import Table from './Table';
import InnerTable from './InnerTable';
import { Error, Loading } from './components';
import { SelectColumnFilter } from './Filters';

export const useData = props => {
  const memoizeData = useMemo(() => selectors.investor.makeSelectRebates, []);
  return useSelector(state => memoizeData(state));
};

const FeeRebate = ({ layoutFlag }, ...rest) => {
  const memoizeData = useData(rest);
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
          width: '180px',
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
          width: '550px',
          maxWidth: '550px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        },
      },
      {
        Header: 'Setup Type',
        accessor: 'parent.setupType',
        aggregate: 'count',
        Aggregated: ({ value }) => `${value} types`,
        filter: 'includes',
        Filter: SelectColumnFilter,
        style: {
          width: '180px',
          textAlign: 'center',
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
          width: '180px',
          textAlign: 'center',
          whiteSpace: 'nowrap',
        },
      },
      {
        Header: 'Setup By',
        accessor: 'parent.setupBy',
        aggregate: 'count',
        Aggregated: ({ value }) => `${value} setup-by`,
        style: {
          width: '150px',
          maxWidth: '150px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        },
      },
    ],
    []
  );

  const renderSubComponent = useCallback(({ row, visibleColumns }) => {
    return <InnerTable data={row} parentVisibleColumns={visibleColumns} />;
  }, []);

  useEffect(() => {
    layoutFlag(Remote.Failure.is(memoizeData));
  }, [layoutFlag, memoizeData]);

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
