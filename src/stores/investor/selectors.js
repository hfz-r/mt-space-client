import { groupBy, lift, map, pick, pipe, values } from 'ramda';
import { createSelector } from 'reselect';
import { INITIAL_STATE } from './reducers';
import Remote from 'utils/remote';

export const selectState = state => state.investor || INITIAL_STATE;
export const selectRebates = state => state.investor.rebates;

export const makeSelectRebates = createSelector(selectRebates, rebatesR => {
  const makeParent = parent => {
    return pick(['investor', 'setupType', 'setupBy', 'setupDate'], parent);
  };
  const R = pipe(
    groupBy(r => r.investor?.investorId),
    map(r => ({ parent: makeParent(r[0]), child: r })),
    values
  );
  const transform = ({ rebates }) => {
    return { rebates: R(rebates) };
  };
  return lift(transform)(rebatesR);
});

export const makeSelectInvestor = createSelector(
  makeSelectRebates,
  rebatesS => {
    const { rebates } = rebatesS.getOrElse([]);
    const investor = map(r => r.parent.investor);
    return Remote.of({ investor: investor(rebates) });
  }
);
