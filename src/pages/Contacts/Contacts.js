import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ContactList } from 'components/ContactList/ContactList';

import { fetchContacts } from 'redux/contacts/operations';
import {
  selectLoading,
  selectError,
  selectAllContacts,
} from 'redux/contacts/selectors';

import { Filter } from 'components/Filter/Filter';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { Container } from 'pages/Contacts/Contacts.styled';
import { Spinner } from 'components/Spinner/Spinner';

export default function Contacts() {
  const dispatch = useDispatch();
  const items = useSelector(selectAllContacts);
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);

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
      {isLoading && !error && <Spinner />}
      <ContactList />

      {error && <p> {error} </p>}
    </Container>
  );
}
