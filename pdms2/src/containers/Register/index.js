import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Row, Col, Form, Button, Alert, Container } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { selectAuthState } from '../../selectors'
import { registerRequest } from '../../actions/auth'
import RenderField from '../../components/RenderField';
import MiddleWrapper from '../../components/MiddleWrapper';
import BottomLink from '../../components/BottomLink';
import Link from '../../components/Link';
// import { REGISTER_REQUEST } from 'constants/auth'
// import registerFormValidator from './validate'

export function Register({ history, registerRequest, auth }) {
  const { error } = auth;
  
  return (
    <Container className="main-container">
      <Row>
        <Col sm={12} md={{ size: 4, offset: 4 }}>
          <MiddleWrapper>
            <h2 className="text-center mb-3">Register</h2>
            {error && <Alert color='danger'>{error}</Alert>}
            <Form>
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
                <Button color='primary' type='submit' size="lg" block>Register</Button>
              </div>
              <BottomLink>
								to <Link onClick={() => history.push('/login')}>Login</Link>
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
}

export default compose(
  reduxForm({
    form: 'registerForm',
    // validate: registerFormValidator,
  }),
  connect(mapStateToProps, mapDispatchToProps)
)(Register)
