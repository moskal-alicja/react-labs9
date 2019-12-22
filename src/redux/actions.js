import { EMPLOYEES_LOADED, EMPLOYEE_ADDED } from './constants';
import { LAUNCH_DATA_FETCHING, DATA_FETCHED_PROPERLY, DATA_FETCHING_ERROR } from './constants';
import { LOGGED_IN_USER } from "./constants";

export const employeesLoaded = (employees) => {
  return {
    type: EMPLOYEES_LOADED,
    payload: {
      employees
    }
  };
}

export const employeeAdded = (newEmployee) => {
  return {
    type: EMPLOYEE_ADDED,
    payload: {
      newEmployee
    }
  };
}

export const launchDataFetching = (isLoading) => {
  return {
    type: LAUNCH_DATA_FETCHING, 
    payload: {
      isLoading
    }
  }
}

export const dataFetchedProperly = (employees) => {
  return {
    type: DATA_FETCHED_PROPERLY,
    payload: {
      employees
    }
  }
}

export const dataFetchingError = (error) => {
  return {
    type: DATA_FETCHING_ERROR,
    payload: {
      error
    }
  }
}

export const loadEmployees = () => {
  return(dispatch) => {
    dispatch(launchDataFetching());
    return fetch('http://localhost:3004/employees')
    .then(data => data.json())
    .then(
      (employees) => dispatch(dataFetchedProperly(employees)),
      (error) => dispatch(dataFetchingError(error)),
    );
  };
}

export const loggedInUser = (user) => {
  return {
    type: LOGGED_IN_USER,
    payload: {
      user
    }
  }
}