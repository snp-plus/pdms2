import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Row, Col, Form, Button, Alert, Container } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import RenderField from '../../components/RenderField';
import MiddleWrapper from '../../components/MiddleWrapper';
import BottomLink from '../../components/BottomLink';
import Link from '../../components/Link';
import { loginRequest } from '../../actions/auth';
import { selectAuthState } from '../../selectors';

export function Login({ history, loginRequest, auth }) {
	const { error } = auth;
	const handleSubmit = (values) => {
		console.log("console", values);
		//loginRequest(values);
	}
	return (
		<Container className="main-container">			
			<Row>
				<Col sm={12} md={{ size: 4, offset: 4 }}>
					<MiddleWrapper>
						<h2 className="text-center mb-3">Login</h2>
						{error && <Alert color='danger'>{error}</Alert>}
						<Form onSubmit={handleSubmit}>
							<Field
								label='Email'
								name='email'
								type='email'
								component={RenderField}
							/>
							<Field
								label='Password'
								name='password'
								type='password'
								component={RenderField}
							/>
							<div className='text-center'>
								<Button color='primary' type='submit' size="lg" block>Login</Button>
							</div>
							<BottomLink>
								to <Link onClick={() => history.push('/register')}>Register</Link>
							</BottomLink>
						</Form>
					</MiddleWrapper>	
				</Col>
			</Row>
		</Container>
	);
}

Login.propTypes = {
	loginRequest: PropTypes.func,
	auth: PropTypes.object,
}

const mapStateToProps = createStructuredSelector({
  auth: selectAuthState,
})

const mapDispatchToProps = {
  loginRequest,
}

export default compose(
  reduxForm({
    form: 'loginForm',
    // validate: loginFormValidator,
  }),
  connect(mapStateToProps, mapDispatchToProps)
)(Login)