import React from 'react';
import style from './Form';
import shortid from 'shortid';
import PropsType from 'prop-types';
import { connect } from 'react-redux';
import contactOperations from '../../redux/phoneBook/phoneBook-operations';
import contactsSelectors from '../../redux/phoneBook/phoneBook-selectors';

const initialState = {
  name: '',
  number: '',
};

class Form extends React.Component {
  state = {
    name: '',
    number: '',
  };

  nameInputId = shortid.generate();
  numberInputId = shortid.generate();

  handleChange = event => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();

    const hasContacts = contact =>
      contact.name === this.state.name || contact.number === this.state.number;

    if (this.props.items.some(hasContacts)) {
      alert(`Contact is already in contacts`);
      return;
    }

    this.props.onSubmit({ ...this.state });

    this.reset();
  };

  reset = () => {
    this.setState(initialState);
  };

  render() {
    const { name, number } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor={this.nameInputId}>
          Name
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
            required
            value={name}
            onChange={this.handleChange}
            id={this.nameInputId}
          />
        </label>
        <label htmlFor={this.numberInputId}>
          Number
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Номер телефона должен состоять из цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
            required
            value={number}
            onChange={this.handleChange}
            id={this.numberInputId}
          />
        </label>
        <button className={style.button} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}

Form.PropsType = {
  onSubmit: PropsType.func.isRequired,
};

const mapStateToProps = state => ({
  items: contactsSelectors.getAllContacts(state),
});

const mapDispatchToProps = dispatch => ({
  onSubmit: ({ name, number }) =>
    dispatch(contactOperations.addContact({ name, number })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
