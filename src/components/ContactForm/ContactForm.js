import { Formik } from 'formik';
import * as yup from 'yup';
import {
  FormElement,
  InputElement,
  Label,
  ButtonSubmit,
  Error,
} from 'components/ContactForm/ContactForm.styled';
import { useSelector, useDispatch } from 'react-redux';
import { addContact } from 'redux/operations';
import { getContacts } from 'redux/selectors';

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

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contactsList = useSelector(getContacts);

  const handleSubmit = (values, { resetForm }) => {
    const sameContact = checkContactsBook(values, contactsList);
    if (sameContact) {
      alert(`${values.name} has been already added`);
    } else {
      dispatch(addContact(values));
      resetForm();
    }
  };

  const checkContactsBook = (contact, contactsList) => {
    return contactsList.find(
      item => item.name.toLowerCase() === contact.name.toLowerCase()
    );
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
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
