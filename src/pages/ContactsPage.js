import React, { Component } from 'react';
import { connect } from 'react-redux';
import ContactsForm from '../components/form/Form';
import ContactsList from '../components/contactList/ContactList';
import ContactsListItem from '../components/contactList/contactListItem/ContactListItem';
import Container from '../components/container/Container';
import Filter from '../components/filter/Filter';
import contactsOperations from '../redux/phoneBook/phoneBook-operations';

class ContactsPage extends Component {
  componentDidMount() {
    this.props.fetchContacts();
  }

  render() {
    return (
      <Container>
        <h1>PhoneBook</h1>
        <ContactsForm />
        <div>
          <h2>Contacts</h2>
          <Filter />
          <ContactsList>
            <ContactsListItem />
          </ContactsList>
        </div>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchContacts: () => dispatch(contactsOperations.fetchContacts()),
});

export default connect(null, mapDispatchToProps)(ContactsPage);
