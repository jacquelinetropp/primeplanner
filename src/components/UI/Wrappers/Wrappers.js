import { Form } from "formik";
import styled from "styled-components";
import { AiOutlineMinusCircle, AiOutlineHome } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { BsTrash2 } from "react-icons/bs";
import { BiCalendarAlt, BiCalendarWeek } from "react-icons/bi";
import {VscChromeMinimize} from 'react-icons/vsc';

export const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  align-items: center;
`;

export const WhiteBackground = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  padding: 1rem;
  margin: 1rem;
  border-radius: 10px;
`;

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

export const StyledSelectField = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  margin-bottom: 1.5rem;
`;

export const FormButtonsWrapper = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 2rem;
  justify-content: space-around;
`;

export const MessageWrapper = styled.div`
  position: absolute;
  bottom: -15px;
`

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
  background-color: var(--color-grayDark);
  min-height: 100vh;
  display: grid;
  grid-template-rows: 100px auto;
  position: relative;
`;

export const LoggedInWrapper = styled.div`
  display: grid;
  min-height: 100vh;
  grid-template-columns: min-content repeat(4, 1fr);
  grid-template-rows: min-content min-content 1fr;

  @media only screen and (max-width: 768px) {
    grid-template-rows: repeat(3, min-content) 1fr;
  }
`;

export const JournalWrapper = styled.div`
  grid-column: 1/-1;
  background-color: #f9f9f9;
  border-radius: 5px;
  box-shadow: 0 0 2rem rgba(0, 0, 0, 0.3);

  display: grid;
  grid-template-columns: 150px 150px auto;
`;

//Icons

export const MinIcon = styled(VscChromeMinimize)`
  transform: scale(1.3);
  color: var(--color-text);
  opacity: .7;
  margin-top: 4px;
  margin-right: 4px;
  margin-left: 4px;
  cursor: pointer;
`;

export const HomeIcon = styled(AiOutlineHome)`
  font-size: 1.8rem;
  margin-right: 7px;
`;

export const SevenDayIcon = styled(BiCalendarWeek)`
  font-size: 1.8rem;
  margin-right: 7px;
`;

export const TodayIcon = styled(BiCalendarAlt)`
  font-size: 1.8rem;
  margin-right: 7px;
`;

export const StyledEdit = styled(BiEdit)`
  font-size: 18px;
  margin-right: 2px;
  cursor: pointer;
`;

export const StyledDelete = styled(BsTrash2)`
  font-size: 18px;
  cursor: pointer;
`;
