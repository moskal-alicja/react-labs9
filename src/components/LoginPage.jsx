import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { loggedInUser } from '../redux/actions'

class LoginPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            invalidUser: false,
            firstAttempt: false,
            login: "",
        }
        this.checkUser = this.checkUser.bind(this);
        this.loginChanged = this.loginChanged.bind(this);
    }

    loginChanged(e) {
        this.setState({login: e.target.value});
    }

    checkUser(){   
        const { login } = this.state;     
        fetch('http://localhost:3004/users')
        .then(data => data.json())
        .then((users) => {
            const user = users.filter(u => u.username == login);
            if(user.length === 1) {
                this.props.loggedInUser(user[0]);
                this.setState({invalidUser: false, firstAttempt: false});
                this.props.history.push("/list");
            }
            else {
                this.setState({invalidUser: true, firstAttempt: true});
            }
        }
    );
  };

    render(){
        const {firstAttempt, invalidUser, login} = this.state;
        return(
            <div>
                <div>Login: <input type="text" value={login} onChange={this.loginChanged}/><button onClick={this.checkUser}>Log in</button></div>
                {firstAttempt && invalidUser && <div>Invalid User!</div> }
           </div>
        );
    }

}

const mapStateToProps = (state) => {
    return { }
}
  
const mapDispatchToProps = (dispatch) => ({
    loggedInUser: user => dispatch(loggedInUser(user))
  })

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
  )(LoginPage));