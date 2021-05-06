import React from 'react';
import {useField, useFormikContext} from 'formik';
import { DateTimePicker } from "react-rainbow-components";
// import DatePicker from "react-datepicker";

const DatePickerField = ({ name, value, onChange }) => {
    return (
        <DateTimePicker
            value={(value && new Date(value)) || null}
            onChange={val => {
                onChange(name, val);
            }}
        />
    );
  };

export default DatePickerField; 
