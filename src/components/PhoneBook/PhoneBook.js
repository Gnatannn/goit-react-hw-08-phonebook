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
import {
  getContacts,
  getStatusFilter,
  getError,
  getIsLoading,
} from 'redux/selectors';
import { addContact, deleteCard, fetchContacts } from 'redux/operations';
import { updateFilter } from 'redux/contactsSlice';
import { useEffect } from 'react';

export const PhoneBook = () => {
  const dispatch = useDispatch();
  const contactsList = useSelector(getContacts);
  const filter = useSelector(getStatusFilter);
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleSubmit = (values, { resetForm }) => {
    resetForm();

    // const { name, number } = values;
    // const contact = {
    //   name,
    //   number,
    // };
    const sameContact = checkContactsBook(values, contactsList);
    sameContact
      ? alert(`${values.name} has been already added`)
      : dispatch(addContact(values));
  };

  const checkContactsBook = (contact, contactsList) => {
    return contactsList.find(
      item => item.name.toLowerCase() === contact.name.toLowerCase()
    );
  };

  const onFilterChange = e => {
    dispatch(updateFilter(e.currentTarget.value));
  };

  const onFilterContact = () => {
    return contactsList.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const deleteContact = contactId => {
    dispatch(deleteCard(contactId));
  };

  const findContacts = onFilterContact();

  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={handleSubmit} />

      {contactsList.length > 0 && (
        <>
          <h2>Contacts</h2>
          <Filter value={filter} onFilterChange={onFilterChange} />
          {isLoading && !error && <b>Please wait...</b>}
          {error && <p>{error}</p>}
        </>
      )}

      <ContactList findContacts={findContacts} deleteContact={deleteContact} />
    </Container>
  );
};
