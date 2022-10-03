import styled from 'styled-components';
import { Form, Field, ErrorMessage } from 'formik';

export const FormElement = styled(Form)`
  display: flex;
  align-items: center;
  /* justify-content: center; */
  flex-direction: column;
`;

export const InputElement = styled(Field)`
  margin: 5px;
  width: 250px;
  height: 30px;
  border: solid 2px green;
  border-radius: 5px;
  padding: 5px;
`;

export const Label = styled.label`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 5px;
`;

export const ButtonSubmit = styled.button`
  width: 150px;
  height: 40px;
  font-weight: 700;
  background-color: green;
  color: white;
  border: none;
  border-radius: 30px;
  margin-top: 10px;
  opacity: 0.8;
  :hover {
    opacity: 1;
  }
`;

export const Error = styled(ErrorMessage)`
  text-align: center;
  color: red;
  font-size: 12px;
`;
