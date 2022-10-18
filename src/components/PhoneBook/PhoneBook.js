import { useState, useEffect } from 'react';
import { ContactList } from 'components/ContactList/ContactList';
import { nanoid } from 'nanoid';
import { Filter } from 'components/Filter/Filter';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { Container } from 'components/PhoneBook/PhoneBook.styled';

export const PhoneBook = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts')) || [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleSubmit = (values, { resetForm }) => {
    resetForm();

    const { name, number } = values;
    const contact = {
      name,
      number,
    };
    const sameContact = checkContactsBook(contact, contacts);
    sameContact
      ? alert(`${contact.name} has been already added`)
      : setContacts([...contacts, { ...values, id: nanoid() }]);
  };

  const checkContactsBook = (contact, contactsList) => {
    return contactsList.find(
      item => item.name.toLowerCase() === contact.name.toLowerCase()
    );
  };

  const onFilterChange = e => {
    setFilter(e.currentTarget.value);
  };

  const onFilterContact = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  const findContacts = onFilterContact();

  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={handleSubmit} />

      {!!contacts.length && (
        <>
          <h2>Contacts</h2>
          <Filter value={filter} onFilterChange={onFilterChange} />
        </>
      )}

      <ContactList findContacts={findContacts} deleteContact={deleteContact} />
    </Container>
  );
};
