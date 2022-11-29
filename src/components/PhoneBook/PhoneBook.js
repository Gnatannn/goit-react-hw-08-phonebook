import { ContactList } from 'components/ContactList/ContactList';
// import { nanoid } from 'nanoid';
import { Filter } from 'components/Filter/Filter';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { Container } from 'components/PhoneBook/PhoneBook.styled';
import { useDispatch, useSelector } from 'react-redux';
// import {
//   addContact,
//   getContactsData,
//   updateFilter,
//   deleteCard,
// } from 'redux/contactsSlice';
import { getContacts, getError, getIsLoading } from 'redux/selectors';
import { fetchContacts } from 'redux/operations';
import { useEffect } from 'react';

export const PhoneBook = () => {
  const dispatch = useDispatch();
  const contactsList = useSelector(getContacts);
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm />

      {contactsList.length > 0 && (
        <>
          <h2>Contacts</h2>
          <Filter />
          {isLoading && !error && <b>Please wait...</b>}
          {error && <p>{error}</p>}
        </>
      )}

      <ContactList />
    </Container>
  );
};
