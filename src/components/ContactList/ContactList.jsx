import { useSelector } from 'react-redux';
import { ContactItem } from 'components/ContactItem/ContactItem';
import { List } from 'components/ContactList/ContactList.styled';
import { getContacts, getFilter } from 'redux/selectors';

export const ContactList = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  if (filteredContacts) {
    return (
      <List>
        {filteredContacts.map(contact => {
          return <ContactItem key={contact.id} {...contact} />;
        })}
      </List>
    );
  }
};
