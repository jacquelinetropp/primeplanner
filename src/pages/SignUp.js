import React, { useEffect } from "react";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import * as actions from '../store/actions/actions';

import Input from "../components/UI/Forms/Input";
import Button from "../components/UI/Button/Button";
import {
  StyledForm,
  FormWrapper,
  WhiteBackground,
  MessageWrapper
} from "../components/UI/Wrappers/Wrappers";
import Message from "../components/UI/Forms/Message";
import Branding from "../components/Branding/Branding";

const SignUpSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("Your first name is required.")
    .min(3, "Too short.")
    .max(25, "Too long."),
  lastName: Yup.string()
    .required("Your last name is required.")
    .min(3, "Too short.")
    .max(25, "Too long."),
  email: Yup.string()
    .email("Invalid email.")
    .required("The email is required."),
  password: Yup.string()
    .required("The passoword is required.")
    .min(8, "Too short"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], `Password doesn't match`)
    .required("You need to confirm your password."),
  location: Yup.string()
      .required("Your location is required")
      .min(3, "Too short.")
});

const SignUp = ({ signUp, loading, error, cleanUp }) => {
  useEffect(() => {
    return () => {
      cleanUp();
    };
  }, [cleanUp]);

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={SignUpSchema}
      onSubmit={async (values) => {
        await signUp(values);
      }}
    >
      {({ isSubmitting, isValid }) => (
        <FormWrapper>
        <Branding />
        <WhiteBackground>
              <h1>
                Sign up for an account
              </h1>
              <h4>
                Fill in your details to register your new account
              </h4>
              </WhiteBackground>
              <StyledForm>
                <Field
                  type="text"
                  name="firstName"
                  placeholder="Your first name..."
                  component={Input}
                />
                <Field
                  type="text"
                  name="lastName"
                  placeholder="Your last name..."
                  component={Input}
                />
                <Field
                  type="email"
                  name="email"
                  placeholder="Your email..."
                  component={Input}
                />
                <Field
                  type="password"
                  name="password"
                  placeholder="Your password..."
                  component={Input}
                />
                <Field
                  type="password"
                  name="confirmPassword"
                  placeholder="Re-type your password..."
                  component={Input}
                />
                <Field
                  type="text"
                  name="location"
                  placeholder="Enter your zipcode"
                  component={Input}
                />
                <Button
                  disabled={!isValid || isSubmitting}
                  loading={loading ? "Signing Up" : null}
                  type="submit"
                >
                  Sign up
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
  signUp: actions.signUp,
  cleanUp: actions.clean,
};

export default connect(mapStateToProps, mapDispatchToProps )(SignUp);
