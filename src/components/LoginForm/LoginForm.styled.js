import styled from 'styled-components';
import { Form, Field, ErrorMessage } from 'formik';

export const LogInForm = styled(Form)`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 100px;
  margin-bottom: 100px;
`;

export const LogInFormInput = styled(Field)`
  font-size: 16px;
  width: 250px;
  height: 30px;
  border: solid 2px green;
  border-radius: 5px;
  padding: 5px;
  margin-bottom: 15px;
`;

export const LogInFormLabel = styled.label`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 5px;
`;

export const LogInFormSubmitBtn = styled.button`
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

export const Error = styled.div`
  text-align: center;
  color: red;
  margin-top: 15px;
  font-weight: 700;
  font-size: 20px;
`;

export const InputError = styled(ErrorMessage)`
  margin: 15px 0px;
  text-align: center;
  color: red;
  font-size: 12px;
  font-weight: 500;
`;
