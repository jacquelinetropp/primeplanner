import React, { useState } from "react";
import { connect } from "react-redux";
import { Formik, Field } from "formik";
import styled from "styled-components";
import * as actions from "../store/actions/actions";
import * as Yup from "yup";

import Button from "../components/UI/Button/Button";
import Input from "../components/UI/Forms/Input";
import {
  ProfileFormWrapper,
  WhiteBackground,
  StyledForm,
} from "../components/UI/Wrappers/Wrappers";
import CloseButton from "../components/UI/Button/CloseButton";

const ProfileSchema = Yup.object().shape({
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
  password: Yup.string().min(8, "Too short"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    `Password doesn't match`
  ),
});

const ProfileWrapper = styled.div`
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.7);
`;

const DeleteWrapper = styled.button`
  cursor: pointer;
  color: var(--color-errorRed);
  padding: 1rem 2rem;
  border-radius: 2rem;
  border: 2px solid var(--color-errorRed);
  font-size: 1.3rem;
  font-weight: 700;
  margin-top: 2rem;
  transition: all 0.2s;
  &:hover {
    transform: translateY(-3px);
  }
  &:active {
    transform: translateY(2px);
  }
`;

const EditProfile = ({
  loading,
  error,
  firebase,
  editProfile,
  cleanUp,
  deleteUser,
  loadingDelete,
  errorDelete,
  close,
}) => {
  //   useEffect(() => {
  //     return () => {
  //       cleanUp();
  //     };
  //   }, [cleanUp]);

  const [modalOpened, setModalOpened] = useState(false);

  if (!firebase.profile.isLoaded) return null;
  return (
    <ProfileWrapper>
      <Formik
        initialValues={{
          firstName: firebase.profile.firstName,
          lastName: firebase.profile.lastName,
          email: firebase.auth.email,
          password: "",
          confirmPassword: "",
          location: "",
        }}
        validationSchema={ProfileSchema}
        onSubmit={async (values) => {
          await editProfile(values);
        }}
      >
        {({ isSubmitting, isValid }) => (
          <ProfileFormWrapper>
            <WhiteBackground>
              <h1>Edit your profile</h1>
              <h4>Here you can edit your profile</h4>
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
                placeholder="Zipcode"
                component={Input}
              />
              <Button
                disabled={!isValid || isSubmitting}
                loading={loading ? "Editing..." : null}
                type="submit"
              >
                Edit
              </Button>

              <DeleteWrapper onClick={() => setModalOpened(true)}>
                Delete my account
              </DeleteWrapper>
            </StyledForm>
            <CloseButton onClick={close}>X</CloseButton>
          </ProfileFormWrapper>
        )}
      </Formik>
    </ProfileWrapper>
  );
};

const mapStateToProps = ({ firebase, auth }) => ({
  firebase,
  loading: auth.profile.loading,
  error: auth.profile.error,
  loadingDelete: auth.deleteUser.loading,
  errorDelete: auth.deleteUser.error,
});

const mapDispatchToProps = {
  editProfile: actions.editProfile,
  //   cleanUp: actions.clean,
  //   deleteUser: actions.deleteUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
