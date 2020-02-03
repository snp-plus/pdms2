import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Row, Col, Form, Button, Alert, Container } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { selectAuthState } from '../../selectors'
import { registerRequest, registerFail } from '../../actions/auth'
import RenderField from '../../components/RenderField';
import MiddleWrapper from '../../components/MiddleWrapper';
import BottomLink from '../../components/BottomLink';
import Link from '../../components/Link';
import LoginByContainer from '../../components/LoginByContainer';
import LoginBy from '../../components/LoginBy';
import { FaFacebookF, FaTwitter, FaGooglePlusG } from 'react-icons/fa';
import Or from '../../components/Or';
// import { REGISTER_REQUEST } from 'constants/auth'
// import registerFormValidator from './validate'

export function Register({ history, registerRequest, handleSubmit, pristine, submitting, registerFail, auth, ...others }) {
  const { error } = auth;
  const onSubmit = (values) => {
    console.log("register", values)
    if(values.password == values.confirm_password) registerRequest(values);
    else registerFail("password and confirm password should be correct.");
  }

  return (
    <Container className="main-container">
      <Row>
        <Col sm={12} md={{ size: 4, offset: 4 }}>
          <MiddleWrapper>
            <h2 className="text-center mb-3">Register</h2>
            {error.register && <Alert color='danger'>{error.register}</Alert>}
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
              />
              <Field
                label='Password'
                name='password'
                type='password'
                component={RenderField}
              />
              <Field
                label='Confirm Password'
                name='confirm_password'
                type='password'
                component={RenderField}
              />
              <div className='text-center'>
                <Button color='primary' type='submit' size="lg" block disabled={pristine || submitting}>Register</Button>
              </div>
              <BottomLink>
								Already have an account? <Link onClick={() => history.push('/login')}>Login</Link>
							</BottomLink>
            </Form>
          </MiddleWrapper>
        </Col>
      </Row>
    </Container>
  )
}

Register.propTypes = {
  handleSubmit: PropTypes.func,
  registerRequest: PropTypes.func,
  auth: PropTypes.object,
}

const mapStateToProps = createStructuredSelector({
  auth: selectAuthState,
})

const mapDispatchToProps = {
  registerRequest,
  registerFail,
}

export default compose(
  reduxForm({
    form: 'registerForm',
    // validate: registerFormValidator,
  }),
  connect(mapStateToProps, mapDispatchToProps)
)(Register)
