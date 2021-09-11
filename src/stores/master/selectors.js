import { INITIAL_STATE } from './reducers';

export const selectState = state => state.investor || INITIAL_STATE;
export const selectInvestors = state => state.master.investors;
