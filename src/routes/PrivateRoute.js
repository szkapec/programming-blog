import React from 'react'
import {connect} from 'react-redux';
import {Redirect, Route} from 'react-router-dom';

const PrivateRoute = ({component: Component, auth: {isLoggedIn}, ...rest}) => {
    return (
    <Route {...rest} render={props => !isLoggedIn?(<Redirect to="/login"/>) : (<Component {...props}/>)}/>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(PrivateRoute)
