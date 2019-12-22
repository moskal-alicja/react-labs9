import React from 'react'
import { withRouter } from 'react-router-dom'

class LoginPage extends React.Component {

    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div>Login: <input type="text" /><button>Log in</button></div>
        );
    }

}

export default withRouter(LoginPage);