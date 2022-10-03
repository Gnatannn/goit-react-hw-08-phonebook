import { PropTypes } from 'prop-types';
import { Formik } from 'formik';
import * as yup from 'yup';
import {
  FormElement,
  InputElement,
  Label,
  ButtonSubmit,
  Error,
} from 'components/ContactForm/ContactForm.styled';

const schema = yup.object().shape({
  name: yup
    .string()
    .matches(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
    )
    .required(),
  number: yup
    .string()
    .min(4)
    .max(10)
    .matches(
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
    )
    .required(),
});

const initialValues = {
  name: '',
  number: '',
};

export const ContactForm = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={onSubmit}
    >
      <FormElement autoComplete="off">
        <Label htmlFor="name">Name</Label>
        <InputElement type="text" name="name" placeholder="Name" />
        <Error name="name" component="div" />

        <Label htmlFor="number">Number</Label>
        <InputElement type="tel" name="number" placeholder="Telephone number" />
        <Error name="number" component="div" />
        <ButtonSubmit type="submit">Add contact</ButtonSubmit>
      </FormElement>
    </Formik>
  );
};

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
