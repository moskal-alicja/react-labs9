import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

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
    const { employees, isLoading, user, isUserLoggedIn } = this.props;

    if(isLoading) {
      return <p>Loading ...</p>
    }

    const userFullNameStyle = {
      width: '100%',
      textAlign: 'right',
      margin: '0 5px 10px 0'
    };
    
    return (
      <div>
        {isUserLoggedIn && <div style={userFullNameStyle}> Hi, {user.full_name}!</div>}
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
    user: state.user,
    isUserLoggedIn: state.isUserLoggedIn,
  }
}

const mapDispatchToProps = (dispatch) => ({
  loadEmployees: () => dispatch(loadEmployees())
})


export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(PageEmployeesList));