import { groupBy, lift, map, pick, pipe, values } from 'ramda';
import { createSelector } from 'reselect';
import Remote from 'utils/remote';
import { INITIAL_STATE } from './reducers';

export const selectState = state => state.investor || INITIAL_STATE;
export const selectRebate = state => state.investor.rebate;
export const selectRebates = state => state.investor.rebates;

export const makeSelectChild_ = createSelector(selectRebates, rebatesR => {
  const R = pipe(
    groupBy(r => r.investorId),
    map(r => ({
      parent: r[0].investorId,
      child: r,
    })),
    values
  );
  const { rebates } = rebatesR.getOrElse([]);
  return R(rebates);
});

export const makeSelectRebate_ = createSelector(
  [selectRebate, (state, id) => id],
  (rebateR, id) => rebateR[id] || Remote.NotAsked
);

export const makeSelectRebates_ = createSelector(selectRebates, rebatesR => {
  const transform = r => {
    const rb = pipe(
      groupBy(r => r.investorId),
      map(r => pick(['investorId', 'investorName', 'setupDate'], r[0])),
      values
    );
    return { rebates: rb(r.rebates) };
  };
  return lift(transform)(rebatesR);
});
