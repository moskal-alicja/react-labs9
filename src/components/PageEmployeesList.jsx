import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { loadEmployees } from '../redux/actions'

const EmployeeLine = ({ employee }) => <div>{employee.name} ({employee.age} yrs old): {employee.company}</div>

class PageEmployeesList extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {

    const { firstLoaded } = this.props;
    if(firstLoaded === true){
      return;
    }

    this.props.loadEmployees();     
  }

  render() {
    const { employees, isLoading } = this.props;

    if(isLoading) {
      return <p>Loading ...</p>
    }
    
    return (
      <div>
        <h1>Employees List: </h1>
        {employees && employees.map((employee => <EmployeeLine key={employee._id} employee={employee} />))}
        <Link to="/new">
          <button>Create employee</button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    employees: state.employees,
    firstLoaded: state.firstLoaded,
    isLoading: state.isLoading,
  }
}

const mapDispatchToProps = (dispatch) => ({
  loadEmployees: () => dispatch(loadEmployees())
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageEmployeesList)