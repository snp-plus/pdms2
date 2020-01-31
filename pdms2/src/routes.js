import React from 'react';
// import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// import { selectAuthenticated } from 'selectors';
import { createStructuredSelector } from 'reselect';

import Login from './containers/Login';
import Register from './containers/Register';

const Routes = () => {
	// const rootComponent = <Redirect to={'login'} />//to={ authenticated ? '/dashboard' : '/login' } />
	
	return (
		<Router>
			<Route exact path='/' component={Login} />
			<Route path='/login' component={Login} />
			<Route path='/register' component={Register} />
		</Router>
	);
}

Routes.propTypes = {

};

const mapStateToProps = createStructuredSelector({

});

export default connect(mapStateToProps)(Routes);