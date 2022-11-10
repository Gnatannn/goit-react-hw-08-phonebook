import { ContactList } from 'components/ContactList/ContactList';
import { nanoid } from 'nanoid';
import { Filter } from 'components/Filter/Filter';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { Container } from 'components/PhoneBook/PhoneBook.styled';
import { useDispatch, useSelector } from 'react-redux';
import {
  addContact,
  getContactsData,
  updateFilter,
  deleteCard,
} from 'redux/contactsSlice';

export const PhoneBook = () => {
  // const [contacts, setContacts] = useState(() => {
  //   return JSON.parse(localStorage.getItem('contacts')) || [];
  // });
  // const [filter, setFilter] = useState('');

  // useEffect(() => {
  //   localStorage.setItem('contacts', JSON.stringify(contacts));
  // }, [contacts]);

  const dispatch = useDispatch();
  const { contactsList, filter } = useSelector(getContactsData);

  const handleSubmit = (values, { resetForm }) => {
    resetForm();

    const { name, number } = values;
    const contact = {
      name,
      number,
    };
    const sameContact = checkContactsBook(contact, contactsList);
    sameContact
      ? alert(`${contact.name} has been already added`)
      : dispatch(addContact({ ...values, id: nanoid() }));
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

      {!!contactsList.length && (
        <>
          <h2>Contacts</h2>
          <Filter value={filter} onFilterChange={onFilterChange} />
        </>
      )}

      <ContactList findContacts={findContacts} deleteContact={deleteContact} />
    </Container>
  );
};
