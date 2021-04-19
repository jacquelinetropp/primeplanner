import { Form } from "formik";
import styled from "styled-components";
import HomeImage from "../../../images/cork-board.png";
import react from "react";
import { AiOutlineMinusCircle } from "react-icons/ai";

export const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  align-items: center;
`;

// export const Corkboard = styled.div`
//   background-image: url(${HomeImage});
//   min-height: 100vh;
// `;

export const WhiteBackground = styled.div`
    background-color: rgba(255, 255, 255, 0.8);
    padding: 1rem;
    margin: 1rem;
    border-radius: 10px;
`

export const FormWrapper = styled.div`
  width: 50%;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media only screen and (max-width: 425px) {
    width: 75%;
  }
`;

export const ProfileFormWrapper = styled.div`
  background-color: rgba(255, 255, 255, 1);
  padding: 5rem;
  border-radius: 5px;
  width: 75%;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

`;

export const LoggedOutWrapper = styled.div`
    background-image: url(${HomeImage});
    min-height: 100vh;
    display: grid;
    grid-template-rows: 100px auto;
    position: relative;
`;

export const LoggedInWrapper = styled.div`
  background-image: url(${HomeImage});
  min-height: 100vh;
  grid-gap: 1.5rem;
  padding: 1.5rem;
  display: grid;
  grid-template-rows: min-content 1fr;
`;

export const JournalWrapper = styled.div`
    grid-column: 1/-1;
    background-color: #f9f9f9;
    border-radius: 5px;
    box-shadow: 0 0 2rem rgba(0,0,0, 0.3);

    display: grid;
    grid-template-columns: 150px 150px auto;
`;

export const Icon = styled(AiOutlineMinusCircle)`
  transform: scale(2.3);
  color: var(--color-text);
  float: ${({left}) => (left ? "left" : "right")};
  margin-top:4px;
  margin-right: 4px;
  cursor: pointer;
`;