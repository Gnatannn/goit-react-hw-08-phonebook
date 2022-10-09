import { Component } from 'react';
import { ContactList } from 'components/ContactList/ContactList';
import { nanoid } from 'nanoid';
import { Filter } from 'components/Filter/Filter';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { Container } from 'components/PhoneBook/PhoneBook.styled';

export class PhoneBook extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(_, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  handleSubmit = (values, { resetForm }) => {
    resetForm();

    const { name, number } = values;
    const contact = {
      name,
      number,
    };
    const sameContact = this.checkContactsBook(contact, this.state.contacts);
    sameContact
      ? alert(`${contact.name} has been already added`)
      : this.setState(prevState => ({
          contacts: [...prevState.contacts, { ...values, id: nanoid() }],
        }));
  };

  checkContactsBook = (contact, contactsList) => {
    return contactsList.find(
      item => item.name.toLowerCase() === contact.name.toLowerCase()
    );
  };

  onFilterChange = e => {
    this.setState({
      filter: e.currentTarget.value,
    });
  };

  onFilterContact = () => {
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const findContacts = this.onFilterContact();
    return (
      <Container>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.handleSubmit} />

        {!!this.state.contacts.length && (
          <>
            <h2>Contacts</h2>
            <Filter
              value={this.state.filter}
              onFilterChange={this.onFilterChange}
            />
          </>
        )}

        <ContactList
          findContacts={findContacts}
          deleteContact={this.deleteContact}
        />
      </Container>
    );
  }
}
