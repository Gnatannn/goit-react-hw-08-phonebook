import { Filter } from 'components/Filter/Filter';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { Container } from 'components/App.styled';

import { useEffect } from 'react';

import { fetchContacts } from 'redux/contacts/operations';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllContacts } from 'redux/contacts/selectors';

export const ContactsEditor = () => {
  const items = useSelector(selectAllContacts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm />
      {items.length > 0 && (
        <>
          <h2>Contacts</h2>
          <Filter />
        </>
      )}
    </Container>
  );
};
