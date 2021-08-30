import { groupBy, lift, map, pick, pipe, prop, sortBy, values } from 'ramda';
import { createSelector } from 'reselect';
import { INITIAL_STATE } from './reducers';

export const selectState = state => state.investor || INITIAL_STATE;
export const selectRebate = state => state.investor.rebate;
export const selectRebates = state => state.investor.rebates;
export const selectTable = state => state.investor.tableStore;

export const makeSelectRebates = createSelector(selectRebates, rebatesR => {
  const makeParent = parent => {
    return pick(['investor', 'setupDate'], parent);
  };
  const R = pipe(
    groupBy(r => r.investor?.investorId),
    map(r => ({
      parent: makeParent(r[0]),
      child: r,
    })),
    values
  );
  const transform = ({ rebates }) => {
    return { rebates: R(rebates) };
  };
  return lift(transform)(rebatesR);
});

//todo: fetch from investor
export const makeSelectInvestor = createSelector(selectRebates, rebatesR => {
  const transform = ({ rebates }) => {
    const iv = pipe(
      map(i => i.investor),
      groupBy(i => i.investorId),
      values,
      map(i => i[0]),
      sortBy(prop('investorName'))
    );
    return { investor: iv(rebates) };
  };
  return lift(transform)(rebatesR);
});
