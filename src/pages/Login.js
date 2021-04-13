import React, { Fragment, useEffect } from "react";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

import * as actions from '../store/actions/actions';

import Input from "../components/UI/Forms/Input";
import Button from "../components/UI/Button/Button";
import { Form } from "formik";

import {StyledForm, FormWrapper, Corkboard, WhiteBackground} from '../components/UI/Wrappers/Wrappers';


const MessageWrapper = styled.div`
  position: absolute;
  bottom: -15px;
`;

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("The email is required"),
  password: Yup.string()
    .required("The password is required")
    .min(8, "Too short"),
});

const Login = ({ loading, error, login, history, cleanUp }) => {
  useEffect(() => {
    return () => {
      cleanUp();
    };
  }, [cleanUp]);
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={LoginSchema}
      onSubmit={async (values) => {
        await login(values);
        history.push("/");
      }}
    >
      {({ isSubmitting, isValid }) => (
    <Corkboard>
        <FormWrapper>
        <WhiteBackground>
          <h1>Login</h1>
          <h4>Fill in your details to login into your account</h4>
          </WhiteBackground>
          <StyledForm>
            <Field
              type="email"
              name="email"
              placeholder="Your Email"
              component={Input}
            />

            <Field
              type="password"
              name="password"
              placeholder="Your Password"
              component={Input}
            />

            <Button
              loading={loading ? "Logging In..." : null}
              disabled={!isValid || isSubmitting}
              type="submit"
            >
              Login
            </Button>
          </StyledForm>
          </FormWrapper>
        </Corkboard>
      )}
    </Formik>
  );
};
const mapStateToProps = ({ auth }) => ({
  loading: auth.loading,
  error: auth.error,
});

const mapDispatchToProps = {
  login: actions.signIn,
  cleanUp: actions.clean,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
