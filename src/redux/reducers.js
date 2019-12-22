import { EMPLOYEES_LOADED } from './constants';
import { EMPLOYEE_ADDED } from './constants';
import { LAUNCH_DATA_FETCHING, DATA_FETCHED_PROPERLY, DATA_FETCHING_ERROR } from './constants';

export const initialState = {
  employees: [],
  firstLoaded: false,
  isLoading: false,
  error: null,
};

// Read this: https://redux.js.org/basics/reducers

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case EMPLOYEES_LOADED: {
      const { employees } = action.payload;
      // CAREFUL: You can't modify state variable directly.
      return Object.assign({}, state, { employees, firstLoaded: true });
    }
    case EMPLOYEE_ADDED: {
      const { newEmployee } = action.payload;
      const employees  = [...state.employees, newEmployee];
      return Object.assign({}, state, { employees });
    }
    case LAUNCH_DATA_FETCHING: {
      const { isLoading } = action.payload;
      return Object.assign({}, state, { isLoading });
    }
    case DATA_FETCHED_PROPERLY: {
      const { employees } = action.payload;
      return Object.assign({}, state, { employees, isLoading: false, error: null, firstLoaded: true });
    }
    case DATA_FETCHING_ERROR: {
      const { error } = action.payload;
      return Object.assign({}, state, { error, isLoading: false });
    }
    default:
        return state
  }
}

export default appReducer;