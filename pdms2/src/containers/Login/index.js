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
import LoginByContainer from '../../components/LoginByContainer';
import LoginBy from '../../components/LoginBy';
import Or from '../../components/Or';
import { loginRequest } from '../../actions/auth';
import { selectAuthState } from '../../selectors';
import { isRequired, isValidEmail } from '../../utils/helpers';
import { FaFacebookF, FaTwitter, FaGooglePlusG } from 'react-icons/fa';

export function Login({ history, loginRequest, auth, handleSubmit, ...others }) {
	const { error } = auth;
	const onSubmit = (values) => {
		loginRequest(values);
	}

	return (
		<Container className="main-container">
			<Row>
				<Col sm={12} md={{ size: 4, offset: 4 }}>
					<MiddleWrapper>
						<h2 className="text-center mb-3">Login</h2>
						{error.login && <Alert color='danger'>{error.login}</Alert>}
						<LoginByContainer>
							<LoginBy type='facebook'>
								<FaFacebookF />
							</LoginBy>
							<LoginBy type='google'>
								<FaGooglePlusG />
							</LoginBy>
							<LoginBy type='twitter'>
								<FaTwitter />
							</LoginBy>							
						</LoginByContainer>
						<Or />
						<Form onSubmit={handleSubmit(onSubmit)}>
							<Field
								label='Email'
								name='email'
								type='email'
								component={RenderField}
								validate={isValidEmail}
							/>
							<Field
								label='Password'
								name='password'
								type='password'
								component={RenderField}
								validate={isRequired}
							/>
							<div className='text-center'>
								<Button color='primary' type='submit' size="lg" block>Login</Button>
							</div>
							<BottomLink>
								Looking to <Link onClick={() => history.push('/register')}>create an account</Link>?
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