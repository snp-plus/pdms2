import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';
import { selectAuthenticated } from 'selectors';
import { createStructuredSelector } from 'reselect';

import Login from './containers/Login';
import Register from './containers/Register';

const Routes = () => {
	return (
		<Router>
			<Container className="main-container">
				<Route exact path='/' component={Login} />
				<Route path='/register' component={Register} />
			</Container>
		</Router>
	);
}

Routes.propTypes = {

};

const mapStateToProps = createStructuredSelector({

});

export default connect(mapStateToProps)(Routes);