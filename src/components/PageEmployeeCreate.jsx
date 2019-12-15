import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { employeeAdded } from '../redux/actions'

class PageEmployeeCreate extends React.Component {
  constructor(props) {
    super(props);

    this.nameChanged = this.nameChanged.bind(this);
    this.ageChanged = this.ageChanged.bind(this);
    this.companyChanged = this.companyChanged.bind(this);
    this.emailChanged = this.emailChanged.bind(this);
    this.createEmployee = this.createEmployee.bind(this);

    this.state = {
      name: '',
      age: 18,
      company: '',
      email: '',
      isSaving: false,
      error: null
    }
  }

  nameChanged(e) {
    this.setState({ name: e.target.value });
  }

  ageChanged(e) {
    this.setState({ age: Number(e.target.value) });
  }

  companyChanged(e) {
    this.setState({ company: e.target.value });
  }

  emailChanged(e) {
    this.setState({ email: e.target.value });
  }

  createEmployee() {
    this.setState({ isSaving: true, error: null });
    
    const { 
      name,
      age, 
      company, 
      email,
    } = this.state;

    const employee = { 
      id: Date.now(),
      name, 
      age, 
      company, 
      email };

    fetch('http://localhost:3004/employees', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(employee)
    })
    .then(res => {
      if(res.status !== 201) {
        this.setState({ isSaving: false, error: `Saving returned status ${res.status}`})
      } else {
        this.props.employeeAdded(employee);
        this.props.history.push("/");
      }
    })  
  }

  render() {
    const { 
      name, 
      age, 
      company, 
      email, 
      isSaving,
      error,
    } = this.state;

    return (
      <div>
        <h1>Enter employees data:</h1>
        <div>Name: <input type="text" value={name} onChange={this.nameChanged} disabled={isSaving} /></div>
        <div>Age: <input type="number" value={age} onChange={this.ageChanged} disabled={isSaving}/></div>
        <div>Company: <input type="text" value={company} onChange={this.companyChanged} disabled={isSaving}/></div>
        <div>Email: <input type="email" value={email} onChange={this.emailChanged} disabled={isSaving}/></div>
        {!isSaving ? <button onClick={this.createEmployee}>Create employee</button> : <p>Saving ...</p>}
        {error && <p>An error occured: {error}</p>}
      </div>
    );
  }
}

const mapStateToProps = (state /*, ownProps*/) => {
  return {
      name: state.name,
      age: state.age,
      company: state.company,
      email: state.email,     
  }
}

const mapDispatchToProps = (dispatch) => ({
  employeeAdded: newEmployee => dispatch(employeeAdded(newEmployee))
})

export default withRouter(
  connect(
    mapStateToProps, 
    mapDispatchToProps
  )(PageEmployeeCreate));
