import { Form } from "formik";
import styled from "styled-components";
import HomeImage from "../../../images/cork-board.png";
import react from "react";

export const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  align-items: center;
`;

export const Corkboard = styled.div`
  background-image: url(${HomeImage});
  min-height: 100vh;
`;

export const WhiteBackground = styled.div`
    background-color: rgba(255, 255, 255, 0.8);
    padding: 1rem;
    margin: 1rem;
    border-radius: 10px;
`

export const FormWrapper = styled.div`
  width: 50%;
  margin: auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;
