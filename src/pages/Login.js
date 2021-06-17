import React, { useEffect } from "react";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import * as actions from "../store/actions/actions";

import Input from "../components/UI/Forms/Input";
import Button from "../components/UI/Button/Button";

import {
  StyledForm,
  FormWrapper,
  WhiteBackground,
  MessageWrapper
} from "../components/UI/Wrappers/Wrappers";
import Message from "../components/UI/Forms/Message";

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
            <MessageWrapper>
            <Message error show={error}>
              {error}
            </Message>
          </MessageWrapper>
          </StyledForm>
        </FormWrapper>
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
